import prismadb from "@/lib/prismadb";
import { userSchema } from "@/schemas/user/userSchema";
import { NextResponse } from "next/server";
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
        const existingUser = await prismadb.subscriber.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return NextResponse.json({
                success: false, message: "You have already suscribed to our newsletter"
            }, { status: 409 })
        }
        const newUser = await prismadb.subscriber.create({
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