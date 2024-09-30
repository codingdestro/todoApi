import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { v4 as uuid } from "uuid";
export const users = sqliteTable("users", {
  id: text("id").$defaultFn(() => uuid()),
  username: text("username", { length: 20 }),
  password: text("password"),
  email: text("email"),
});

export const todos = sqliteTable("todos", {
  id: text("id").$defaultFn(() => uuid()),
  userId: text("user_id"),
  todo: text("todo"),
});

export const groups = sqliteTable("groups", {
  id: text("id").$defaultFn(() => uuid()),
  userId: text("user_id"),
  todoId: text("todo_id"),
});
