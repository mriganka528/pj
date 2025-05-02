import NoticeTicker from "../components/NoticeTicker";
import NavigationBar from "../components/NavigationBar";
import { startOfWeek, endOfWeek, subWeeks } from 'date-fns';
import prismadb from '@/lib/prismadb';
export default async function NoticeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const now = new Date();
    const weekstart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
    const weekend = endOfWeek(now, { weekStartsOn: 1 });
    const currentWeekHighPriorityNotices = await prismadb.notice.findMany({
        where: {
            status: "ACTIVE",
            priority: "High",
            dateCreated: {
                gte: weekstart,
                lte: weekend,
            },
        }
    })
    return (
        <div >
            <NoticeTicker notices={currentWeekHighPriorityNotices} />
            <NavigationBar />
            <div className=" px-5 sm:px-6 sm:py-16 w-svw">
                {children}
            </div>
        </div>
    );

}
