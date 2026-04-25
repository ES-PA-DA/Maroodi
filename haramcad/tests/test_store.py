"""Store API tests."""


def test_create_store(client):
    response = client.post(
        "/stores/",
        json={"name": "Coffee Shop", "address": "123 Main St", "city": "Seattle"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Coffee Shop"
    assert data["city"] == "Seattle"
    assert len(data["id"]) == 36


def test_get_stores(client):
    client.post(
        "/stores/",
        json={"name": "Tea House", "city": "Boston"},
    )
    response = client.get("/stores/")
    assert response.status_code == 200
    assert len(response.json()) >= 1


def test_get_store_not_found(client):
    response = client.get("/stores/00000000-0000-0000-0000-000000000000")
    assert response.status_code == 404


def test_update_store(client):
    create_response = client.post(
        "/stores/",
        json={"name": "Bakery", "city": "Chicago"},
    )
    store_id = create_response.json()["id"]

    response = client.put(
        f"/stores/{store_id}",
        json={"name": "Bakery (Updated)", "city": "New York"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Bakery (Updated)"
    assert data["city"] == "New York"