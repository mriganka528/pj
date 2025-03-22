import SettingsComponent from "./components/SettingsComponent"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
const page = async () => {
    const { userId } = await auth()
    if (!userId) {
        redirect('/sign-in')
    }
    const registeredAdmins = await prismadb.admin.findMany({
        include: {
            _count: {
                select: {
                    Notice: true
                }
            }
        }
    })
    return (
        <div>
            <SettingsComponent registeredAdmins={registeredAdmins} userId={userId} />
        </div>
    )
}

export default page
