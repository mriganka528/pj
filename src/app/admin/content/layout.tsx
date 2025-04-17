import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Content Management",
    description: "Upload and manage recent notices and announcements",
};

export default function ContentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
