"""Store Products routes - nested under stores."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.domain.entities.store_product import StoreProduct
from app.application.services.store_product_service import StoreProductService
from app.infrastructure.database.database import get_db
from app.infrastructure.repositories.store_product_repository_impl import StoreProductRepositoryImpl
from app.presentation.schemas.store_product_schema import StoreProductCreate, StoreProductUpdate, StoreProductResponse

router = APIRouter(tags=["products"])


def get_store_product_service(db: Session = Depends(get_db)) -> StoreProductService:
    repository = StoreProductRepositoryImpl(db)
    return StoreProductService(repository)


store_products_router = APIRouter(prefix="/stores/{store_id}/products", tags=["stores"])


@store_products_router.get("/", response_model=List[StoreProductResponse])
def get_store_products(
    store_id: str,
    service: StoreProductService = Depends(get_store_product_service)
):
    return service.get_by_store(store_id)


@store_products_router.post("/", response_model=StoreProductResponse)
def add_product_to_store(
    store_id: str,
    data: StoreProductCreate,
    service: StoreProductService = Depends(get_store_product_service)
):
    store_product = StoreProduct(store_id=store_id, **data.model_dump())
    return service.create(store_product)


@store_products_router.get("/{product_id}", response_model=StoreProductResponse)
def get_store_product(
    store_id: str,
    product_id: str,
    service: StoreProductService = Depends(get_store_product_service)
):
    store_product = service.get_store_product(store_id, product_id)
    if not store_product:
        raise HTTPException(status_code=404, detail="Product not found in this store")
    return store_product


@store_products_router.put("/{product_id}", response_model=StoreProductResponse)
def update_store_product(
    store_id: str,
    product_id: str,
    data: StoreProductUpdate,
    service: StoreProductService = Depends(get_store_product_service)
):
    store_product = service.get_store_product(store_id, product_id)
    if not store_product:
        raise HTTPException(status_code=404, detail="Product not found in this store")
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(store_product, key, value)
    return service.update(store_product)


@store_products_router.delete("/{product_id}")
def remove_product_from_store(
    store_id: str,
    product_id: str,
    service: StoreProductService = Depends(get_store_product_service)
):
    store_product = service.get_store_product(store_id, product_id)
    if not store_product:
        raise HTTPException(status_code=404, detail="Product not found in this store")
    if not service.delete(store_product.id):
        raise HTTPException(status_code=404, detail="Product not found in this store")
    return {"message": "Product removed from store"}


product_stores_router = APIRouter(prefix="/products/{product_id}/stores", tags=["products"])


@product_stores_router.get("/", response_model=List[StoreProductResponse])
def get_product_stores(
    product_id: str,
    service: StoreProductService = Depends(get_store_product_service)
):
    return service.get_by_product(product_id)
