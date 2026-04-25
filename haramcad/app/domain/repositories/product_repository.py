"""Repository interfaces."""
from abc import ABC, abstractmethod
from typing import List, Optional
from app.domain.entities.product import Product


class ProductRepository(ABC):
    @abstractmethod
    def get_all(self) -> List[Product]:
        pass

    @abstractmethod
    def get_by_id(self, id: str) -> Optional[Product]:
        pass

    @abstractmethod
    def get_by_sku(self, sku: str) -> Optional[Product]:
        pass

    @abstractmethod
    def create(self, product: Product) -> Product:
        pass

    @abstractmethod
    def update(self, product: Product) -> Product:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass