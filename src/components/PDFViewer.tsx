"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/TextLayer.css"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    Download,
    Maximize,
    Minimize,
    Loader2,
} from "lucide-react"
import GoBackComponent from "@/app/admin/content/components/GoBackComponent"

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface Props {
    pdfUrl: string
    fileName?: string
}

const PDFViewer: React.FC<Props> = ({ pdfUrl, fileName = "Document" }) => {
    const [numPages, setNumPages] = useState<number | null>(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [scale, setScale] = useState(1.0)
    const [isLoading, setIsLoading] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const { theme } = useTheme()
    const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages)
        setIsLoading(false)
    }

    function changePage(offset: number) {
        setPageNumber((prev) => Math.min(Math.max(1, prev + offset), numPages || 1))
    }

    function changeScale(delta: number) {
        setScale((prev) => Math.max(0.5, Math.min(2, prev + delta)))
    }

    const toggleFullscreen = () => {
        if (!containerRef) return

        if (!document.fullscreenElement) {
            containerRef.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`)
            })
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    const downloadPdf = () => {
        const link = document.createElement("a")
        link.href = pdfUrl
        link.download = `${fileName}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div
            ref={setContainerRef}
            className={`flex flex-col items-center transition-all duration-300 ease-in-out
        ${isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : "relative w-full"}
        `}
        >
            {/* Header with file name */}
            <div className="w-full flex items-center justify-between mb-4 px-2">
                <div className="flex items-center">
                    <GoBackComponent />
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={downloadPdf}
                        className="hover:text-primary hover:border-primary transition-colors"
                    >
                        <Download className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleFullscreen}
                        className="hover:text-primary hover:border-primary transition-colors"
                    >
                        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Controls */}
            <div
                className={`mb-4 p-2 rounded-lg flex items-center space-x-2 
        ${theme === "dark" ? "bg-gray-800" : "bg-white"} 
        shadow-md transition-all duration-300`}
            >
                {/* Previous Page */}
                <Button
                    onClick={() => changePage(-1)}
                    disabled={pageNumber <= 1}
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary hover:bg-primary/10 transition-colors"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>

                {/* Page Input */}
                <div className="flex items-center space-x-2">
                    <Input
                        type="number"
                        min={1}
                        max={numPages || 1}
                        value={pageNumber}
                        onChange={(e) => setPageNumber(Number(e.target.value))}
                        className={`w-16 text-center ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white"}`}
                    />
                    <span className="text-sm">of {numPages || "?"}</span>
                </div>

                {/* Next Page */}
                <Button
                    onClick={() => changePage(1)}
                    disabled={numPages === null || pageNumber >= numPages}
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary hover:bg-primary/10 transition-colors"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>

                <div className="h-6 border-l mx-1 border-gray-300 dark:border-gray-600"></div>

                {/* Zoom Out */}
                <Button
                    onClick={() => changeScale(-0.1)}
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary hover:bg-primary/10 transition-colors"
                >
                    <ZoomOut className="h-5 w-5" />
                </Button>

                <span className="text-sm font-medium w-16 text-center">{(scale * 100).toFixed(0)}%</span>

                {/* Zoom In */}
                <Button
                    onClick={() => changeScale(0.1)}
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary hover:bg-primary/10 transition-colors"
                >
                    <ZoomIn className="h-5 w-5" />
                </Button>
            </div>

            {/* PDF Viewer */}
            <div
                className={`relative border rounded-lg p-4 shadow-lg overflow-auto w-full max-w-full flex-1
        ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
        transition-all duration-300 ease-in-out`}
            >
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                        <p className="text-sm text-muted-foreground">Loading document...</p>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={pageNumber}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-center"
                    >
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={
                                <div className="flex flex-col items-center justify-center p-10">
                                    <Skeleton className="h-[600px] w-[450px] rounded-md" />
                                </div>
                            }
                            error={
                                <div className="flex flex-col items-center justify-center p-10 text-red-500">
                                    <p>Failed to load PDF. Please check the URL and try again.</p>
                                </div>
                            }
                            className="mx-auto"
                        >
                            <Page
                                pageNumber={pageNumber}
                                scale={scale}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                className={`mx-auto shadow-xl rounded-md overflow-hidden
                  ${theme === "dark" ? "bg-gray-700" : "bg-white"}`}
                                loading={<Skeleton className="h-[600px] w-[450px] rounded-md" />}
                            />
                        </Document>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Page thumbnails (optional) */}
            {numPages && numPages > 1 && (
                <div
                    className={`mt-4 p-2 rounded-lg flex items-center space-x-2 overflow-x-auto w-full
          ${theme === "dark" ? "bg-gray-800" : "bg-white"} 
          shadow-md transition-all duration-300`}
                >
                    {Array.from(new Array(Math.min(numPages, 5)), (_, index) => (
                        <button
                            key={index}
                            onClick={() => setPageNumber(index + 1)}
                            className={`relative p-1 rounded-md transition-all duration-200 
                ${pageNumber === index + 1 ? "ring-2 ring-primary" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                        >
                            <Document file={pdfUrl}>
                                <Page
                                    pageNumber={index + 1}
                                    scale={0.15}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="rounded border border-gray-200 dark:border-gray-700"
                                />
                            </Document>
                            <span className="absolute bottom-1 right-1 text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                                {index + 1}
                            </span>
                        </button>
                    ))}
                    {numPages > 5 && (
                        <div className="flex items-center justify-center px-2">
                            <span className="text-sm text-muted-foreground">+{numPages - 5} more</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PDFViewer
