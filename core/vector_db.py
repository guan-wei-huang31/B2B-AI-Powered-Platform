import chromadb
import shutil

class VectorSession:
    product_collection: str = "functional_products"

    def __init__(self):
        self.vector_session = chromadb.PersistentClient(path="./chroma_db")

    def clean_up(self):
        self.vector_session.delete_collection(name=self.product_collection)

        shutil.rmtree("./chroma_db", ignore_errors=False)

    def get_product_collection(self):
        return self.vector_session.get_or_create_collection(name=self.product_collection)

vector_session = VectorSession()

