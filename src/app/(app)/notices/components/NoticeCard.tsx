"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Notice } from '@prisma/client'
import { AlertCircle, Eye, FileText, FolderOpen, MoreHorizontal} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NoticeCard = ({ notice }: { notice: Notice }) => {
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

    return (
        <Card className={cn("transition-all hover:shadow-md", "border-l-4 border-l-[#9e9a9a]")}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <CardTitle className="line-clamp-1 mb-2">{notice.title}</CardTitle>
                        <CardDescription>
                            {new Date(notice.dateCreated).toDateString() + ", " + new Date(notice.dateCreated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </CardDescription>
                    </div>
                    <div className=' flex justify-center items-center '>
                        <div className='ml-1'>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link className='text-sm flex justify-center items-center ' href={`/notices/${notice.id}`}    >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className='flex justify-center items-center text-sm ' href={`/notices/${notice.id}/${notice.noticeURL.substring(notice.noticeURL.lastIndexOf("/") + 1)}`}    >
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Document
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <span className=" mt-5 rounded-md text-sm text-muted-foreground  line-clamp-3 whitespace-pre-line"> <pre className="whitespace-pre-wrap  dark:text-gray-200  ">
                    {notice.content}
                </pre></span>
            </CardContent>
            <CardFooter className="flex justify-between pt-1 space-x-1">

                <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                        <FolderOpen className="h-3 w-3 mr-1" />
                        {notice.category}
                    </Badge>
                </div>
                <Badge className={getPriorityColor(notice.priority)}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {notice.priority}
                </Badge>

            </CardFooter>
        </Card>
    )
}

export default NoticeCard
