import asyncio
import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from core.api.deps import AIClientDep, VectorSessionDep

router = APIRouter(prefix="/chat", tags=["chat"])

def get_embedding(client: AIClientDep, text):
    response = client.models.embed_content(
        model="models/text-embedding-004",
        contents=text,
    )
    return response.embeddings[0].values

def retrieve_from_vector_db(vector_session: VectorSessionDep, ai_client: AIClientDep, input_text):
    query_embedding = get_embedding(ai_client, input_text)
    collection = vector_session.get_product_collection()
    results = collection.query(query_embeddings=[query_embedding], n_results=5)

    if not results["documents"] or not results["documents"][0]:
        return "No relevant information found."

    return results["documents"][0]

async def ask_gemini_generator(client: AIClientDep, context, input_text):
    prompt =  f"""You are an AI assistant answering product-related questions. 
Use the following retrieved product information to generate a concise and helpful response.

Below is the relevant product information retrieved from the database: "{context}"

The user asked: "{input_text}"
    
- If the retrieved context contains the answer, respond concisely and accurately using the provided details.
- If the context does not contain the answer:
  - Acknowledge the user's question politely.
  - Inform them that the requested product is not available in our company.
  - Suggest alternative products (if applicable) or advise consulting an appropriate source for more details.
  - Maintain a friendly and professional tone.

Ensure the response represents the company's perspective, using "We" instead of "I". 
Response should be clear, natural, and customer-friendly, while keeping it around 30 words.

For the format of the response:
- Use product name as link's label.
- Use markdown formatting and split into multiple paragraphs if needed. 
- Use bold for important information.
"""

    yield json.dumps({'status': 'start'}) + "\n"
    buffer = ""
    for response in client.models.generate_content_stream(
        model="gemini-2.0-flash",
        contents=[prompt]
    ):
        buffer += response.candidates[0].content.parts[0].text
        if (len(buffer) > 3):
            yield json.dumps({'m': buffer}) + "\n"
            buffer = ""
        await asyncio.sleep(0.05)

    if (buffer):
        yield json.dumps({'m': buffer}) + "\n"

    yield json.dumps({'status': 'complete'}) + "\n"

class ChatRequest(BaseModel):
    question: str

@router.post("")
async def chat(ai_client: AIClientDep, vector_session: VectorSessionDep, chat_request: ChatRequest):
    context = retrieve_from_vector_db(vector_session, ai_client, chat_request.question)
    return StreamingResponse(
            ask_gemini_generator(ai_client, context, chat_request.question),
            media_type="text/plain"
        )