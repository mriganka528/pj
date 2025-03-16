import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const getTotalNotice = async () => {
    const total_notice = await prisma.notice.count()
    return total_notice;
}
export default getTotalNotice