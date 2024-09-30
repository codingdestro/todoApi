import { db } from "../db";
import bcrypt from "bcrypt";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { User } from "../types";
import { throws } from "assert";
import { getJWTToken } from "./authorization";

export const signInUser = async (user: User) => {
  //create user password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  await addUser(user);
};

export const loginUser = async (user: User) => {
  const _user = await isUserAlreadyExists(user);
  if (!_user || !_user[0].password) {
    throw "user does not exists";
    return;
  }
  const match = await bcrypt.compare(user.password, _user[0].password);
  if (!match) throw "password does not match!";
};
export const isUserAlreadyExists = async (user: User) => {
  const _user = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email));
  if (_user.length == 0) return false;
  else return _user;
};

export const addUser = async (user: User) => {
  if (!(await isUserAlreadyExists(user))) throw "user alread exists";

  const usr = await db
    .insert(users)
    .values({
      username: user.username,
      email: user.email,
      password: user.password,
    })
    .returning();
};
