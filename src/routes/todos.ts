import { Hono } from "hono";
import { verifyAccessToken } from "../utils/authorization";

const route = new Hono();

//fetch all todos of a user
route.get("/", async (c) => {
  const header = c.req.header();
  const token = header["Authorization"];

  if (!token) {
    c.status(203);
    return c.text("invalid token");
  }
  const user = await verifyAccessToken(token);

  return c.text("get all todos");
});

export default route;
