import { userSchema } from "@/schemas/user/userSchema";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function POST(req: Request) {
    try {

        const body = await req.json();
        const validationResult = userSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validationResult.error.errors },
                { status: 400 }
            );
        }
        const { name, email, feedback } = body
        const existingUser = await prisma.suscribedUser.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return NextResponse.json({
                success: false, message: "User with this email already exist"
            }, { status: 409 })
        }
        const newUser = await prisma.suscribedUser.create({
            data: {
                name,
                email,
                feedback
            }
        })
        return NextResponse.json({
            success: true, message: `User has been created successfully,${newUser}`
        }, { status: 200 })
    } catch (error) {
        console.error("Error creating user: ", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}