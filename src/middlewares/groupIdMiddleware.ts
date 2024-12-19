import { Context, Next } from "hono";
import { db } from "../db";
import { groups } from "../db/schema";
import { and, eq } from "drizzle-orm";

const getGroupId = async (c: Context, next: Next) => {
        try {
                const body = await c.req.json();
                const userId = c.get("userId");
                const grp = await db
                        .select()
                        .from(groups)
                        .where(
                                and(
                                        eq(groups.id, body.groupId),
                                        eq(groups.userId, userId)
                                )
                        );

                if (grp.length <= 0)
                        return c.json({ msg: "There is no group found" });
                c.set("groupId", grp[0].id);
                await next();
        } catch {
                return c.json({ erros: "failed to fetch group" }, 401);
        }
};
export default getGroupId;
