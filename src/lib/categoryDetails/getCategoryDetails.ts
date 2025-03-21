import { Category} from "@prisma/client"
import prismadb from "../prismadb";

const getCategoryDetails = async (category: Category) => {
    const count = await prismadb.notice.count({
        where: {
            category: category,
            status: "ACTIVE"
        }
    })
    return count
}

export default getCategoryDetails
