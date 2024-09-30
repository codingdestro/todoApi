import { User } from "../types";
import jwt from "jsonwebtoken";

export const getJWTToken = async (user: User) => {
  const token = jwt.sign(user, "secrect", { expiresIn: "1h" });
  return token;
};

export const verifyAccessToken = async (token: string) => {
  const verified = jwt.verify(token, "secrect");
};
