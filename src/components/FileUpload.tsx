"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type React from "react" 

interface FileUploadProps {
    onFileSelect: (files: File[]) => void
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
    const [dragActive, setDragActive] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files)
        }
    }

    const handleFiles = (files: FileList) => {
        onFileSelect(Array.from(files))
    }

    const onButtonClick = () => {
        inputRef.current?.click()
    }

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-4 text-center ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                ref={inputRef}
                type="file"
                multiple
                onChange={handleChange}
                className="hidden"
                accept="application/pdf"
            />
            <p className="mb-2 text-sm text-gray-500">Drag and drop your files here, or click to select files</p>
            <p className="text-xs text-gray-500 mb-4">Supported formats: PDF, JPG, PNG</p>
            <Button type="button" onClick={onButtonClick}>
                <Upload className="mr-2 h-4 w-4" /> Select Files
            </Button>
        </div>
    )
}

export default FileUpload