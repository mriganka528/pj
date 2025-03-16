import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const getSubscribedUser = async () => {
    const totalSubscribedUser = await prisma.suscribedUser.count()
    return totalSubscribedUser
}
export default getSubscribedUser