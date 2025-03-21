import prismadb from "./prismadb";

const getTotalActiveNotice = async () => {
    const activeNotices = await prismadb.notice.count({
        where: {
            status: "ACTIVE"
        }
    })
    return activeNotices;
}

export default getTotalActiveNotice