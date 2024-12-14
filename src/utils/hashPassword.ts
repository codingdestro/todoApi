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

export const isPasswordMatch = async (hashedPasswd: string, passwd: string) => {
        try {
                const isMatch = await bcrypt.compare(passwd, hashedPasswd);
                return isMatch;
        } catch {
                return false;
        }
};
