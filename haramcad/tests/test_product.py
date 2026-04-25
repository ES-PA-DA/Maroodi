"""Product API tests."""


def test_create_product(client):
    response = client.post(
        "/products/",
        json={"name": "Coffee", "description": "Fresh coffee", "price": 7.99, "sku": "COFFEE-001", "unit": "kg", "amount": 10.0},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Coffee"
    assert data["price"] == 7.99
    assert data["unit"] == "kg"
    assert data["amount"] == 10.0
    assert len(data["id"]) == 36


def test_get_products(client):
    client.post(
        "/products/",
        json={"name": "Tea", "price": 5.00, "sku": "TEA-001", "unit": "kg", "amount": 5.0},
    )
    response = client.get("/products/")
    assert response.status_code == 200
    assert len(response.json()) >= 1


def test_get_product_not_found(client):
    response = client.get("/products/00000000-0000-0000-0000-000000000000")
    assert response.status_code == 404


def test_update_product(client):
    create_response = client.post(
        "/products/",
        json={"name": "Milk", "price": 3.00, "sku": "MILK-001", "unit": "liter", "amount": 3.0},
    )
    product_id = create_response.json()["id"]

    response = client.put(
        f"/products/{product_id}",
        json={"name": "Milk (Updated)", "price": 3.50, "unit": "liter", "amount": 4.0},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Milk (Updated)"
    assert data["price"] == 3.50
    assert data["amount"] == 4.0


def test_delete_product(client):
    create_response = client.post(
        "/products/",
        json={"name": "Sugar", "price": 2.00, "sku": "SUGAR-001", "unit": "kg", "amount": 2.0},
    )
    product_id = create_response.json()["id"]

    response = client.delete(f"/products/{product_id}")
    assert response.status_code == 200

    get_response = client.get(f"/products/{product_id}")
    assert get_response.status_code == 404