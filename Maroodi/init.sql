-- =========================================
-- STORES
-- =========================================

INSERT INTO stores (id, name, latitude, longitude, created_at)
VALUES
(1, 'Walmart', '32.5149', '-117.0382', NOW()),
(2, 'Calimax', '32.5027', '-116.9640', NOW());


-- =========================================
-- CATEGORIES
-- =========================================

INSERT INTO categories (id, name)
VALUES
(1, 'Limpieza'),
(2, 'Carnes'),
(3, 'Pescados'),
(4, 'Abarrotes');


-- =========================================
-- PRODUCTS
-- =========================================

INSERT INTO products (id, name, amount, unit_id, brand_id, status_id, created_at)
VALUES
(1, 'Escoba', 1.00, 1, 1, 1, NOW()),
(2, 'Jabón en polvo 1kg', 1.00, 1, 1, 1, NOW()),
(3, 'Pollo entero', 1.00, 2, 1, 1, NOW()),
(4, 'Pechuga de pollo', 1.00, 2, 1, 1, NOW()),
(5, 'Pescado tilapia', 1.00, 2, 1, 1, NOW()),
(6, 'Atún en lata', 1.00, 1, 1, 1, NOW()),
(7, 'Arroz 1kg', 1.00, 1, 1, 1, NOW()),
(8, 'Frijol 1kg', 1.00, 1, 1, 1, NOW());


-- =========================================
-- PRODUCT_CATEGORY RELATION
-- =========================================

INSERT INTO product_category (product_id, category_id)
VALUES
(1, 1), -- Escoba -> Limpieza
(2, 1), -- Jabón -> Limpieza
(3, 2), -- Pollo entero -> Carnes
(4, 2), -- Pechuga -> Carnes
(5, 3), -- Tilapia -> Pescados
(6, 3), -- Atún -> Pescados
(7, 4), -- Arroz -> Abarrotes
(8, 4); -- Frijol -> Abarrotes


-- =========================================
-- STORE_PRODUCT RELATION
-- =========================================

INSERT INTO store_product (id, store_id, product_id, created_at)
VALUES
(1, 1, 1, NOW()),
(2, 1, 2, NOW()),
(3, 1, 3, NOW()),
(4, 1, 5, NOW()),
(5, 1, 7, NOW()),

(6, 2, 1, NOW()),
(7, 2, 2, NOW()),
(8, 2, 4, NOW()),
(9, 2, 5, NOW()),
(10,2, 8, NOW());


-- =========================================
-- STORE_PRODUCT_PRICE (price comparison)
-- =========================================

INSERT INTO store_product_price (id, store_product_id, price, created_at)
VALUES
-- Walmart prices
(1, 1, 89.50, NOW()),   -- Escoba
(2, 2, 145.00, NOW()),  -- Jabón
(3, 3, 65.90, NOW()),   -- Pollo entero
(4, 4, 78.00, NOW()),   -- Tilapia
(5, 5, 24.90, NOW()),   -- Arroz

-- Calimax prices
(6, 6, 85.00, NOW()),   -- Escoba
(7, 7, 150.00, NOW()),  -- Jabón
(8, 8, 92.00, NOW()),   -- Pechuga
(9, 9, 74.50, NOW()),   -- Tilapia
(10,10, 28.00, NOW());  -- Frijol
