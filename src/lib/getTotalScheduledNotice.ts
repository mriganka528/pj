import prismadb from "./prismadb"
const getTotalScheduledNotice = async () => {
    const scheduledNotice = await prismadb.notice.count({
        where: {
            status: "SCHEDULED"
        }
    })
    return scheduledNotice
}

export default getTotalScheduledNotice
