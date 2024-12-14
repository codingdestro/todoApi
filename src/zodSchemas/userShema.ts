import { z } from "zod";

const userSchema = z.object({
        email: z.string().email("Invailed email"),
        password: z.string().min(6, "at least characters long password"),
});
export default userSchema;
