import { NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMail";
import { currentUser } from "@clerk/nextjs/server";
import { emailSchema } from "@/schemas/emailSection/emailSchema";
export async function POST(request: Request) {
    try {
        const user = await currentUser()
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }
        const body = await request.json()
        const { emailAddress, subject, message } = await body
        const validation = emailSchema.safeParse({ emailAddress, subject, message });
        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validation.error.errors },
                { status: 400 }
            );
        }
        const EmailResponse = await sendMail(emailAddress, subject, message);
        if (EmailResponse.status == 250) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Message sent successfully"
                },
                {
                    status: 200
                }
            )
        }
        return NextResponse.json(
            {
                success: false,
                message: "Failed to send message because of routing error",
            },
            {
                status: 260
            }

        )

    } catch (error) {
        console.log("Error Sending message")
        return NextResponse.json(
            {
                success: false,
                message: error,

            },
            {
                status: 500
            }
        )
    }
}