import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";

const sqliteDB = openDatabaseSync("database.db");

export const db = drizzle(sqliteDB);
