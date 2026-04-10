from src.stores.schemas import Store


class StoreUpdate(Store):
    name: str | None = None


class StorePublic(Store):
    id: int
