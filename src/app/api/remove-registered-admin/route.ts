import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function DELETE(req: Request) {
    try {
        const user = await currentUser()
        const { userId } = await auth()
        if (!user || !userId) {
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }
        const body = await req.json();
        const { id }: { id: string } = body
        console.log("IDDDDDDDDDD", id);
        console.log(userId === id)
        if (userId === id) {
            const isAdminExist = await prisma.admin.findUnique({
                where: {
                    clerkId: id
                }
            });
            if (!isAdminExist) {
                return NextResponse.json(
                    { success: true, message: "Admin doesn't exist" },
                    { status: 404 }
                );
            }
            await prisma.admin.delete({
                where: {
                    clerkId: id
                }
            })

            return NextResponse.json(
                { success: true, message: "Admins fatched successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "Wrong id is passed" },
                { status: 502 }
            );
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}