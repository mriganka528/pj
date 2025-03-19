import PDFViewer from '@/components/PDFViewer'
import React from 'react'
import GoBackComponent from '../components/GoBackComponent';

const PDF_HOST_URL = process.env.NEXT_PUBLIC_PDF_HOST_URL

const page = async ({ params: paramsPromise }: { params: Promise<{ docString: string }> }) => {
    const params = await paramsPromise;


    const pdfUrl = `${PDF_HOST_URL + params.docString}`
    return (
        <div className='flex flex-col space-y-5' >
            <GoBackComponent />
            <PDFViewer pdfUrl={pdfUrl} />
        </div>
    )
}

export default page
