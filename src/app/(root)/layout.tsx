import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Footer from "../(app)/components/Footer";
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = await auth()
    if (!userId) {
        return <div>{children} <Footer /></div>
    }
    const findAdmin = await prismadb.admin.findUnique({
        where: {
            clerkId: userId
        }
    })
    if (userId && !findAdmin) {
        redirect('/register-admin')
    } else {
        redirect('/admin')
    }

}
