import prismadb from '@/lib/prismadb'
import React from 'react'
import NoticeDetailsComponent from '../components/NoticeDetailsComponent'

const page = async ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
  const params = await paramsPromise
  const noticeDetails = await prismadb.notice.findUnique({
    where: {
      id: params.id
    }
  })
  if (!noticeDetails) {
    return <div>Notice not found</div>
  }
  return (
    <div>
      <NoticeDetailsComponent noticeDetails={noticeDetails} />
    </div>
  )
}

export default page
