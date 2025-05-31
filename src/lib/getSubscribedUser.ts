// Code to get the total number of subscribed users from the database
import prismadb from "./prismadb"

const getSubscribedUser = async () => {
    const totalSubscribedUser = await prismadb.subscriber.count()
    return totalSubscribedUser
}
export default getSubscribedUser