import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { startOfWeek, endOfWeek, subWeeks } from "date-fns"
const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    //  Authenticate the user
    const user = await currentUser()
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Authentication error" },
        { status: 401 }
      );
    }

    const url = new URL(req.url)
    const weekParam = url.searchParams.get("week") || "current"

    let startDate, endDate
    const today = new Date()
    if (weekParam == "current") {
      startDate = startOfWeek(today)
      endDate = endOfWeek(today)
    } else if (weekParam === "last") {
      startDate = startOfWeek(subWeeks(today, 1))
      endDate = endOfWeek(subWeeks(today, 1))
    } else if (weekParam === "last-last") {
      startDate = startOfWeek(subWeeks(today, 2))
      endDate = endOfWeek(subWeeks(today, 2))
    }

    const notices = await prisma.notice.findMany({
      where: {
        dateCreated: {
          gte: startDate,
          lte: endDate
        }
      }
    })

    //Process the data into daily format
    const dayData = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ].map((day, index) => ({
      name: day,
      notices: notices.filter((n) => new Date(n.dateCreated).getDay() === index).length
    }))

    return NextResponse.json(dayData);
  } catch (error) {
    
    console.error(error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
