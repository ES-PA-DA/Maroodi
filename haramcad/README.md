# Haramcad API

FastAPI clean architecture project.

## Structure

```
app/
├── domain/              # Entities & repository interfaces
├── infrastructure/      # Database models & implementations
├── application/         # Business logic services
└── presentation/        # FastAPI routes & schemas
```

## Entities

- **Product** - Product catalog (uses UUID)
- **Store** - Grocery store (uses UUID)
- **StoreProduct** - Many-to-many relation with price/stock per store (uses UUID)

## Quick Start (with doit)

All operations run inside Docker using `doit`:

```bash
cd haramcad

# Install doit (if not installed)
pip install doit

# Build docker images
doit build

# Run development server (with logs)
doit dev

# View docker logs
doit logs

# Run tests (uses PostgreSQL)
doit test

# Run linting
doit lint

# Database migrations
doit migrate          # Apply migrations
doit migration       # Create new migration

# Clean up docker resources
doit cleanup

# View all available tasks
doit list
```

## Manual Setup

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

## Test

Tests use PostgreSQL by default (via DATABASE_URL env var):

```bash
pytest tests/ -v
```

## Docker Ports

- API: `http://localhost:8000`
- DB: `localhost:5434`
- Test DB: `localhost:5435`

## Database Migrations

This project uses **Alembic** for database migrations.

### Workflow

1. **Make changes to models** in `app/infrastructure/database/models.py`

2. **Create a migration:**
   ```bash
   MESSAGE="Add new field" doit migration
   ```
   Or manually set the message:
   ```bash
   MESSAGE="Add category to products" docker compose run --rm migration
   ```

3. **Review the generated migration** in `alembic/versions/`

4. **Migrations run automatically** with `doit dev` and `doit test`

### Manual Migration Commands

```bash
# Apply all migrations
docker compose run --rm migrate

# Create new migration (after model changes)
docker compose run --rm migration

# Check current migration status
docker compose run --rm migrate --show

# Rollback last migration
docker compose run --rm migrate downgrade -1
```

### Important Notes

- **ALWAYS create a migration** when changing models, not just `create_all()`
- Migrations are version controlled - review them before committing
- Test migrations on a fresh database before deploying
- Use `downgrade` to rollback if something goes wrong

## API Endpoints

### Products
- `GET /products/` - List all products
- `GET /products/{id}` - Get product by UUID
- `POST /products/` - Create product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Stores
- `GET /stores/` - List all stores
- `GET /stores/{id}` - Get store by UUID
- `POST /stores/` - Create store
- `PUT /stores/{id}` - Update store
- `DELETE /stores/{id}` - Delete store

### Store Products (nested)
- `GET /stores/{store_id}/products/` - List products in a store
- `POST /stores/{store_id}/products/` - Add product to store
- `GET /stores/{store_id}/products/{product_id}` - Get store-product
- `PUT /stores/{store_id}/products/{product_id}` - Update store-product
- `DELETE /stores/{store_id}/products/{product_id}` - Remove product from store
- `GET /products/{product_id}/stores/` - List stores containing a product

## API Docs

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Available doit Tasks

| Command       | Description                          |
|---------------|--------------------------------------|
| `doit build`    | Build docker images               |
| `doit dev`      | Run app with hot reload         |
| `doit logs`     | Show docker logs                 |
| `doit up`      | Start api + db services         |
| `doit down`    | Stop all services                |
| `doit test`   | Run tests in docker (PostgreSQL) |
| `doit lint`   | Run flake8 linting              |
| `doit migrate` | Apply database migrations       |
| `doit migration`| Create new migration          |
| `doit cleanup`| Clean up docker volumes         |
| `doit rebuild`| Rebuild from scratch            |