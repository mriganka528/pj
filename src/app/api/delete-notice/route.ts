import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function DELETE(req: Request) {
    try {
        // Check authentication
        const user = await currentUser()
        const { userId } = await auth()
        if (!user || !userId) {
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }
        //check if admin exist or not
        const isAdminExisted = await prismadb.admin.findUnique({
            where: {
                clerkId: userId
            }
        })
        if (!isAdminExisted) {
            return NextResponse.json(
                { success: false, message: "You are not authorized to perform this action" },
                { status: 401 }
            );
        }
        // Parse request body
        const body = await req.json();
        const { notice_id }: { notice_id: string } = body;

        if (!notice_id) {
            return NextResponse.json(
                { success: false, message: "Notice ID is required" },
                { status: 400 }
            );
        }

        // Check if notice exists
        const existingNotice = await prismadb.notice.findUnique({
            where: { id: notice_id },
        });

        if (!existingNotice) {
            return NextResponse.json(
                { success: false, message: "Notice not found" },
                { status: 404 }
            );
        }
        if (existingNotice.adminId !== isAdminExisted.id) {
            return NextResponse.json(
                { success: false, message: "You are not authorized to perform this action" },
                { status: 401 }
            );
        }
        // Delete notice
        const deletedNotice = await prismadb.notice.delete({
            where: { id: notice_id },
        });

        return NextResponse.json(
            { success: true, message: "Notice deleted successfully", data: deletedNotice },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting notice:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
