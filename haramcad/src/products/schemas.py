from sqlmodel import Field, SQLModel


class ProductBase(SQLModel):
    name: str = Field()
    amount: float = Field()
    unit: str = Field()
    section: str = Field()
    price: float = Field()
    store_id: int | None = Field(default=None, foreign_key="store.id")


class Product(ProductBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
