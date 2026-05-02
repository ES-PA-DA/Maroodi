"""Repository implementations."""
from typing import List, Optional
from sqlalchemy.orm import Session
from app.domain.entities.product import Product
from app.domain.repositories.product_repository import ProductRepository
from app.infrastructure.database.models import ProductModel


class ProductRepositoryImpl(ProductRepository):
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Product]:
        models = self.db.query(ProductModel).all()
        return [self._to_entity(m) for m in models]

    def get_by_id(self, id: str) -> Optional[Product]:
        model = self.db.query(ProductModel).filter(ProductModel.id == id).first()
        return self._to_entity(model) if model else None

    def get_by_barcode(self, barcode: str) -> Optional[Product]:
        model = self.db.query(ProductModel).filter(ProductModel.barcode == barcode).first()
        return self._to_entity(model) if model else None

    def create(self, product: Product) -> Product:
        model = ProductModel(
            name=product.name,
            description=product.description,
            barcode=product.barcode,
            unit=product.unit,
            amount=product.amount,
        )
        self.db.add(model)
        self.db.commit()
        self.db.refresh(model)
        return self._to_entity(model)

    def update(self, product: Product) -> Product:
        model = self.db.query(ProductModel).filter(ProductModel.id == product.id).first()
        if model:
            model.name = product.name
            model.description = product.description
            model.barcode = product.barcode
            model.unit = product.unit
            model.amount = product.amount
            self.db.commit()
            self.db.refresh(model)
        return self._to_entity(model)

    def delete(self, id: str) -> bool:
        model = self.db.query(ProductModel).filter(ProductModel.id == id).first()
        if model:
            self.db.delete(model)
            self.db.commit()
            return True
        return False

    def _to_entity(self, model: ProductModel) -> Product:
        return Product(
            id=model.id,
            name=model.name,
            description=model.description,
            barcode=model.barcode,
            unit=model.unit,
            amount=model.amount,
            created_at=model.created_at,
            updated_at=model.updated_at,
        )
