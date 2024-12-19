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
                const body = await c.req.json();

                await db.insert(todos).values({
                        userId: userId,
                        groupId: body.groupId,
                        todo: body.todo,
                });

                return c.json({ msg: "A todo inserted successfully" }, 200);
        } catch {
                return c.json({ errors: "Got and problem" }, 400);
        }
});

route.use("/completed", authMiddleware);
route.post("/completed", async (c: Context) => {
        try {
                const userId = c.get("userId");
                const body = await c.req.json();
                if (!body && !body.todoId)
                        return c.json({ errors: "no todo provided" }, 400);
                await db
                        .update(todos)
                        .set({
                                completed: "true",
                        })
                        .where(
                                and(
                                        eq(todos.id, body.todoId),
                                        eq(todos.userId, userId)
                                )
                        );
                return c.json({ msg: "todo updated" }, 200);
        } catch {
                return c.json({ errors: "failed to update the todo" }, 400);
        }
});

route.use("/update", authMiddleware);
route.post("/update", async (c: Context) => {
        try {
                const userId = c.get("userId");
                const body = await c.req.json();
                console.log(userId);
                if (!body && !body.todo && !body.todoId)
                        return c.json({ errors: "no todo provided" }, 400);
                await db
                        .update(todos)
                        .set({
                                todo: body.todo,
                        })
                        .where(
                                and(
                                        eq(todos.id, body.todoId),
                                        eq(todos.userId, userId)
                                )
                        );

                return c.json({ msg: "todo updated" }, 200);
        } catch {
                return c.json({ errors: "failed to update the todo" }, 400);
        }
});

route.use("/delete", authMiddleware);
route.delete("/delete", async (c: Context) => {
        try {
                const userId = c.get("userId");
                const body = await c.req.json();
                if (!body && !body.todoId)
                        return c.json({ errors: "no id provided" }, 400);
                await db.delete(todos).where(eq(todos.id, body.todoId));

                return c.json({ msg: "todo deleted" }, 200);
        } catch {
                return c.json({ errors: "failed to delete the todo" }, 400);
        }
});

export default route;
