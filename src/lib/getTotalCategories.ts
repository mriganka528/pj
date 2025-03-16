import { Category } from '@prisma/client';
const getTotalCategories = async () => {
    const totalCategories = Object.keys(Category).length;
    return totalCategories
}

export default getTotalCategories
