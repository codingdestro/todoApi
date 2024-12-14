import { Context, Next } from "hono";
import { User } from "../types";
import { z } from "zod";
import { users } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { hashPassword } from "../utils/hashPassword";
import userSchema from "../zodSchemas/userShema";

export const validatedUser = async (c: Context, next: Next) => {
  const body: User = await c.req.json();

  try {
    const user = userSchema.parse(body);
    c.set("user", user);
    await next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return c.json({ errors: err.errors }, 400);
    }
    return c.json(
      { erros: "failed to valiedate the user credentials" },
      422
    );
  }
};

export const addUserIfNotExits = async (c: Context, next: Next) => {
  try {
    const user: User = c.get("user");

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email))
      .limit(1);

    if (existingUser.length > 0) {
      return c.json({ errors: "user already exists" }, 409);
    }

    user.password = await hashPassword(user.password);

    const res = await db.insert(users).values(user);
    await next();
  } catch {
    return c.json({ errors: "failed to add user" }, 400);
  }
};
