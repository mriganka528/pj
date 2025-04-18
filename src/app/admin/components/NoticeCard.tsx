"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { AlertCircle, Eye, FileText, FolderOpen, MoreHorizontal, PencilLine, ShieldQuestion, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
type NoticeWithAdmin = Prisma.NoticeGetPayload<{
    include: { admin: true };
}>;
const NoticeCard = ({ notice, onDelete }: { notice: NoticeWithAdmin; onDelete: (id: string) => void }) => {
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
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            onDelete(notice.id);
        } catch (error) {
            console.error("Error deleting notice:", error);
            toast.error("Failed to delete notice");
        } finally {
            setIsDeleting(false);
        }
    };
    return (
        <Card className={cn("transition-all hover:shadow-md", "border-l-4 border-l-primary")}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <CardTitle className="line-clamp-1">{notice.title}</CardTitle>
                        <CardDescription>
                            {new Date(notice.dateCreated).toDateString() + ", " + new Date(notice.dateCreated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {notice.status}
                        </CardDescription>
                    </div>
                    <div className=' flex justify-center items-center '>
                        <div className="self-end sm:self-auto">
                            <AlertDialog >
                                <AlertDialogTrigger asChild>
                                    <Button variant="secondary" size="sm" disabled={isDeleting}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent >
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90' onClick={handleDelete}>{isDeleting ? "Deleting..." : "Continue"}</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
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
                                        <Link className='flex justify-center items-center ' href={`/admin/notices/${notice.id}`}    >
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Details
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className='flex justify-center items-center ' href={`/admin/content/${notice.noticeURL.substring(notice.noticeURL.lastIndexOf("/") + 1)}`}    >
                                            <FileText className="mr-2 h-4 w-4" />
                                            View PDF
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link className='flex justify-center items-center ' href={`/admin/content/update/${notice.id}`}    >
                                            <PencilLine className="mr-2 h-4 w-4" />
                                            Update Notice
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <span className="text-sm text-muted-foreground  mb-3 line-clamp-3 whitespace-pre-line"> <pre className="whitespace-pre-wrap  dark:text-gray-200">
                    {notice.content}
                </pre></span>
                <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                        <FolderOpen className="h-3 w-3 mr-1" />
                        {notice.category}
                    </Badge>
                    <Dialog>
                        <DialogTrigger><Badge variant="outline" className="flex items-center gap-1">
                            <ShieldQuestion className="h-3 w-3 mr-1" />
                            Uploader Details
                        </Badge></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='pb-4 text-center text-gray-600'>Uploader Details</DialogTitle>
                                <DialogDescription asChild>
                                    <div className=' flex flex-col space-y-7 mt-6'>
                                        <div className='flex flex-col space-y-1 justify-start items-start'>
                                            <Label>Admin Name</Label>  < Input id='name' defaultValue={`${notice.admin.firstName}${(notice.admin.middleName)?.length !== 0 ? `${notice.admin.middleName}` : ""}${notice.admin.lastName}`} readOnly />
                                        </div>
                                        <div className='flex flex-col space-y-1 justify-start items-start'>
                                            <Label>Email Address</Label>  < Input id='email' defaultValue={notice.admin.email} readOnly />
                                        </div>
                                        <div className='flex flex-col space-y-1 justify-start items-start'>
                                            <Label>Admin Id</Label>  < Input id='id' defaultValue={notice.adminId} readOnly />
                                        </div>

                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 space-x-1">
                <div className="text-xs text-muted-foreground ">Notice Id: {notice.id}</div>
                <Badge className={getPriorityColor(notice.priority)}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {notice.priority}
                </Badge>
            </CardFooter>
        </Card>
    )
}

export default NoticeCard
