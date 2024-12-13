import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (plainText: string) => {
  try {
    const hashedPassword = await bcrypt.hash(plainText, saltRounds);
    return hashedPassword;
  } catch {
    throw "failed to hash the given password";
  }
};
