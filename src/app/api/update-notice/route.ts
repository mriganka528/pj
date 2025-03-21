import prismadb from "@/lib/prismadb";
import { noticeSchema } from "@/schemas/notice/noticeSchema";
import { currentUser } from "@clerk/nextjs/server";
import { Category, Priority, Status } from "@prisma/client";
import { NextResponse } from "next/server";
export async function PATCH(req: Request) {
    try {
        const user = await currentUser()

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }
        const url = new URL(req.url);
        const notice_id = url.searchParams.get("id")
        if (!notice_id) {
            return NextResponse.json({
                success: false, message: "Notice id not passed currectly"
            }, { status: 404 })
        }

        const find_notice = await prismadb.notice.findUnique({
            where: {
                id: notice_id
            }
        })
        if (!find_notice) {
            return NextResponse.json({
                success: false, message: "No notice found"
            }, { status: 404 })
        }

        const formData = await req.formData()
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const status = formData.get("status")?.toString().toUpperCase() as Status;
        const category = formData.get("category") as Category;
        const fileUrl = formData.get("fileUrl") as string;
        const priority = formData.get("priority") as Priority

        const validation = noticeSchema.safeParse({ title, content, status, category, fileUrl, priority });
        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validation.error.errors },
                { status: 400 }
            );
        }


        const updated_notice = await prismadb.notice.update({
            where: {
                id: notice_id
            },
            data: {
                title,
                content,
                status,
                category,
                noticeURL: fileUrl,
                priority
            },
        })
        return NextResponse.json(
            { success: true, message: "Notice updated successfully", notice: updated_notice },
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