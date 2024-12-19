import { Context, Hono, Next } from "hono";
import { db } from "../db";
import { groups, todos } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { verifyToken } from "../utils/authToken";
import authMiddleware from "../middlewares/authMiddleware";

const route = new Hono();

route.use("/*", authMiddleware);

//GET - /todos/groups
// auth - token
route.get("/", async (c: Context) => {
        try {
                const userId = c.get("userId");
                const groupsList = await db
                        .select()
                        .from(groups)
                        .where(eq(groups.userId, userId));

                return c.json({ msg: "fetched groups list", groupsList });
        } catch {
                return c.json({ erros: "failed to fetch groups" }, 400);
        }
});

//POST - /todos/groups/create

route.post("/create", async (c: Context) => {
        try {
                const userId = c.get("userId");
                const body = await c.req.json();
                await db.insert(groups).values({ userId, name: body.name });
                return c.json({ msg: "Create a group" });
        } catch {
                return c.json({ erros: "failed to create group" });
        }
});

//Get - /todos/groups/groutId
//get toodos of groupId
route.get("/:groupId", async (c: Context) => {
        try {
                const userId = c.get("userId");
                const grpId = c.req.param("groupId");
                const todoList = await db
                        .select()
                        .from(todos)
                        .where(
                                and(
                                        eq(todos.groupId, grpId),
                                        eq(todos.userId, userId)
                                )
                        );
                return c.json({ msg: "Get all todos", todos: todoList }, 200);
        } catch {
                return c.json({ errors: "failed to fetch todos" }, 400);
        }
});

//Get - /todos/groups/todos
//fetch all todos of all groups

//Delte - /todos/groups/delete
//delete a group by group_id
route.delete("/delete", async (c: Context) => {
        try {
                const body = await c.req.json();
                if (!body.groupId)
                        return c.json({ errors: "Group id not found!" }, 400);
                await db.delete(groups).where(eq(groups.id, body.groupId));
                await db.delete(todos).where(eq(todos.groupId, body.groupId));
        } catch {
                return c.json(
                        {
                                erros: "failed to delete the group",
                        },
                        400
                );
        } finally {
                return c.json({
                        msg: "Group deleted successfully.",
                });
        }
});

//Patch - /todos/groups/rename
//rename the group name

route.patch("/rename", async (c: Context) => {
        try {
                const body = await c.req.json();
                if (!body.groupId && !body.newname)
                        return c.json({ errors: "Group id not found!" }, 400);

                await db
                        .update(groups)
                        .set({ name: body.newname })
                        .where(eq(groups.id, body.groupId));
        } catch {
                return c.json({ errors: "failed to rename the group" }, 400);
        } finally {
                return c.json({
                        msg: "Group renamed successfully.",
                });
        }
});

export default route;
