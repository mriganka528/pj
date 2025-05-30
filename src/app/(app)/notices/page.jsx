import prismadb from '@/lib/prismadb';
import React from 'react';
import AllNotices from './components/AllNotices';
export function generateMetadata() {
    return {
        title: "Notices",
        description: "View notices and announcements",
    }
}
const Page = async ({ searchParams }) => {
    const category = searchParams?.category;
    const priority = searchParams?.priority;

    const notices = await prismadb.notice.findMany({
        where: {
            status: "ACTIVE",
        },
    });

    const filteredNotices = notices.filter((notice) => {
        if (category && notice.category !== category) return false;
        if (priority && notice.priority !== priority) return false;
        return true;
    });

    const totalnotices = filteredNotices.length;

    return (
        <div className='mt-10 bg-gray-50 px-6 py-8 rounded-lg sm:mt-0'>
            <AllNotices
                notices={filteredNotices}
                totalnotices={totalnotices}
                category={category}
                priority={priority}
            />
        </div>
    );
};

export default Page;
