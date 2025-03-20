import Navbar from "./components/Navbar";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { Toaster } from 'react-hot-toast';
const prisma = new PrismaClient()
export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = await auth()
    if (!userId) {
        redirect('/sign-in')
    }
    const findAdmin = await prisma.admin.findUnique({
        where: {
            clerkId: userId
        }
    })
    if (!findAdmin) {
        redirect('/register-admin')
    }

    return (
        <>
            <Navbar />
            <div className="p-5 sm:p-10 w-svw">
                {children}
                <Toaster position="top-center"
                    reverseOrder={false} />
            </div>
        </>

    );
}
