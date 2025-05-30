import dayjs from "dayjs";

import prismadb from "./prismadb";

async function getNoticeUploadGrowth(): Promise<number> {
    const startOfCurrentMonth = dayjs().startOf("month").toDate();
    const endOfCurrentMonth = dayjs().endOf("month").toDate();
    const startOfLastMonth = dayjs().subtract(1, "month").startOf("month").toDate();
    const endOfLastMonth = dayjs().subtract(1, "month").endOf("month").toDate();

    const currentMonthCount = await prismadb.notice.count({
        where: {
            dateCreated: {
                gte: startOfCurrentMonth,
                lte: endOfCurrentMonth,
            },
        },
    });

    const lastMonthCount = await prismadb.notice.count({
        where: {
            dateCreated: {
                gte: startOfLastMonth,
                lte: endOfLastMonth,
            },
        },
    });

    let percentageIncrease = 0;
    if (lastMonthCount > 0) {
        percentageIncrease = ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100;
    } else if (currentMonthCount > 0) {
        percentageIncrease = 100;
    }

    return Math.round(percentageIncrease); // Returns only the number
}

export default getNoticeUploadGrowth;
