from fastapi import FastAPI

from src.database import create_db_and_tables
import src.products.router as products
import src.stores.router as stores

app = FastAPI()

app.include_router(products.router, tags=["products"])
app.include_router(stores.router, tags=["stores"])


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
async def root():
    return {"message": "Hellooo Pacheco and Esteban !!"}
