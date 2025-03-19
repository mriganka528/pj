"use client";

import type React from "react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
    pdfUrl: string;
}

const PDFViewer: React.FC<Props> = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    function changePage(offset: number) {
        setPageNumber((prev) => Math.min(Math.max(1, prev + offset), numPages || 1));
    }

    function changeScale(delta: number) {
        setScale((prev) => Math.max(0.5, Math.min(2, prev + delta)));
    }

    return (
        <div className="flex flex-col items-center">
            {/* Controls */}
            <div className="mb-4 flex items-center space-x-1">
                {/* Previous Page */}
                <Button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Input */}
                <Input
                    type="number"
                    min={1}
                    max={numPages || 1}
                    value={pageNumber}
                    onChange={(e) => setPageNumber(Number(e.target.value))}
                    className="w-16 text-center"
                />
                <span>of {numPages || "?"}</span>

                {/* Next Page */}
                <Button onClick={() => changePage(1)} disabled={numPages === null || pageNumber >= numPages}>
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Zoom Out */}
                <Button onClick={() => changeScale(-0.1)}>
                    <ZoomOut className="h-4 w-4" />
                </Button>
                <span>{(scale * 100).toFixed(0)}%</span>

                {/* Zoom In */}
                <Button onClick={() => changeScale(0.1)}>
                    <ZoomIn className="h-4 w-4" />
                </Button>
            </div>

            {/* PDF Viewer */}
            <div className="border rounded-lg p-4 bg-white shadow-inner">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="p-10 border"
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale} 
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="mx-auto"
                    />
                </Document>
            </div>
        </div>
    );
};

export default PDFViewer;
