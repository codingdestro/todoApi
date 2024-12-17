import jwt, { JwtPayload } from "jsonwebtoken";
import { User, UserToken } from "../types";

export interface UserTokenT extends JwtPayload {
        username: string;
        userId: string;
}
const secret = "secret123";

export const createAuthToken = async (username: string, userId: string) => {
        try {
                const token = jwt.sign(
                        {
                                username,
                                userId,
                        },
                        secret,
                        { expiresIn: "1h" }
                );
                return token;
        } catch {
                throw "failed to create authorization token!";
        }
};

export const verifyToken = async (token: string) => {
        try {
                const user = (await jwt.verify(token, secret)) as UserTokenT;
                return user;
        } catch (err) {
                if (err instanceof jwt.JsonWebTokenError) {
                        throw err.message;
                }
                throw "failed to verify the token";
        }
};
