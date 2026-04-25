"""Product service."""
from typing import List, Optional
from app.domain.entities.product import Product
from app.domain.repositories.product_repository import ProductRepository


class ProductService:
    def __init__(self, repository: ProductRepository):
        self.repository = repository

    def get_all(self) -> List[Product]:
        return self.repository.get_all()

    def get_by_id(self, id: str) -> Optional[Product]:
        return self.repository.get_by_id(id)

    def get_by_sku(self, sku: str) -> Optional[Product]:
        return self.repository.get_by_sku(sku)

    def create(self, product: Product) -> Product:
        return self.repository.create(product)

    def update(self, product: Product) -> Product:
        return self.repository.update(product)

    def delete(self, id: str) -> bool:
        return self.repository.delete(id)