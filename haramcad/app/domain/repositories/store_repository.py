"""Repository interfaces."""
from abc import ABC, abstractmethod
from typing import List, Optional
from app.domain.entities.store import Store


class StoreRepository(ABC):
    @abstractmethod
    def get_all(self) -> List[Store]:
        pass

    @abstractmethod
    def get_by_id(self, id: str) -> Optional[Store]:
        pass

    @abstractmethod
    def create(self, store: Store) -> Store:
        pass

    @abstractmethod
    def update(self, store: Store) -> Store:
        pass

    @abstractmethod
    def delete(self, id: str) -> bool:
        pass