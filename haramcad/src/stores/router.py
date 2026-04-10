from typing import Annotated
from fastapi import APIRouter, Query, HTTPException
from sqlmodel import select
from src.database import SessionDep
from src.stores.models import StorePublic
from src.stores.schemas import Store

router = APIRouter()


@router.post("/stores/", response_model=StorePublic)
def create_store(store: Store, session: SessionDep):
    db_product = Store.model_validate(store)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product


@router.get("/stores/", response_model=list[StorePublic])
def read_stores(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    stores = session.exec(select(Store).offset(offset).limit(limit)).all()
    return stores


@router.get("/stores/{store_id}", response_model=StorePublic)
def read_product(store_id: int, session: SessionDep):
    store = session.get(Store, store_id)
    if not store:
        raise HTTPException(status_code=404, detail="store not found")
    return store


@router.delete("/stores/{product_id}")
def delete_store(store_id: int, session: SessionDep):
    store = session.get(Store, store_id)
    if not store:
        raise HTTPException(status_code=404, detail="Store not found")
    session.delete(store)
    session.commit()
    return {"ok": True}
