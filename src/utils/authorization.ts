import { User } from "../types";
import jwt from "jsonwebtoken";

const SECRECT = "this is secrect";

export const getJWTToken = async (user: User) => {
  const token = jwt.sign(user, SECRECT, { expiresIn: "1h" });
  return token;
};

export const verifyAccessToken = async (token: string) => {
  const verified = jwt.verify(token, SECRECT);
  console.log(verified);
  return verified;
};
