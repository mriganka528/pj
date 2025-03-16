"use client"
import PDFViewer from '@/components/PDFViewer'
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

const PDF_HOST_URL = process.env.NEXT_PUBLIC_PDF_HOST_URL

const page = () => {
    const router = useRouter()
    const handleClick = () => {
        router.back()
    }
    const params = useParams<{ docString: string }>()
    const pdfUrl = `${PDF_HOST_URL + params.docString}`
    return (
        <div >
            <Button variant={'secondary'} className='flex items-center justify-center -space-x-1' onClick={handleClick}>
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
