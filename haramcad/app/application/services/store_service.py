"""Store service."""
from typing import List, Optional
from app.domain.entities.store import Store
from app.domain.repositories.store_repository import StoreRepository


class StoreService:
    def __init__(self, repository: StoreRepository):
        self.repository = repository

    def get_all(self) -> List[Store]:
        return self.repository.get_all()

    def get_by_id(self, id: str) -> Optional[Store]:
        return self.repository.get_by_id(id)

    def create(self, store: Store) -> Store:
        return self.repository.create(store)

    def update(self, store: Store) -> Store:
        return self.repository.update(store)

    def delete(self, id: str) -> bool:
        return self.repository.delete(id)