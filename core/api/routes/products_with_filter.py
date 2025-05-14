from enum import Enum
from typing import List, Optional
from sqlalchemy.orm import joinedload
from sqlmodel import or_, select
from fastapi import APIRouter, Query

from core.api.deps import SessionDep
from core.models.product import Application, Healthclaim, Ingredients, Product, ProductDetail, Supplier
from core.util import BaseSchema

router = APIRouter(prefix="/products-with-filter", tags=["products-with-filter"])

class FilterKey(str, Enum):
    cid = "cid"
    fid = "fid"
    aid = "aid"
    iid = "iid"
    sid = "sid"
    hid = "hid"


class FilterOption(BaseSchema):
    id: str
    name: str

class Filter(BaseSchema):
    key: FilterKey
    options: List[FilterOption]

class ProductFilterResponse(BaseSchema):
    products: list[ProductDetail]
    filter_options: list[Filter]

@router.get("", response_model=ProductFilterResponse)
async def get_products(
    session: SessionDep,
    keyword: Optional[str] = Query(default=None, description="keyword"),
    cid: List[str] = Query(default=[], description="material_cat_id"),
    fid: List[str] = Query(default=[], description="material_form_id"),
    aid: List[str] = Query(default=[], description="application_id"),
    iid: List[str] = Query(default=[], description="ingredients_id"),
    sid: List[str] = Query(default=[], description="supplier_id"),
    hid: List[str] = Query(default=[], description="healthclaim_id"),
):
    statement = select(Product).options(
        joinedload(Product.material_cat),
        joinedload(Product.material_form),
        joinedload(Product.applications),
        joinedload(Product.ingredients),
        joinedload(Product.suppliers),
        joinedload(Product.healthclaims),
        joinedload(Product.images)
    )

    if keyword:
        statement = statement.where(
            or_(
                Product.product_name.ilike(f"%{keyword}%"),
                Product.applications.any(Application.application_name.ilike(f"%{keyword}%")),
            )
        )

    if cid:
        statement = statement.where(Product.material_cat_id.in_(cid))
    if fid:
        statement = statement.where(Product.material_form_id.in_(fid))
    if aid:
        statement = statement.where(Product.applications.any(Application.application_id.in_(aid)))
    if iid:
        statement = statement.where(Product.ingredients.any(Ingredients.ingredients_id.in_(iid)))
    if sid:
        statement = statement.where(Product.suppliers.any(Supplier.supplier_id.in_(sid)))
    if hid:
        statement = statement.where(Product.healthclaims.any(Healthclaim.healthclaim_id.in_(hid)))

    result = await session.scalars(statement=statement)
    products = result.unique().all()

    material_categories = {}
    material_forms = {}
    applications = {}
    healthclaims = {}
    ingredients_set = {}
    suppliers_set = {}
    
    for p in products:
        if p.material_cat:
            material_categories[p.material_cat.material_cat_id] = p.material_cat
        if p.material_form:
            material_forms[p.material_form.material_form_id] = p.material_form
        for app in p.applications:
            applications[app.application_id] = app
        for hc in p.healthclaims:
            healthclaims[hc.healthclaim_id] = hc
        for ing in p.ingredients:
            ingredients_set[ing.ingredients_id] = ing
        for sup in p.suppliers:
            suppliers_set[sup.supplier_id] = sup

    filter_options = [
        Filter(
            key="cid",
            options=[FilterOption(id=mc.material_cat_id, name=mc.material_cat_name) for mc in material_categories.values()]
        ),
        Filter(
            key="fid",
            options=[FilterOption(id=mf.material_form_id, name=mf.material_form_name) for mf in material_forms.values()]
        ),
        Filter(
            key="aid",
            options=[FilterOption(id=app.application_id, name=app.application_name) for app in applications.values()]
        ),
        Filter(
            key="hid",
            options=[FilterOption(id=hc.healthclaim_id, name=hc.healthclaim_name) for hc in healthclaims.values()]
        ),
        Filter(
            key="iid",
            options=[FilterOption(id=ing.ingredients_id, name=ing.ingredients_name) for ing in ingredients_set.values()]
        ),
        Filter(
            key="sid",
            options=[FilterOption(id=sup.supplier_id, name=sup.supplier_name) for sup in suppliers_set.values()]
        )
    ]
    
    return ProductFilterResponse(products=products, filter_options=filter_options)