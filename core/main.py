import asyncio
import json
from fastapi import APIRouter, FastAPI
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from google import genai
from core.models.product import Product, ProductDetail
from core.vector_db import vector_session
from core.db import async_engine
from core.api.routes import chat, products, products_with_filter
from core.config import settings

def convert_product_details_to_data_str(product_detail: ProductDetail) -> str:
    applications = ", ".join(app.application_name for app in product_detail.applications)
    ingredients = ", ".join(ing.ingredients_name for ing in product_detail.ingredients)
    suppliers = ", ".join(sup.supplier_name for sup in product_detail.suppliers)
    healthclaims = ", ".join(hc.healthclaim_name for hc in product_detail.healthclaims)
    images = ", ".join(img.image_url for img in product_detail.images)
    return (
        f"Product Name: {product_detail.product_name}\n"
        f"Origin: {product_detail.place_of_origin}\n"
        f"Manufacturing Location: {product_detail.manufacturing_location}\n"
        f"Weight/Volume: {product_detail.weight_volume}\n"
        f"Features: {product_detail.features_desc}\n"
        f"Material Category: {product_detail.material_cat.material_cat_name}\n"
        f"Material Form: {product_detail.material_form.material_form_name}\n"
        f"Applications: {applications or 'None'}\n"
        f"Ingredients: {ingredients or 'None'}\n"
        f"Suppliers: {suppliers or 'None'}\n"
        f"Health Claims: {healthclaims or 'None'}\n"
        f"Images: {images or 'None'}\n"
        f"Product Link: http://172.178.36.76:5000/product/{product_detail.product_id}"
    )


async def prepare_vector_db():
    async with AsyncSession(async_engine) as session:
        collection = vector_session.get_product_collection()
        ai_client = genai.Client(api_key=settings.GOOGLE_API_KEY)

        result = await session.scalars(statement=select(Product).options(
            joinedload(Product.material_cat),
            joinedload(Product.material_form),
            joinedload(Product.applications),
            joinedload(Product.ingredients),
            joinedload(Product.suppliers),
            joinedload(Product.healthclaims),
            joinedload(Product.images)
        ))

        products = result.unique().all()

        if (len(products) == 0):
            print("No products found")
            exit()

        for product in products:
            product_detail = ProductDetail.model_validate(product)
            data_str = convert_product_details_to_data_str(product_detail)
            
            retries = 3
            for attempt in range(retries):
                try:
                    response = ai_client.models.embed_content(
                        model="models/text-embedding-004",
                        contents=data_str,
                    )
                    embedding_vectors = response.embeddings[0].values
                    break
                except genai.errors.ServerError as e:
                    if attempt < retries - 1:
                        print(f"Google API 503 Error: {e} for product {product.id}")
                        print(f"Retrying... ({attempt + 1}/{retries})")
                        await asyncio.sleep(3 ** attempt)
                    else:
                        print(f"Failed to embed product {product.id} after {retries} attempts")
                        return 
                except Exception as e:
                    raise e

            collection.add(
                ids=[str(product.product_id)], 
                embeddings=[embedding_vectors], 
                documents=[data_str]
            )

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await prepare_vector_db()
        print("Vector database prepared successfully")
    except Exception as e:
        print(f"Error preparing vector database: {e}")

    yield
    
    vector_session.clean_up()
    print("Vector database cleaned up")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
api_router = APIRouter()
api_router.include_router(products.router)
api_router.include_router(products_with_filter.router)
api_router.include_router(chat.router)

app.include_router(api_router)
