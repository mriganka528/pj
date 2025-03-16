import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const getTotalActiveNotice = async () => {
    const activeNotices = await prisma.notice.count({
        where: {
            status: "ACTIVE"
        }
    })
    return activeNotices;
}

export default getTotalActiveNotice