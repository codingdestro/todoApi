import { text, sqliteTable } from "drizzle-orm/sqlite-core"
export const users = sqliteTable('users', {
  id: text("id"),
  username: text("username", { length: 20 }),
  password: text("password"),
  email: text("email")
})

export const todos = sqliteTable('todos', {
  id: text("id"),
  userId: text("user_id"),
  todo: text("todo")
})

export const groups = sqliteTable("groups", {
  id: text("id"),
  userId: text("user_id"),
  todoId: text("todo_id")
})
