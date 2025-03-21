import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Status, Category, Priority } from "@prisma/client";
import { noticeSchema } from "@/schemas/notice/noticeSchema";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        //  Authenticate the user
        const user = await currentUser()
        const { userId } = await auth()

        if (!user || !userId) {
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }
        const getAdmin = await prismadb.admin.findUnique({
            where: {
                clerkId: userId
            }
        })
        if (!getAdmin) {
            return NextResponse.json({
                success: false, message: "Admin not found"
            }, { status: 404 })
        }
        //  Parse FormData
        const formData = await req.formData();
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const status = formData.get("status")?.toString().toUpperCase() as Status;
        const category = formData.get("category") as Category;
        const fileUrl = formData.get("fileUrl") as string;
        const priority = formData.get("priority") as Priority


        // Validate form data using Zod
        const validation = noticeSchema.safeParse({ title, content, status, category, fileUrl, priority });
        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validation.error.errors },
                { status: 400 }
            );
        }


        const newNotice = await prismadb.notice.create({
            data: {
                title,
                content,
                status,
                category,
                noticeURL: fileUrl,
                priority,
                adminId: getAdmin.id,
            },
        });

        return NextResponse.json(
            { success: true, message: "Notice uploaded successfully", newNotice },
            { status: 200 }
        );
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
