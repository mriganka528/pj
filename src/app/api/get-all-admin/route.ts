import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";


export async function GET() {
    try {
        //  Authenticate the user
        const user = await currentUser()
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }
        // get all admin from the database
        const admin = await prismadb.admin.findMany()
        return NextResponse.json({ success: true, admin }, { status: 200 });


    } catch (error) {

        console.error(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });

    }
}