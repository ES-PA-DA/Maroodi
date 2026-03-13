import { SQLiteDatabase } from "expo-sqlite";

export default async (db: SQLiteDatabase): Promise<void> => {

  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS stores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        picture TEXT NOT NULL,
        latitude TEXT NOT NULL,
        longitude TEXT NOT NULL,
        created_at TEXT NOT NULL,
        status INT NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        unit TEXT NOT NULL,
        picture TEXT NOT NULL,
        category TEXT NOT NULL,
        created_at TEXT NOT NULL,
        status INT NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS stores_products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        store_id INT NOT NULL,
        product_id INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS stores_products_prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        store_product_id INT NOT NULL,
        price TEXT NOT NULL,
        created_at TEXT NOT NULL,
        status INT NOT NULL DEFAULT 0
      );
    `);
  } catch (error: unknown) {
    console.log("DB Init Error!");
    if (error instanceof Error) console.log(error.message);
  }
};
