"use client";
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'
interface Props {
    pdfUrl: string;
}
const DownloadNoticeComponent: React.FC<Props> = ({ pdfUrl }) => {
    const downloadPDF = () => {
        const link = document.createElement("a")
        link.href = pdfUrl
        link.target = "_blank"
        const fileName = pdfUrl.split("/").pop() || "document.pdf"
        link.download = fileName
        // Append to the document, click it, and remove it
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    return (
        <div>
            <Button onClick={downloadPDF} variant="secondary" className="my-1">
                <Download className="h-4 w-4 " />
            </Button>
        </div>
    )
}

export default DownloadNoticeComponent
