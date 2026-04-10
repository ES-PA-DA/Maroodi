from src.products.schemas import ProductBase


class ProductUpdate(ProductBase):
    name: str | None = None
    amount: float | None = None
    unit: str | None = None
    price: float | None = None


class ProductPublic(ProductBase):
    id: int
