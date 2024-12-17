import { serve } from "bun";
import { Hono } from "hono";
import { db } from "./db";
import { users } from "./db/schema";

import login from "./routes/accounts";
import todoGroups from "./routes/todoGroups";
import todoRoutes from "./routes/todos";

const app = new Hono();

app.route("/todos/groups", todoGroups);
app.route("/todos", todoRoutes);
app.route("/account", login);

serve({
        fetch: app.fetch,
        port: 3000,
});

console.log(`Server is running http://localhost:3000/`);
