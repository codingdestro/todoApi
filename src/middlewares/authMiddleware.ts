import { Context, Next } from "hono";
import { verifyToken } from "../utils/authToken";
const authMiddleware = async (c: Context, next: Next) => {
        try {
                const token = c.req.header("Authorization");
                if (!token)
                        return c.json(
                                { erros: "Authorization token missing" },
                                401
                        );
                const user = await verifyToken(token);
                c.set("userId", user.userId);
        } catch (err) {
                c.json({ errors: "invailed or expire Authorization token" });
        }

        await next();
};

export default authMiddleware;
