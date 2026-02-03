from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Simple CRUD Demo")

# Fake DB
items_db = []
current_id = 1


class Item(BaseModel):
    name: str
    price: float
    in_stock: bool = True


# -------------------- CRUD --------------------

@app.post("/items")
def create_item(item: Item):
    global current_id
    new_item = {
        "id": current_id,
        **item.dict()
    }
    items_db.append(new_item)
    current_id += 1
    return new_item


@app.get("/items")
def get_items():
    return items_db


@app.get("/items/{item_id}")
def get_item(item_id: int):
    for item in items_db:
        if item["id"] == item_id:
            return item
    raise HTTPException(404, "Item not found")


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    for i in range(len(items_db)):
        if items_db[i]["id"] == item_id:
            items_db[i] = {"id": item_id, **item.dict()}
            return items_db[i]
    raise HTTPException(404, "Item not found")


@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    for i in range(len(items_db)):
        if items_db[i]["id"] == item_id:
            items_db.pop(i)
            return {"message": "Deleted"}
    raise HTTPException(404, "Item not found")

# uvicorm main:app --reload