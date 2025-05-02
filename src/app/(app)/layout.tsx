import { Toaster } from "react-hot-toast";

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div >
            <div className="w-svw">
                {children}
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );

}
