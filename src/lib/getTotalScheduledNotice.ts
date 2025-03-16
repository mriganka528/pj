import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const getTotalScheduledNotice = async () => {
    const scheduledNotice = await prisma.notice.count({
        where: {
            status: "SCHEDULED"
        }
    })
    return scheduledNotice
}

export default getTotalScheduledNotice
