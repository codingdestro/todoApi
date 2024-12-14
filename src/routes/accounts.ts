import { Context, Hono } from "hono";
import {
        addUserIfNotExits,
        loginIfUserExists,
        validatedUser,
} from "../middlewares/userLogin";
import { User } from "../types";
import { createAuthToken } from "../utils/authToken";

const route = new Hono();

route.use("/login", validatedUser, loginIfUserExists);
route.use("/signin", validatedUser, addUserIfNotExits);

route.post("/login", async (c: Context) => {
        const token: string = c.get("token");
        return c.json({ token, msg: "user logged in" });
});

route.post("/signin", async (c: Context) => {
        const user: User = c.get("user");
        const userId = c.get("userId");
        try {
                const token = await createAuthToken(user.username!, userId);
                return c.json({ token, msg: "user signed in in" });
        } catch (err) {
                return c.json({ errors: err }, 400);
        }
});

export default route;
