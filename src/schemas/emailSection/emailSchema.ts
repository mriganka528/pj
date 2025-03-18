import { z } from "zod";
export const emailSchema = z.object({
    emailAddress: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    subject: z.string().min(3, { message: "Subject should contain atleast 3 characters" }),
    message: z.string().min(5, { message: "Message should contain atleast 5 character" })
})