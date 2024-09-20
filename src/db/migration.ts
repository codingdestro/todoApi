import { migrate } from "drizzle-orm/bun-sqlite/migrator"

import { db, sqlite } from "."

await migrate(db, { migrationsFolder: "./drizzle" })
await sqlite.close()
