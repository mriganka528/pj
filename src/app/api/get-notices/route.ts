import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

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

    const notices = await prisma.notice.findMany({
      orderBy: { dateCreated: "desc" }
    });

    return NextResponse.json({ success: true, notices });
  } catch (error) {

    console.error(error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
