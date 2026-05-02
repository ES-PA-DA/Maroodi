"""Domain entities."""
import uuid
from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Store:
    id: str = None
    name: str = ""
    address: str = ""
    city: str = ""
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def __post_init__(self):
        if self.id is None:
            self.id = str(uuid.uuid4())