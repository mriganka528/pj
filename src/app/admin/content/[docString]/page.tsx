import PDFViewer from '@/components/PDFViewer'
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import React from 'react'

const PDF_HOST_URL = process.env.NEXT_PUBLIC_PDF_HOST_URL

const page = async ({ params: paramsPromise }: { params: Promise<{ docString: string }> }) => {
    const params = await paramsPromise;

    // const router = useRouter()

    const pdfUrl = `${PDF_HOST_URL + params.docString}`
    return (
        <div >
            <Button variant={'secondary'} className='flex items-center justify-center -space-x-1' >
                <ChevronLeft className='h-7 w-7' />
                <span>
                    Go Back
                </span>
            </Button>
            <PDFViewer pdfUrl={pdfUrl} />
        </div>
    )
}

export default page
