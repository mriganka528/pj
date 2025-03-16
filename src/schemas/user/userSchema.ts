import { z } from "zod";
export const userSchema = z.object({
  name: z.string().min(3, { message: "Name must contain 3 characters" }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  feedback: z.string()
})