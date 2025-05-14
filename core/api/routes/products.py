from sqlalchemy.orm import joinedload
from sqlmodel import select
from fastapi import APIRouter, HTTPException

from core.api.deps import SessionDep
from core.models.product import Product, ProductDetail


router = APIRouter(prefix="/products", tags=["products"])

@router.get("/{product_id}", response_model=ProductDetail)
async def get_product(product_id: str, session: SessionDep):
    statement = (
        select(Product)
        .where(Product.product_id == product_id)
        .options(
            joinedload(Product.material_cat),
            joinedload(Product.material_form),
            joinedload(Product.applications),
            joinedload(Product.ingredients),
            joinedload(Product.suppliers),
            joinedload(Product.healthclaims),
            joinedload(Product.images)
        )
    )
    result = await session.scalars(statement=statement)
    product = result.unique().one_or_none()

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
