import { serve } from "bun";
import { Hono } from "hono";

const app = new Hono()

app.get("/", (c) => c.text("welcome to the codingdestro todo api"))
app.get("/test", (c) => c.json({
  "demo-todos":
    [
      "write a book",
      "create a paper boat",
      "solve mathematics"
    ]

}))

serve({
  fetch: app.fetch,
  port: 3000
})

console.log(`Server is running http://localhost:3000/`)
