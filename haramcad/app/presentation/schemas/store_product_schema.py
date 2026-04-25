"""Pydantic schemas."""
from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class StoreProductBase(BaseModel):
    product_id: str
    price: float
    is_available: bool = True


class StoreProductCreate(StoreProductBase):
    pass


class StoreProductUpdate(BaseModel):
    price: Optional[float] = None
    is_available: Optional[bool] = None


class StoreProductResponse(BaseModel):
    id: str
    store_id: str
    product_id: str
    price: float
    is_available: bool
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
