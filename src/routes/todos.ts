import { Context, Hono, Next } from "hono";
import { db } from "../db";
import { groups, todos } from "../db/schema";
import { and, eq } from "drizzle-orm";
import authMiddleware from "../middlewares/authMiddleware";
import groupIdMiddleware from "../middlewares/groupIdMiddleware";

const route = new Hono();

//POST - /todos/add
route.use("/add", authMiddleware, groupIdMiddleware);
route.post("/add", async (c: Context) => {
        try {
                const userId = c.get("userId");
                const groupId = c.get("groupId");
                const body = await c.req.json();

                console.log(body, groupId);
                await db.insert(todos).values({
                        userId: userId,
                        groupId: groupId,
                        todo: body.todo,
                });

                return c.json({ msg: "A todo inserted successfully" }, 200);
        } catch {
                return c.json({ errors: "Got and problem" }, 400);
        }
});

export default route;
