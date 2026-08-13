from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
async def root():
    return {"message":"Hello Teammates!!"}


@app.get("/health")
async def health():
    return {"message":"It's alive"}


class Store(BaseModel):
    name: str 
    latitude: float | None = None
    longitude: float | None = None

    def __repr__(self):
        return f"Store(name='{self.name}', latitude='{self.latitude}', longitude='{longitude}')"


@app.post("/store/")
async def create_store(store:Store):
    print(f"New store in the city: {store}")
    return store

