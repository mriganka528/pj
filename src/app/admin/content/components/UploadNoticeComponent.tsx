"use client"
import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Loader2} from "lucide-react"
import FileUpload from "@/components/FileUpload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'

const categories = [
    "Academic",
    "Events",
    "StudentServices",
    "CampusLife",
    "Sports",
    "Career",
    "HealthAndWellness",
    "Technology",
    "Library",
    "Administrative"
]

const UploadNoticeComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [title, setTitle] = useState<string>("")
    const [selectedStatus, setSelectedStatus] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [submitting, setSubmitting] = useState<boolean>(false)
    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }
    const handleFileSelect = async (files: File[]) => {
        setSelectedFiles(files);
    };

    const handleSubmit = async (e: any) => {
        setSubmitting(true)
        e.preventDefault();
        const data = new FormData();
        data.append("title", title);
        data.append("content", content);
        data.append("status", selectedStatus);
        data.append("category", selectedCategory);
        data.append("file", selectedFiles[0]);

        try {
            const result = await axios.post('/api/upload-notice', data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Upload Success:", result.data);
        } catch (error) {
            console.error("Upload Error:", error);
        }
        setSubmitting(false)
    }
    return (
        <div className="space-y-6 px-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold">Content Management</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Notice
                </Button>
            </div>
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="title">Notice Title</Label>
                        <Input id="title" onChange={(e: any) => { setTitle(e.target.value) }} placeholder="Enter notice title" />
                    </div>
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={(value) => { setSelectedStatus(value) }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="DRAFT">Draft</SelectItem>
                                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="ARCHIVED">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value: string) => {
                        setSelectedCategory(value)
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" onChange={(e) => { setContent(e.target.value) }} placeholder="Enter notice content" rows={4} />
                </div>
                <div>
                    <Label>Attachments</Label>

                    <FileUpload onFileSelect={handleFileSelect} />
                    {selectedFiles.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm font-medium">Selected files:</p>
                            <ul className="list-disc list-inside">
                                {selectedFiles.map((file, index) => (
                                    <li key={index} className="text-sm">
                                        {file.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {
                    submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                        <Button type="submit" onClick={handleSubmit}>Save Notice</Button>
                    )
                }
            </div>
           
        </div>
    )
}

export default UploadNoticeComponent
