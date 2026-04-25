"""Repository interfaces."""
from app.domain.repositories.product_repository import ProductRepository
from app.domain.repositories.store_repository import StoreRepository
from app.domain.repositories.store_product_repository import StoreProductRepository

__all__ = ["ProductRepository", "StoreRepository", "StoreProductRepository"]