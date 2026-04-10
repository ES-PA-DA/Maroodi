from sqlmodel import Field, SQLModel


class StoreBase(SQLModel):
    name: str = Field(index=True)


class Store(StoreBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
