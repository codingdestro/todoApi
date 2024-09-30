import { Hono } from "hono";
import { User } from "../types";
import { signInUser } from "../utils/signin";

const route = new Hono();

route.get("/", (c) => {
  return c.text("welcome to the basic server!");
});

route.post("/signin", async (c) => {
  const body: User = await c.req.parseBody();
  try {
    await signInUser(body);
    return c.text("user signed in!");
  } catch (err) {
    console.log(err);
    return c.text("failed to register a new user");
  }
});

export default route;
