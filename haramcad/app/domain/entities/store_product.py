"""Domain entities."""
import uuid
from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class StoreProduct:
    id: str = None
    store_id: str = ""
    product_id: str = ""
    price: float = 0.0
    is_available: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def __post_init__(self):
        if self.id is None:
            self.id = str(uuid.uuid4())
