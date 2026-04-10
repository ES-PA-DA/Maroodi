from typing import Annotated
from fastapi import APIRouter, Query, HTTPException
from sqlmodel import select
from src.database import SessionDep
from src.products.models import ProductUpdate, ProductPublic
from src.products.schemas import Product, ProductBase

router = APIRouter()


@router.post("/products/", response_model=ProductPublic)
def create_product(product: ProductBase, session: SessionDep):
    db_product = Product.model_validate(product)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product


@router.get("/products/", response_model=list[ProductPublic])
def read_products(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    products = session.exec(select(Product).offset(offset).limit(limit)).all()
    return products


@router.get("/products/{product_id}", response_model=ProductPublic)
def read_product(product_id: int, session: SessionDep):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.patch("/products/{product_id}", response_model=ProductPublic)
def update_product(product_id: int, product: ProductUpdate, session: SessionDep):
    product_db = session.get(Product, product_id)
    if not product_db:
        raise HTTPException(status_code=404, detail="Product not found")
    product_data = product.model_dump(exclude_unset=True)
    product_db.sqlmodel_update(product_data)
    session.add(product_db)
    session.commit()
    session.refresh(product_db)
    return product_db


@router.delete("/products/{product_id}")
def delete_product(product_id: int, session: SessionDep):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    session.delete(product)
    session.commit()
    return {"ok": True}
