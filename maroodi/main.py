from fastapi import FastAPI
from pydantic import BaseModel

from geopy.geocoders import Nominatim

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


@app.post("/geocode/")
async def geocode_store_addrees(storeAddress:str):
    print(f"Getting coords for store: {storeAddress}")
    geolocator = Nominatim(user_agent="maroodi/0.0.1 (luisrms073@gmail.com)")

    locations = geolocator.geocode(store_address, limit=10)

    print("locations")
    return locations

