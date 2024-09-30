import { serve } from "bun";
import { Hono } from "hono";
import { db } from "./db";
import { users } from "./db/schema";

import route from "./routes";

const app = new Hono();

app.route("/", route);
serve({
  fetch: app.fetch,
  port: 3000,
});

console.log(`Server is running http://localhost:3000/`);
