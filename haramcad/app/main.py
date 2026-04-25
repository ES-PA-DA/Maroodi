"""Main FastAPI application."""
from fastapi import FastAPI
from app.presentation.routes import product_routes, store_routes
from app.presentation.routes.store_product_routes import store_products_router, product_stores_router

app = FastAPI(
    title="Haramcad API",
    description="FastAPI Project",
    version="1.0.0",
)

app.include_router(product_routes.router)
app.include_router(store_routes.router)
app.include_router(store_products_router)
app.include_router(product_stores_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to Haramcad API"}
