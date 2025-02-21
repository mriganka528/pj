import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PrismaClient, Status, Category } from "@prisma/client";
import path from "path";
import fs from "fs";
import { noticeSchema } from "@/schemas/notice/noticeSchema";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        //  Authenticate the user
        const getToken = await auth();
        if (!getToken) {
            console.log("Not authenticated");
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }

        //  Parse FormData
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const status = formData.get("status")?.toString().toUpperCase() as Status;
        const category = formData.get("category") as Category;
        const file = formData.get("file") as File;

        console.log("Received data:", { title, content, status, category, file });

        // Validate form data using Zod
        const validation = noticeSchema.safeParse({ title, content, status, category, file });
        if (!validation.success) {
            console.error("Validation Error:", validation.error.errors);
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validation.error.errors },
                { status: 400 }
            );
        }

        //  Save file to the local directory
        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        //  Construct file URL
        const noticeURL = `/uploads/${Date.now()}-${file.name}`;

        //  Save notice details in Prisma
        const newNotice = await prisma.notice.create({
            data: {
                title,
                content,
                status,
                category,
                noticeURL,
            },
        });

        return NextResponse.json(
            { success: true, message: "Notice uploaded successfully", newNotice },
            { status: 200 }
        );
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
