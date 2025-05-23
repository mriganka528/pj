"use client"
import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, LoaderCircle, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import { noticeSchema } from '@/schemas/notice/noticeSchema'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'react-hot-toast'
import { Notice } from '@prisma/client'
import { useRouter } from 'next/navigation'
import FileUpload from '@/app/admin/components/FileUpload'

const categories = [
    "Academic",
    "FinalExam",
    "ExamResults",
    "Revaluation",
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
const UpdateNoticeComponent = ({ notice }: { notice: Notice }) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof noticeSchema>>({
        resolver: zodResolver(noticeSchema),
        defaultValues: {
            title: notice.title,
            content: notice.content,
            status: notice.status,
            category: notice.category,
            fileUrl: notice.noticeURL,
            priority: notice.priority
        },
    })
    const [selectedFiles, setSelectedFiles] = useState<string>("")

    const [submitting, setSubmitting] = useState<boolean>(false)

    const onSubmit = async (values: z.infer<typeof noticeSchema>) => {
        const { title, content, status, category, fileUrl, priority } = values
        setSubmitting(true)
        const data = new FormData();
        data.append("title", title);
        data.append("content", content);
        data.append("status", status);
        data.append("category", category);
        data.append("fileUrl", fileUrl);
        data.append("priority", priority);

        try {
            const response = await axios.patch(`/api/update-notice?id=${notice.id}`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 200) {
                toast.success("Notice updated successfully");
                router.back();

            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("You are not authorized to perform this action");
                } else {
                    toast.error("Failed to update the notice");
                }
            } else {
                toast.error("An unexpected error occurred");
            }
            router.back()
        }
        setSubmitting(false)
    }
    const handleCancel = () => {
        setSelectedFiles("");
        form.setValue("fileUrl", "");
    }
    return (
        <div className="space-y-6 ">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold">Update notice</h1>
            </div>
            <div className="space-y-4">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6 pb-8 ">
                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notice Title</FormLabel>
                                        <FormControl>
                                            <Input id="title" placeholder="Enter notice title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>{field.value || "Select status"}</SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="DRAFT">Draft</SelectItem>
                                                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>{field.value || "Set Priority"}</SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="High">High</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="Low">Low</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea id="content" placeholder="Enter notice content" rows={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fileUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Attachment</FormLabel>
                                    <FormControl>
                                        <div>
                                            <FileUpload
                                                onChange={(url) => {
                                                    field.onChange(url);
                                                    setSelectedFiles(url);
                                                }
                                                }
                                            />
                                            {selectedFiles && (
                                                <div className="flex items-center justify-between mt-3 p-3 bg-muted rounded-md">
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        <FileText className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                                                        <span className="text-sm font-medium truncate">{selectedFiles}</span>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleCancel()
                                                        }}
                                                    >
                                                        <X className="h-4 w-4" />
                                                        <span className="sr-only">Remove file</span>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            submitting ? <LoaderCircle className='h-5 w-5 animate-spin' /> : (

                                <Button type='submit'>Update Changes</Button>
                            )
                        }
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default UpdateNoticeComponent
