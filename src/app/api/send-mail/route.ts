import { NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMail";
import { auth, currentUser } from "@clerk/nextjs/server";
import { emailSchema } from "@/schemas/emailSection/emailSchema";
import prismadb from "@/lib/prismadb";

export async function POST(request: Request) {
    try {
        // Authenticate the user
        const user = await currentUser();
        const { userId } = await auth();

        if (!user || !userId) {
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { emailAddress, subject, message } = body;

        // Validate input
        const validation = emailSchema.safeParse({ emailAddress, subject, message });
        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: "Validation failed", errors: validation.error.errors },
                { status: 400 }
            );
        }

        // Get admin
        const getAdmin = await prismadb.admin.findUnique({
            where: {
                clerkId: userId,
            },
        });

        if (!getAdmin) {
            return NextResponse.json(
                { success: false, message: "Admin not found" },
                { status: 404 }
            );
        }

        // Get subscribed user by email
        const suscribedUser = await prismadb.subscriber.findUnique({
            where: { email: emailAddress },
        });

        if (!suscribedUser) {
            return NextResponse.json(
                { success: false, message: "Subscribed user not found" },
                { status: 404 }
            );
        }

        // Send email
        const EmailResponse = await sendMail(emailAddress, subject, message);

        if (EmailResponse.status === 250) {
            // Check if the relationship already exists
            const existingRelation = await prismadb.adminSubscribedUser.findFirst({
                where: {
                    adminId: getAdmin.id,
                    subscribedUserId: suscribedUser.id,
                },
            });
            // Create admin-suscribedUser link entry

            if (!existingRelation) {
                await prismadb.adminSubscribedUser.create({
                    data: {
                        adminId: getAdmin.id,
                        subscribedUserId: suscribedUser.id,
                    },
                });
            }

            return NextResponse.json(
                { success: true, message: "Message sent successfully" },
                { status: 200 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Failed to send message due to routing error",
            },
            { status: 260 }
        );
    } catch (error) {
        console.error("Error Sending message", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
                error: String(error),
            },
            { status: 500 }
        );
    }
}
