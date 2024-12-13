import { Hono } from "hono";

const route = new Hono();

route.on("get", "/test/", (c) => {
  return c.text("Hello from hono");
});

export default route;
