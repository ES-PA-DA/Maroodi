"""StoreProduct service."""
from typing import List, Optional
from app.domain.entities.store_product import StoreProduct
from app.domain.repositories.store_product_repository import StoreProductRepository


class StoreProductService:
    def __init__(self, repository: StoreProductRepository):
        self.repository = repository

    def get_all(self) -> List[StoreProduct]:
        return self.repository.get_all()

    def get_by_id(self, id: str) -> Optional[StoreProduct]:
        return self.repository.get_by_id(id)

    def get_by_store(self, store_id: str) -> List[StoreProduct]:
        return self.repository.get_by_store(store_id)

    def get_by_product(self, product_id: str) -> List[StoreProduct]:
        return self.repository.get_by_product(product_id)

    def get_store_product(self, store_id: str, product_id: str) -> Optional[StoreProduct]:
        return self.repository.get_store_product(store_id, product_id)

    def create(self, store_product: StoreProduct) -> StoreProduct:
        return self.repository.create(store_product)

    def update(self, store_product: StoreProduct) -> StoreProduct:
        return self.repository.update(store_product)

    def delete(self, id: str) -> bool:
        return self.repository.delete(id)