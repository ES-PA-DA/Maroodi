"""Product routes."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.domain.entities.product import Product
from app.application.services.product_service import ProductService
from app.infrastructure.database.database import get_db
from app.infrastructure.repositories.product_repository_impl import ProductRepositoryImpl
from app.presentation.schemas.product_schema import ProductCreate, ProductUpdate, ProductResponse

router = APIRouter(prefix="/products", tags=["products"])


def get_product_service(db: Session = Depends(get_db)) -> ProductService:
    repository = ProductRepositoryImpl(db)
    return ProductService(repository)


@router.get("/", response_model=List[ProductResponse])
def get_products(service: ProductService = Depends(get_product_service)):
    return service.get_all()


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: str, service: ProductService = Depends(get_product_service)):
    product = service.get_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("/", response_model=ProductResponse)
def create_product(data: ProductCreate, service: ProductService = Depends(get_product_service)):
    product = Product(**data.model_dump())
    return service.create(product)


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: str, data: ProductUpdate, service: ProductService = Depends(get_product_service)):
    product = service.get_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
    return service.update(product)


@router.delete("/{product_id}")
def delete_product(product_id: str, service: ProductService = Depends(get_product_service)):
    if not service.delete(product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}
