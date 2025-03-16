import { PrismaClient } from "@prisma/client"
import { Category } from '@prisma/client';
const prisma = new PrismaClient()
const getTotalCategories = async () => {
    const totalCategories = Object.keys(Category).length;
    return totalCategories
}

export default getTotalCategories
