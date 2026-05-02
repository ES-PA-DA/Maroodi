"""Repository implementations."""
from typing import List, Optional
from sqlalchemy.orm import Session
from app.domain.entities.store import Store
from app.domain.repositories.store_repository import StoreRepository
from app.infrastructure.database.models import StoreModel


class StoreRepositoryImpl(StoreRepository):
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Store]:
        models = self.db.query(StoreModel).all()
        return [self._to_entity(m) for m in models]

    def get_by_id(self, id: str) -> Optional[Store]:
        model = self.db.query(StoreModel).filter(StoreModel.id == id).first()
        return self._to_entity(model) if model else None

    def create(self, store: Store) -> Store:
        model = StoreModel(
            name=store.name,
            address=store.address,
            city=store.city,
            is_active=store.is_active,
        )
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)

    def update(self, store: Store) -> Store:
        model = self.db.query(StoreModel).filter(StoreModel.id == store.id).first()
        if model:
            model.name = store.name
            model.address = store.address
            model.city = store.city
            model.is_active = store.is_active
            self.db.commit()
            self.db.refresh(model)
        return self._to_entity(model)

    def delete(self, id: str) -> bool:
        model = self.db.query(StoreModel).filter(StoreModel.id == id).first()
        if model:
            self.db.delete(model)
            self.db.commit()
            return True
        return False

    def _to_entity(self, model: StoreModel) -> Store:
        return Store(
            id=model.id,
            name=model.name,
            address=model.address,
            city=model.city,
            is_active=model.is_active,
            created_at=model.created_at,
            updated_at=model.updated_at,
        )