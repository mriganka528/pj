import { z } from "zod";
import { Status, Category, Priority } from "@prisma/client";

export const noticeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    content: z.string().min(5, "Content must be at least 5 characters long"),
    status: z.nativeEnum(Status, { errorMap: () => ({ message: "Invalid status" }) }),
    category: z.nativeEnum(Category, { errorMap: () => ({ message: "Invalid category" }) }),
    fileUrl: z.string(),
    priority: z.nativeEnum(Priority, { errorMap: () => ({ message: "Invalid status" }) })
});
