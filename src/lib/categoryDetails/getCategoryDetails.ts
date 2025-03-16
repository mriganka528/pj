import { Category, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const getCategoryDetails = async (category: Category) => {
    const count = await prisma.notice.count({
        where: {
            category: category,
            status: "ACTIVE"
        }
    })
    return count
}

export default getCategoryDetails
