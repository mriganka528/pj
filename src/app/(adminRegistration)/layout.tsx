import { auth,  } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
const prisma = new PrismaClient()
export default async function RegistratinLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = await auth()
    console.log("UserId :", userId);
    if (!userId) {
        redirect('/sign-in')

    }
    const findAdmin = await prisma.admin.findUnique({
        where: {
            clerkId: userId
        }
    })
    if (userId && findAdmin) {
        redirect("/admin")
    }
    return (
        <>
            {children}
        </>

    );
}
