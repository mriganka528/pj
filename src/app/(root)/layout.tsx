import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = await auth()
    if (!userId) {
        return <div className="py-4">{children}</div>
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
