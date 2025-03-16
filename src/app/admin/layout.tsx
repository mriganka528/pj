import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


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
