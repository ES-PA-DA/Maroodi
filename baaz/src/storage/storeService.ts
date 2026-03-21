import { SQLiteDatabase, SQLiteRunResult } from "expo-sqlite";


export interface IStore {
  id: number;
  name: string;
  status: number;
  picture: string;
  latitude: string;
  longitude: string;
  created_at: string;
};


export const getStores = async (db: SQLiteDatabase): Promise<IStore[]> => {
  return await db.getAllAsync(`SELECT * FROM stores WHERE status != 2`);
};

export const getStoreById = async (db: SQLiteDatabase, id: number): Promise<IStore | null> => {
  return await db.getFirstAsync(`SELECT * FROM stores WHERE id = ?`, [id]);
};

export const addStore = async (db: SQLiteDatabase, store: IStore): Promise<SQLiteRunResult> => {
  return await db.runAsync(`
    INSERT INTO stores
    (name, status, picture, latitude, longitude, created_at)
    VALUES
    (?,?,?,?,?,?)
  `, [store.name, store.status, store.picture, store.latitude, store.longitude, store.created_at]);
};

export const updateStore = async (db: SQLiteDatabase, store: IStore): Promise<SQLiteRunResult> => {
  return await db.runAsync(`
    UPDATE stores
    SET
    name = ?,
    latitude = ?,
    longitude = ?
    WHERE
    id = ?
  `, [store.name, store.latitude, store.longitude, store.id]);
};

export const deleteStore = async (db: SQLiteDatabase, id: number): Promise<SQLiteRunResult> => {
  return await db.runAsync(`UPDATE stores SET status = 2 WHERE id = ?`, [id]);
};
