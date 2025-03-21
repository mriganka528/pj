import prismadb from "./prismadb";

const getTotalNotice = async () => {
    const total_notice = await prismadb.notice.count()
    return total_notice;
}
export default getTotalNotice