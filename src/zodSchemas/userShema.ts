import { z } from "zod";

const userSchema = z.object({
        username: z
                .string()
                .min(5, "username must be at leat 5 characters long"),
        email: z.string().email("Invailed email"),
        password: z.string().min(6, "at least characters long password"),
});
export default userSchema;
