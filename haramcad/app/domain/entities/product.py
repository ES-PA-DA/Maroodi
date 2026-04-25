"""Domain entities."""
import uuid
from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Product:
    id: str = None
    name: str = ""
    description: str = ""
    price: float = 0.0
    sku: str = ""
    unit: str = ""
    amount: float = 0.0
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def __post_init__(self):
        if self.id is None:
            self.id = str(uuid.uuid4())