from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List
import uuid


app = FastAPI(
    title="FastAPI Deployment Demo",
    description="Single file demo: CRUD + Image upload + VGG inference",
    version="1.0.0"
)

items_db = []


class Item(BaseModel):
    name: str
    price: float
    in_stock: bool = True


class ItemResponse(Item):
    id: str

@app.get("/")
def root():
    return {
        "message": "Welcome to FastAPI deployment session"
    }


@app.post("/items", response_model=ItemResponse)
async def create_item(item: Item):
    new_item = {
        "id": str(uuid.uuid4()),
        **item.dict()
    }
    items_db.append(new_item)
    return new_item


@app.get("/items", response_model=List[ItemResponse])
def get_all_items():
    return items_db


@app.get("/items/{item_id}", response_model=ItemResponse)
def get_item(item_id: str):
    for item in items_db:
        if item["id"] == item_id:
            return item

    raise HTTPException(status_code=404, detail="Item not found")


@app.put("/items/{item_id}", response_model=ItemResponse)
def update_item(item_id: str, updated_item: Item):
    for index, item in enumerate(items_db):
        if item["id"] == item_id:
            items_db[index] = {
                "id": item_id,
                **updated_item.dict()
            }
            return items_db[index]

    raise HTTPException(status_code=404, detail="Item not found")



@app.delete("/items/{item_id}")
def delete_item(item_id: str):
    for index, item in enumerate(items_db):
        if item["id"] == item_id:
            items_db.pop(index)
            return {"message": "Item deleted successfully"}

    raise HTTPException(status_code=404, detail="Item not found")



@app.get("/search")
def search_items(max_price: float):
    result = []
    for item in items_db:
        if item["price"] <= max_price:
            result.append(item)

    return result
