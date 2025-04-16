import PDFViewer from '@/components/PDFViewer'
import React from 'react'
const PDF_HOST_URL = process.env.NEXT_PUBLIC_PDF_HOST_URL

const page = async ({ params: paramsPromise }: { params: Promise<{ docString: string }> }) => {
    const params = await paramsPromise;


    const pdfUrl = `${PDF_HOST_URL + params.docString}`
    return (
        <div >
            <PDFViewer pdfUrl={pdfUrl} />
        </div>
    )
}

export default page
