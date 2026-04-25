"""StoreProduct API tests."""


def test_create_store_product(client):
    product_response = client.post(
        "/products/",
        json={"name": "Coffee", "price": 7.99, "sku": "COFFEE-001", "unit": "kg"},
    )
    store_response = client.post(
        "/stores/",
        json={"name": "Coffee Shop", "city": "Seattle"},
    )

    product_id = product_response.json()["id"]
    store_id = store_response.json()["id"]

    response = client.post(
        f"/stores/{store_id}/products/",
        json={
            "product_id": product_id,
            "price": 8.99,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["store_id"] == store_id
    assert data["product_id"] == product_id
    assert data["price"] == 8.99
    assert len(data["id"]) == 36


def test_get_store_products_by_store(client):
    product_response = client.post(
        "/products/",
        json={"name": "Tea", "price": 5.00, "sku": "TEA-001", "unit": "kg"},
    )
    store_response = client.post(
        "/stores/",
        json={"name": "Tea House", "city": "Boston"},
    )

    store_id = store_response.json()["id"]
    product_id = product_response.json()["id"]

    client.post(
        f"/stores/{store_id}/products/",
        json={
            "product_id": product_id,
            "price": 5.50,
        },
    )

    response = client.get(f"/stores/{store_id}/products/")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_store_products_by_product(client):
    product_response = client.post(
        "/products/",
        json={"name": "Sugar", "price": 2.00, "sku": "SUGAR-001", "unit": "kg"},
    )
    store1_response = client.post(
        "/stores/",
        json={"name": "Store A", "city": "Miami"},
    )
    store2_response = client.post(
        "/stores/",
        json={"name": "Store B", "city": "Denver"},
    )

    product_id = product_response.json()["id"]

    client.post(
        f"/stores/{store1_response.json()['id']}/products/",
        json={
            "product_id": product_id,
            "price": 2.50,
        },
    )
    client.post(
        f"/stores/{store2_response.json()['id']}/products/",
        json={
            "product_id": product_id,
            "price": 2.75,
        },
    )

    response = client.get(f"/products/{product_id}/stores/")
    assert response.status_code == 200
    assert len(response.json()) == 2


def test_get_store_product(client):
    product_response = client.post(
        "/products/",
        json={"name": "Milk", "price": 3.00, "sku": "MILK-001", "unit": "liter"},
    )
    store_response = client.post(
        "/stores/",
        json={"name": "Dairy Shop", "city": "Portland"},
    )

    store_id = store_response.json()["id"]
    product_id = product_response.json()["id"]

    client.post(
        f"/stores/{store_id}/products/",
        json={
            "product_id": product_id,
            "price": 3.50,
        },
    )

    response = client.get(f"/stores/{store_id}/products/{product_id}")
    assert response.status_code == 200
    assert response.json()["product_id"] == product_id


def test_update_store_product(client):
    product_response = client.post(
        "/products/",
        json={"name": "Bread", "price": 2.00, "sku": "BREAD-001", "unit": "kg"},
    )
    store_response = client.post(
        "/stores/",
        json={"name": "Bakery", "city": "Chicago"},
    )

    store_id = store_response.json()["id"]
    product_id = product_response.json()["id"]

    client.post(
        f"/stores/{store_id}/products/",
        json={
            "product_id": product_id,
            "price": 2.50,
        },
    )

    response = client.put(
        f"/stores/{store_id}/products/{product_id}",
        json={"price": 2.75},
    )
    assert response.status_code == 200
    assert response.json()["price"] == 2.75


def test_delete_store_product(client):
    product_response = client.post(
        "/products/",
        json={"name": "Butter", "price": 4.00, "sku": "BUTTER-001", "unit": "kg"},
    )
    store_response = client.post(
        "/stores/",
        json={"name": "Mart", "city": "Austin"},
    )

    store_id = store_response.json()["id"]
    product_id = product_response.json()["id"]

    client.post(
        f"/stores/{store_id}/products/",
        json={
            "product_id": product_id,
            "price": 4.50,
        },
    )

    response = client.delete(f"/stores/{store_id}/products/{product_id}")
    assert response.status_code == 200

    get_response = client.get(f"/stores/{store_id}/products/{product_id}")
    assert get_response.status_code == 404
