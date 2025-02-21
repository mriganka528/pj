import Sidebar from "./components/Sidebar";


export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <Sidebar />
            <div className="p-10 w-svw">
                {children}
            </div>
        </>

    );
}
