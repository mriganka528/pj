
import prismadb from '@/lib/prismadb';
import React from 'react';
import AllNotices from './components/AllNotices';

interface PageProps {
    searchParams: {
        category?: string;
        priority?: string;
    };
}

const Page = async ({ searchParams }: PageProps) => {
    const { category, priority } = await searchParams

    const notices = await prismadb.notice.findMany(
        {
            where: {
                status: "ACTIVE",
            }
        }
    )
    const filteredNotices = notices.filter((notice) => {
        if (category && notice.category !== category) return false;
        if (priority && notice.priority !== priority) return false;
        return true;
    });
    const totalnotices = filteredNotices.length;
    return (
        <div className='mt-10 bg-gray-50 px-6 py-8 rounded-lg sm:mt-0'>
            <AllNotices notices={filteredNotices} totalnotices={totalnotices} category={category} priority={priority}/>
        </div>
    );
};

export default Page;
