import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notices",
  description: "Manage notices and announcements",
};

export default function NoticesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
