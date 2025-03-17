import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
    try {
        // Check authentication
        const user = await currentUser()

        if (!user) {
            console.log("Not authenticated");
            return NextResponse.json(
                { success: false, message: "Authentication error" },
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
        const existingNotice = await prisma.notice.findUnique({
            where: { id: notice_id },
        });

        if (!existingNotice) {
            return NextResponse.json(
                { success: false, message: "Notice not found" },
                { status: 404 }
            );
        }

        // Delete notice
        const deletedNotice = await prisma.notice.delete({
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
