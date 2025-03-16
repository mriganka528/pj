import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

async function getWeeklyNoticeGrowth(): Promise<number> {
    const startOfCurrentWeek = dayjs().startOf("week").toDate();
    const endOfCurrentWeek = dayjs().endOf("week").toDate();
    const startOfLastWeek = dayjs().subtract(1, "week").startOf("week").toDate();
    const endOfLastWeek = dayjs().subtract(1, "week").endOf("week").toDate();

    const currentWeekCount = await prisma.notice.count({
        where: {
            dateCreated: {
                gte: startOfCurrentWeek,
                lte: endOfCurrentWeek,
            },
        },
    });

    const lastWeekCount = await prisma.notice.count({
        where: {
            dateCreated: {
                gte: startOfLastWeek,
                lte: endOfLastWeek,
            },
        },
    });

    let percentageIncrease = 0;

    if (lastWeekCount > 0) {
        percentageIncrease = ((currentWeekCount - lastWeekCount) / lastWeekCount) * 100;
    }

    if (currentWeekCount === 0 && lastWeekCount > 0) {
        percentageIncrease = -100; // Full decrease
    } else if (lastWeekCount === 0 && currentWeekCount > 0) {
        percentageIncrease = 100; // Full increase
    }

    return Math.abs(Math.round(percentageIncrease)); // Remove negative sign
}
export default getWeeklyNoticeGrowth