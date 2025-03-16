import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";


export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <Navbar />
            <div className="p-10 w-svw">
                {children}
                <Toaster />
            </div>
        </>

    );
}
