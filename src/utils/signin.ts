import { db } from "../db";
import bcrypt from "bcrypt";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { User } from "../types";

export const signInUser = async (user: User) => {
  //create user password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  await addUser(user);
};

export const isUserAlreadyExists = async (user: User) => {
  const _user = await db
    .select()
    .from(users)
    .where(eq(users.email, user.email));
  if (_user.length == 0) return false;
  else return true;
};

export const addUser = async (user: User) => {
  if (await isUserAlreadyExists(user)) throw "user alread exists";

  const usr = await db
    .insert(users)
    .values({
      username: user.username,
      email: user.email,
      password: user.password,
    })
    .returning();
};
