import { Context, Next } from "hono";
import { User, UserT } from "../types";
import { z } from "zod";
import { users } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { hashPassword, isPasswordMatch } from "../utils/hashPassword";
import userSchema from "../zodSchemas/userShema";
import { createAuthToken } from "../utils/authToken";

export const validatedUser = async (c: Context, next: Next) => {
        const body: User = await c.req.json();

        try {
                const user = userSchema.parse(body);
                c.set("user", body);
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

export const loginIfUserExists = async (c: Context, next: Next) => {
        try {
                const user: User = c.get("user");

                const userExists = await db
                        .select()
                        .from(users)
                        .where(eq(users.email, user.email))
                        .limit(1);

                if (userExists.length > 0) {
                        if (
                                !(await isPasswordMatch(
                                        userExists[0].password,
                                        user.password
                                ))
                        ) {
                                return c.json(
                                        { erros: "password does not match!" },
                                        400
                                );
                        }
                        try {
                                const token = await createAuthToken(
                                        userExists[0].username,
                                        userExists[0].id
                                );

                                c.set("token", token);
                                await next();
                        } catch (err) {
                                return c.json({ errors: err }, 400);
                        }
                }
                return c.json({ errors: "user does not exists!" }, 400);
        } catch {
                return c.json({ errors: "user does not exists!" }, 400);
        }
};

export const addUserIfNotExits = async (c: Context, next: Next) => {
        try {
                const user: UserT = c.get("user");

                const existingUser = await db
                        .select()
                        .from(users)
                        .where(eq(users.email, user.email))
                        .limit(1);

                if (existingUser.length > 0) {
                        return c.json({ errors: "user already exists" }, 409);
                }

                user.password = await hashPassword(user.password);

                await db.insert(users).values(user!);
                const newUser = await db
                        .select()
                        .from(users)
                        .where(eq(users.email, user.email))
                        .limit(1);

                c.set("userId", newUser[0].id);

                await next();
        } catch {
                return c.json({ errors: "failed to add user" }, 400);
        }
};
