import { Context, Hono } from "hono";
import { addUserIfNotExits, validatedUser } from "../middlewares/userLogin";
import { User } from "../types";

const route = new Hono();

route.use("/login", validatedUser, addUserIfNotExits);

route.post("/login", async (c: Context) => {
  const usx: User = c.get("user");
  console.log(usx);
  return c.text("user validated route");
});

export default route;
