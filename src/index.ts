import { serve } from "bun";
import { Hono } from "hono";
import { db } from "./db";
import { users } from "./db/schema";

import route from "./routes";
import todosRoute from "./routes/todos";

const app = new Hono();

app.route("/", route);
app.route("/todos", todosRoute);

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log(`Server is running http://localhost:3000/`);
