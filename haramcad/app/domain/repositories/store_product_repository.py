"""Repository interfaces."""
from abc import ABC, abstractmethod
from typing import List, Optional
from app.domain.entities.store_product import StoreProduct


class StoreProductRepository(ABC):
    @abstractmethod
    def get_all(self) -> List[StoreProduct]:
        pass

    @abstractmethod
    def get_by_id(self, id: str) -> Optional[StoreProduct]:
        pass

    @abstractmethod
    def get_by_store(self, store_id: str) -> List[StoreProduct]:
        pass

    @abstractmethod
    def get_by_product(self, product_id: str) -> List[StoreProduct]:
        pass

    @abstractmethod
    def get_store_product(self, store_id: str, product_id: str) -> Optional[StoreProduct]:
        pass

    @abstractmethod
    def create(self, store_product: StoreProduct) -> StoreProduct:
        pass

    @abstractmethod
    def update(self, store_product: StoreProduct) -> StoreProduct:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass