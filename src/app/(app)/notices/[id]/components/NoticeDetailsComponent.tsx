"use client"
import { Notice } from '@prisma/client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft, Calendar, Check, Clock, Copy, FileText, FolderOpen, Share2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    ThreadsIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from "react-share";
import { usePathname, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
const NEXT_PUBLIC_APP_HOST_URL = process.env.NEXT_PUBLIC_APP_HOST_URL
const NoticeDetailsComponent = ({ noticeDetails }: { noticeDetails: Notice }) => {
    const [copied, setCopied] = useState<boolean>(false)
    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }
    const currentUrl = usePathname()
    const pathName = `${NEXT_PUBLIC_APP_HOST_URL}${currentUrl}`
    // Status badge colors
    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            case "ARCHIVED":
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
            case "SCHEDULED":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            case "DRAFT":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }

    // Priority badge colors
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            case "Medium":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
            case "Low":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
        }
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText(pathName);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        toast.success('Link copied to clipboard');
    }
    const sharePlateform = [
        {
            name: "Whatsapp",
            component: <WhatsappShareButton url={pathName}>
                <WhatsappIcon size={40} round={true} /></WhatsappShareButton>,
        },
        {
            name: "Email",
            component: <EmailShareButton url={pathName}>
                <EmailIcon size={40} round={true} /></EmailShareButton>,
        },
        {
            name: "Telegram",
            component: <TelegramShareButton url={pathName}>
                <TelegramIcon size={40} round={true} /></TelegramShareButton>,
        },
        {
            name: "Facebook",
            component: <FacebookShareButton url={pathName}>
                <FacebookIcon size={40} round={true} /></FacebookShareButton>,
        },
        {
            name: "X",
            component: <TwitterShareButton url={pathName}>
                <XIcon size={40} round={true} /></TwitterShareButton>,
        },
        {
            name: "Reddit",
            component: <RedditShareButton url={pathName}>
                <RedditIcon size={40} round={true} /></RedditShareButton>,
        },
        {
            name: "Thread",
            component: <TwitterShareButton url={pathName}>
                <ThreadsIcon size={40} round={true} /></TwitterShareButton>,
        },
        {
            name: "Messanger",
            component: <FacebookMessengerShareButton url={pathName} appId=''>
                <FacebookMessengerIcon size={40} round={true} /></FacebookMessengerShareButton>,
        }
    ]
    return (
        <div className='container mx-auto py-6 max-w-4xl'>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Button
                    variant='ghost'
                    className='mb-4 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-100'
                    onClick={handleGoBack}
                >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to Notices
                </Button>

                <Card className='border border-gray-300 dark:border-gray-700 shadow-lg overflow-hidden'>
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 px-6 py-4 border-b border-gray-300 dark:border-gray-600">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{noticeDetails.title}</h1>
                                <p className="text-sm text-muted-foreground text-gray-700 dark:text-gray-300 flex items-center">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    {new Date(noticeDetails.dateCreated).toDateString()}
                                    <span className="mx-2">•</span>
                                    <FolderOpen className="mr-1 h-4 w-4" />
                                    {noticeDetails.category}
                                </p>
                            </div>
                            <Badge className={getStatusColor(noticeDetails.status)}>{noticeDetails.status}</Badge>
                        </div>
                    </div>

                    <CardContent className="p-6 dark:text-gray-200">

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="prose prose-yellow max-w-none dark:prose-invert"
                        >
                            <pre className="whitespace-pre-wrap  dark:text-gray-200">
                                {noticeDetails.content}
                            </pre>
                        </motion.div>
                    </CardContent>

                    <div className="bg-slate-50 dark:bg-slate-800 px-6 py-4 border-t border-gray-300 dark:border-gray-600">
                        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between">
                            <div className='flex flex-col space-y-2'>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    Priority:
                                    <Badge className={cn("ml-2", getPriorityColor(noticeDetails.priority))}>
                                        {noticeDetails.priority}
                                    </Badge>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Last updated: {new Date(noticeDetails.dateUpdated).toDateString() + ", " + new Date(noticeDetails.dateUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Link
                                    className="border border-input bg-background dark:border-gray-600 dark:bg-slate-700 shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex justify-center items-center bg-white dark:text-white dark:hover:bg-slate-600"
                                    href={`/notices/${noticeDetails.id}/${noticeDetails.noticeURL.substring(noticeDetails.noticeURL.lastIndexOf("/") + 1)}`}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    View Document
                                </Link>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className=" bg-white dark:bg-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600">
                                            <Share2 className="mr-1 h-4 w-4" />
                                            Share
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-80 p-0 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600" align="end">
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                                            <h4 className="font-medium">Share Notice</h4>
                                            <p className="text-sm text-muted-foreground mt-1">Share this notice with others via:</p>
                                        </div>

                                        <div className='p-4 space-y-4'>
                                            <div className="grid grid-cols-4 gap-1">
                                                {sharePlateform.map((media, index) => (
                                                    <div key={index}>
                                                        {media.component}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="relative mx-2 mb-4">
                                            <Input
                                                value={pathName}
                                                readOnly
                                                className="pr-16 text-sm text-gray-600 dark:text-gray-200 dark:bg-slate-700"
                                            />
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="absolute right-1 top-1 h-7 dark:text-gray-300"
                                                onClick={copyToClipboard}
                                            >
                                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

export default NoticeDetailsComponent
