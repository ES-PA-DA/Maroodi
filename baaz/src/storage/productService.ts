import { SQLiteDatabase, SQLiteRunResult } from "expo-sqlite";


export interface IProduct {
  id: number;
  name: string;
  unit: string;
  status: number;
  picture: string;
  category: string;
  created_at: string;
};


export const getProducts = async (db: SQLiteDatabase, storeId: number): Promise<IProduct[]> => {
  return await db.getAllAsync(`
    SELECT
    products.*
    FROM
    products
    INNER JOIN stores_products ON stores_products.product_id = products.id
    WHERE
    products.status != 2
    AND stores_products.store_id = ?
  `, [storeId]);
};

export const getProductById = async (db: SQLiteDatabase, id: number): Promise<IProduct | null> => {
  return await db.getFirstAsync(`SELECT * FROM products WHERE id = ?`, [id]);
};

export const addProduct = async (
  db: SQLiteDatabase,
  product: IProduct
): Promise<SQLiteRunResult> => {
  return await db.runAsync(`
    INSERT INTO products
    (name, unit, status, picture, category, created_at)
    VALUES
    (?,?,?,?,?,?)
  `, [product.name, product.unit, product.status, product.picture, product.category, product.created_at]);
};

export const addProductToStore = async (
  db: SQLiteDatabase,
  productId: number,
  storeId: number
): Promise<SQLiteRunResult> => {
  return await db.runAsync(`
    INSERT INTO stores_products
    (store_id, product_id)
    VALUES
    (?,?)
  `, [storeId, productId]);
};

export const addProductPrice = async (
  db: SQLiteDatabase,
  storeProductId: number,
  price: string,
): Promise<SQLiteRunResult> => {
  return await db.runAsync(`
    INSERT INTO stores_products_prices
    (store_product_id, price, created_at)
    VALUES
    (?,?,?)
  `, [storeProductId, price, "2026-03-17"]);
};

export const updateProduct = async (db: SQLiteDatabase, product: IProduct): Promise<SQLiteRunResult> => {
  return await db.runAsync(`
    UPDATE stores
    SET
    name = ?,
    unit = ?,
    category = ?
    WHERE
    id = ?
  `, [product.name, product.unit, product.category, product.id]);
};

export const deleteProduct = async (db: SQLiteDatabase, id: number): Promise<SQLiteRunResult> => {
  return await db.runAsync(`UPDATE products SET status = 2 WHERE id = ?`, [id]);
};
