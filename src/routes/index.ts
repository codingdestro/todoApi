import { Hono } from "hono";
import { User } from "../types";
import { loginUser, signInUser } from "../utils/signin";
import { getJWTToken } from "../utils/authorization";

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

route.post("/login", async (c) => {
  const user: User = await c.req.parseBody();
  try {
    if (!user.email && !user.password)
      return c.text("email of password missing!");
    await loginUser(user);
    const token = await getJWTToken(user);
    return c.json({ token: token });
  } catch (err) {
    console.log(err);
    return c.text("failed to login");
  }
});

export default route;
