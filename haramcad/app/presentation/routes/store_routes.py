"""Store routes."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.domain.entities.store import Store
from app.application.services.store_service import StoreService
from app.infrastructure.database.database import get_db
from app.infrastructure.repositories.store_repository_impl import StoreRepositoryImpl
from app.presentation.schemas.store_schema import StoreCreate, StoreUpdate, StoreResponse

router = APIRouter(prefix="/stores", tags=["stores"])


def get_store_service(db: Session = Depends(get_db)) -> StoreService:
    repository = StoreRepositoryImpl(db)
    return StoreService(repository)


@router.get("/", response_model=List[StoreResponse])
def get_stores(service: StoreService = Depends(get_store_service)):
    return service.get_all()


@router.get("/{store_id}", response_model=StoreResponse)
def get_store(store_id: str, service: StoreService = Depends(get_store_service)):
    store = service.get_by_id(store_id)
    if not store:
        raise HTTPException(status_code=404, detail="Store not found")
    return store


@router.post("/", response_model=StoreResponse)
def create_store(data: StoreCreate, service: StoreService = Depends(get_store_service)):
    store = Store(**data.model_dump())
    return service.create(store)


@router.put("/{store_id}", response_model=StoreResponse)
def update_store(store_id: str, data: StoreUpdate, service: StoreService = Depends(get_store_service)):
    store = service.get_by_id(store_id)
    if not store:
        raise HTTPException(status_code=404, detail="Store not found")
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(store, key, value)
    return service.update(store)


@router.delete("/{store_id}")
def delete_store(store_id: str, service: StoreService = Depends(get_store_service)):
    if not service.delete(store_id):
        raise HTTPException(status_code=404, detail="Store not found")
    return {"message": "Store deleted"}
