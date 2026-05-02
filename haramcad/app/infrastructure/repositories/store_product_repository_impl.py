"""Repository implementations."""
from typing import List, Optional
from sqlalchemy.orm import Session
from app.domain.entities.store_product import StoreProduct
from app.domain.repositories.store_product_repository import StoreProductRepository
from app.infrastructure.database.models import StoreProductModel


class StoreProductRepositoryImpl(StoreProductRepository):
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[StoreProduct]:
        models = self.db.query(StoreProductModel).all()
        return [self._to_entity(m) for m in models]

    def get_by_id(self, id: str) -> Optional[StoreProduct]:
        model = self.db.query(StoreProductModel).filter(StoreProductModel.id == id).first()
        return self._to_entity(model) if model else None

    def get_by_store(self, store_id: str) -> List[StoreProduct]:
        models = self.db.query(StoreProductModel).filter(StoreProductModel.store_id == store_id).all()
        return [self._to_entity(m) for m in models]

    def get_by_product(self, product_id: str) -> List[StoreProduct]:
        models = self.db.query(StoreProductModel).filter(StoreProductModel.product_id == product_id).all()
        return [self._to_entity(m) for m in models]

    def get_store_product(self, store_id: str, product_id: str) -> Optional[StoreProduct]:
        model = self.db.query(StoreProductModel).filter(
            StoreProductModel.store_id == store_id,
            StoreProductModel.product_id == product_id
        ).first()
        return self._to_entity(model) if model else None

    def create(self, store_product: StoreProduct) -> StoreProduct:
        model = StoreProductModel(
            store_id=store_product.store_id,
            product_id=store_product.product_id,
            price=store_product.price,
            is_available=store_product.is_available,
        )
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)

    def update(self, store_product: StoreProduct) -> StoreProduct:
        model = self.db.query(StoreProductModel).filter(StoreProductModel.id == store_product.id).first()
        if model:
            model.price = store_product.price
            model.is_available = store_product.is_available
            self.db.commit()
            self.db.refresh(model)
        return self._to_entity(model)

    def delete(self, id: str) -> bool:
        model = self.db.query(StoreProductModel).filter(StoreProductModel.id == id).first()
        if model:
            self.db.delete(model)
            self.db.commit()
            return True
        return False

    def _to_entity(self, model: StoreProductModel) -> StoreProduct:
        return StoreProduct(
            id=model.id,
            store_id=model.store_id,
            product_id=model.product_id,
            price=model.price,
            is_available=model.is_available,
            created_at=model.created_at,
            updated_at=model.updated_at,
        )
