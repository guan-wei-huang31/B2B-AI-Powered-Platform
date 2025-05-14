from typing import Optional
from sqlmodel import Field, Relationship, SQLModel

from core.util import BaseSchema

class ProductApplication(BaseSchema, SQLModel, table=True):
    __tablename__ = "product_application"
    product_id: str = Field(default=None, primary_key=True, foreign_key="product.product_id", alias="product_id")
    application_id: str = Field(default=None, primary_key=True, foreign_key="application.application_id", alias="application_id")

class ProductIngredients(BaseSchema, SQLModel, table=True):
    __tablename__ = "product_ingredients"
    product_id: str = Field(default=None, primary_key=True, foreign_key="product.product_id", alias="product_id")
    ingredients_id: str = Field(default=None, primary_key=True, foreign_key="ingredients.ingredients_id", alias="ingredients_id")

class ProductSupplier(BaseSchema, SQLModel, table=True):
    __tablename__ = "product_supplier"
    product_id: str = Field(default=None, primary_key=True, foreign_key="product.product_id", alias="product_id")
    supplier_id: str = Field(default=None, primary_key=True, foreign_key="supplier.supplier_id", alias="supplier_id")

class ProductHealthclaim(BaseSchema, SQLModel, table=True):
    __tablename__ = "product_healthclaim"
    product_id: str = Field(default=None, primary_key=True, foreign_key="product.product_id", alias="product_id")
    healthclaim_id: str = Field(default=None, primary_key=True, foreign_key="healthclaim.healthclaim_id", alias="healthclaim_id")

class MaterialCategoryBase(BaseSchema, SQLModel):
    material_cat_id: str = Field(alias="material_cat_id")
    material_cat_name: str = Field(alias="material_cat_name")

class MaterialCategory(MaterialCategoryBase, table=True):
    __tablename__ = "material_category"
    material_cat_id: str = Field(default=None, primary_key=True, alias="material_cat_id")
    products: list["Product"] = Relationship(back_populates="material_cat")

class MaterialCategoryPublic(MaterialCategoryBase):
    pass

class MaterialFormBase(BaseSchema, SQLModel):
    material_form_id: str = Field(alias="material_form_id")
    material_form_name: str = Field(alias="material_form_name")

class MaterialForm(MaterialFormBase, table=True):
    __tablename__ = "material_form"
    material_form_id: str = Field(default=None, primary_key=True, alias="material_form_id")
    products: list["Product"] = Relationship(back_populates="material_form")

class MaterialFormPublic(MaterialFormBase):
    pass

class ApplicationBase(BaseSchema, SQLModel):
    application_id: str = Field(alias="application_id")
    application_name: str = Field(alias="application_name")

class Application(ApplicationBase, table=True):
    __tablename__ = "application"
    application_id: str = Field(default=None, primary_key=True)
    application_desc: str = Field(alias="application_desc")
    products: list["Product"] = Relationship(back_populates="applications", link_model=ProductApplication)

class ApplicationPublic(ApplicationBase):
    pass

class IngredientsBase(BaseSchema, SQLModel):
    ingredients_id: str = Field(alias="ingredients_id")
    ingredients_name: str = Field(alias="ingredients_name")

class Ingredients(IngredientsBase, table=True):
    __tablename__ = "ingredients"
    ingredients_id: str = Field(default=None, primary_key=True)
    products: list["Product"] = Relationship(back_populates="ingredients", link_model=ProductIngredients)

class IngredientsPublic(IngredientsBase):
    pass

class SupplierBase(BaseSchema, SQLModel):
    supplier_id: str = Field(alias="supplier_id")
    supplier_name: str = Field(alias="supplier_name")
    supplier_cat_id: str = Field(alias="supplier_cat_id")
    city: str = Field(alias="city")
    province_state: Optional[str] = Field(default=None, alias="province_state")
    country: str = Field(alias="country")
    postalcode: str = Field(alias="postalcode")

class Supplier(SupplierBase, table=True):
    __tablename__ = "supplier"
    supplier_id: str = Field(default=None, primary_key=True)
    products: list["Product"] = Relationship(back_populates="suppliers", link_model=ProductSupplier)

class SupplierPublic(SupplierBase):
    pass

class HealthclaimBase(BaseSchema, SQLModel):
    healthclaim_id: str = Field(alias="healthclaim_id")
    healthclaim_name: str = Field(alias="healthclaim_name")

class Healthclaim(HealthclaimBase, table=True):
    __tablename__ = "healthclaim"
    healthclaim_id: str = Field(default=None, primary_key=True)
    products: list["Product"] = Relationship(back_populates="healthclaims", link_model=ProductHealthclaim)

class HealthclaimPublic(HealthclaimBase):
    pass

class ImageBase(BaseSchema, SQLModel):
    image_id: str = Field(alias="image_id")
    image_url: str = Field(alias="image_url")
    main_image: Optional[str] = Field(default=None, alias="main_image")

class Image(ImageBase, table=True):
    __tablename__ = "image"
    image_id: str = Field(default=None, primary_key=True)
    product_id: str = Field(default=None, foreign_key="product.product_id")
    product: Optional["Product"] = Relationship(back_populates="images")
class ImagePublic(ImageBase):
    pass

class ProductBase(BaseSchema, SQLModel):
    product_id: str = Field(alias="product_id")
    product_name: str = Field(alias="product_name")
    place_of_origin: Optional[str] = Field(default=None, alias="place_of_origin")
    manufacturing_location: str = Field(alias="manufacturing_location")
    weight_volume: str = Field(alias="weight_volume")
    features_desc: str = Field(alias="features_desc")

class Product(ProductBase, table=True):
    __tablename__ = "product"
    product_id: str = Field(default=None, primary_key=True)

    material_form_id: str = Field(foreign_key="material_form.material_form_id")
    material_cat_id: str = Field(foreign_key="material_category.material_cat_id")
    material_form: Optional["MaterialForm"] = Relationship(back_populates="products")
    material_cat: Optional["MaterialCategory"] = Relationship(back_populates="products")
    applications: list["Application"] = Relationship(back_populates="products", link_model=ProductApplication)
    ingredients: list["Ingredients"] = Relationship(back_populates="products", link_model=ProductIngredients)
    suppliers: list["Supplier"] = Relationship(back_populates="products", link_model=ProductSupplier)
    healthclaims: list["Healthclaim"] = Relationship(back_populates="products", link_model=ProductHealthclaim)
    images: list["Image"] = Relationship(back_populates="product")
class ProductDetail(ProductBase):
    material_cat: Optional["MaterialCategoryPublic"] = None
    material_form: Optional["MaterialFormPublic"] = None
    applications: list["ApplicationPublic"] = []
    ingredients: list["IngredientsPublic"] = []
    suppliers: list["SupplierPublic"] = []
    healthclaims: list["HealthclaimPublic"] = []
    images: list["ImagePublic"] = []