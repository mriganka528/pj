import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const current_user = await currentUser();
    if (current_user) {
        redirect('/admin')

    }
    return (
        <>
            {children}
        </>

    );
}
