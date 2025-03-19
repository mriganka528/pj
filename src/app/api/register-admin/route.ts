import { adminSchema } from "@/schemas/admin/adminSchema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function POST(req: Request) {
    try {
        const user = await currentUser()
        const { userId } = await auth()
        if (!user || !userId) {
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }
        const body = await req.json()
        const { firstName, middleName, lastName } = await body
        const validation = adminSchema.safeParse({ firstName, middleName, lastName });
        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validation.error.errors },
                { status: 400 }
            );
        }
        console.log(firstName, middleName, lastName)
        const existingAdmin = await prisma.admin.findUnique({
            where: {
                clerkId: userId
            }
        })
        if (existingAdmin) {
            return NextResponse.json({
                success: false, message: "Admin already registered"
            }, { status: 409 })
        }
        const createdAdmin = await prisma.admin.create({
            data: {
                firstName,
                middleName,
                lastName,
                clerkId: userId,
                email: user?.emailAddresses[0].emailAddress
            }
        })
        return NextResponse.json(
            { success: true, message: "Notice updated successfully", createdAdmin },
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