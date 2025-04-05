import prismadb from "@/lib/prismadb";
import Navbar from "./components/Navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Toaster } from 'react-hot-toast';
export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = await auth()
    if (!userId) {
        redirect('/sign-in')
    }
    const findAdmin = await prismadb.admin.findUnique({
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
            <div className="px-5 py-24 sm:px-10 sm:py-32 w-svw">
                {children}
                <Toaster position="top-center"
                    reverseOrder={false} />
            </div>
        </>

    );
}
