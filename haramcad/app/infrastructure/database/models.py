"""Database models."""
import uuid
from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.infrastructure.database.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class ProductModel(Base):
    __tablename__ = "products"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    description = Column(String(1000), default="")
    price = Column(Float, nullable=False)
    sku = Column(String(100), unique=True, nullable=False)
    unit = Column(String(20), nullable=False)
    amount = Column(Float, default=0.0)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    store_products = relationship("StoreProductModel", back_populates="product")


class StoreModel(Base):
    __tablename__ = "stores"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    address = Column(String(500), default="")
    city = Column(String(100), default="")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    store_products = relationship("StoreProductModel", back_populates="store")


class StoreProductModel(Base):
    __tablename__ = "store_products"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    store_id = Column(String(36), ForeignKey("stores.id"), nullable=False)
    product_id = Column(String(36), ForeignKey("products.id"), nullable=False)
    price = Column(Float, nullable=False)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    store = relationship("StoreModel", back_populates="store_products")
    product = relationship("ProductModel", back_populates="store_products")
