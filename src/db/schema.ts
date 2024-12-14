import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { title } from "process";
import { v4 as uuid } from "uuid";
export const users = sqliteTable("users", {
        id: text("id")
                .$defaultFn(() => uuid())
                .notNull(),
        username: text("username", { length: 20 }).notNull(),
        email: text("email").notNull(),
        password: text("password").notNull(),
});

export const todos = sqliteTable("todos", {
        id: text("id")
                .$defaultFn(() => uuid())
                .primaryKey()
                .notNull(),
        userId: text("user_id").notNull(),
        todo: text("todo").notNull(),
        completed: text("completed").default("false").notNull(),
        createdAt: text("created_at")
                .$defaultFn(() => new Date().toISOString())
                .notNull(),
        updatedAt: text("created_at")
                .$defaultFn(() => new Date().toISOString())
                .notNull(),
});

export const groups = sqliteTable("groups", {
        id: text("id").$defaultFn(() => uuid()),
        userId: text("user_id"),
        name: text("name").notNull(),
        createdAt: text("created_at").$defaultFn(() =>
                new Date().toISOString()
        ),
});

export const notes = sqliteTable("notes", {
        id: text("id").$defaultFn(() => uuid()),
        userId: text("user_id"),
        title: text("title").notNull(),
        note: text("note"),
        createdAt: text("created_at").$defaultFn(() =>
                new Date().toISOString()
        ),
});
