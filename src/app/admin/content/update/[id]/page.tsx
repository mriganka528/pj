import React from 'react'
import UpdateNoticeComponent from '../components/UpdateComponent';
import prismadb from '@/lib/prismadb';
const page = async ({ params: paramsPromise }: { params: Promise<{ noticeId: string }> }) => {
    const params = await paramsPromise;
    const noticeId = params.noticeId
    const fetchedNotice = await prismadb.notice.findFirst({
        where: {
            id: noticeId
        }
    });
    if (!fetchedNotice) {
        return <div>Notice not found</div>
    }
    return (
        <div  className='px-6 sm:px-10 md:px-16'>
         <UpdateNoticeComponent notice={fetchedNotice} />
        </div>

    )
}

export default page