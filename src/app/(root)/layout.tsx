import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId} = await auth()
    if (!userId) {
        redirect('/sign-in')

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
    return (
        <>
            {children}
        </>

    );
}
