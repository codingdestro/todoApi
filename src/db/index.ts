import * as schema from "./schema"
import { drizzle } from "drizzle-orm/bun-sqlite"
import { Database } from "bun:sqlite"

export const sqlite = new Database("db.sqlite")
export const db = drizzle(sqlite, { schema })


