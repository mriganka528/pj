"use client"
import React from 'react'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Mail, Calendar, Trash2, Loader } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { SuscribedUser } from '@prisma/client'
import { useMobile } from './UseMobile'
import axios from 'axios'
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import toast from 'react-hot-toast'
const UserManagement = ({ suscribedUser }: { suscribedUser: SuscribedUser[] }) => {
    const [users, setUsers] = useState<SuscribedUser[]>([])
    const [filteredUsers, setFilteredUsers] = useState<SuscribedUser[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [monthFilter, setMonthFilter] = useState<string>("all")
    const [loading, setLoading] = useState(true)
    const [selectedUser, setSelectedUser] = useState<SuscribedUser | null>(null)
    const [emailContent, setEmailContent] = useState<string>("")
    const [emailSubject, setEmailSubject] = useState<string>("")
    const [isDeleting, setIsDeleating] = useState<boolean>(false)
    const [isSending, setIsSending] = useState<boolean>(false)
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const isMobile = useMobile()

    // Generate Gmail URL for sending email
    const getGmailUrl = (email: string) => {
        return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`
    }
    // Simulate loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            setUsers(suscribedUser)
            setFilteredUsers(suscribedUser)
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    // Filter users based on search query and month filter
    useEffect(() => {
        let result = users

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
            )
        }

        // Apply month filter
        if (monthFilter !== "all") {
            result = result.filter((user) => {
                const subscriptionDate = new Date(user.createdAt)
                const month = subscriptionDate.toLocaleString("default", { month: "long" }).toLowerCase()
                return month === monthFilter.toLowerCase()
            })
        }

        setFilteredUsers(result)
    }, [searchQuery, monthFilter, users])

    // Handle sending email
    const handleSendEmail = async () => {
        if (!selectedUser || !emailContent.trim()) return;
        try {
            setIsSending(true);
            const response = await axios.post('/api/send-mail', {
                emailAddress: selectedUser.email,
                subject: emailSubject,
                message: emailContent
            });

            if (response.status === 200) {
                toast.success("Notification is sent successfully");
                setIsDialogOpen(false); // Close the dialog after successful email sending
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message");
        } finally {
            setIsSending(false);
            setEmailSubject("")
            setEmailContent("");
            setSelectedUser(null);
        }
    };
    // Get unique months from user data
    const getUniqueMonths = () => {
        const months = users.map((user) => {
            const date = new Date(user.createdAt)
            return date.toLocaleString("default", { month: "long" })
        })
        return ["All", ...Array.from(new Set(months))]
    }

    const handleDelete = async (user_id: string) => {
        setIsDeleating(true);
        try {
            await axios.delete('/api/remove-user', {
                data: { user_id }
            });

            // Update state to remove the deleted user
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== user_id));
            setFilteredUsers((prevUsers) => prevUsers.filter(user => user.id !== user_id));

            toast("User deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete user");
        } finally {
            setIsDeleating(false);
        }
    };
    return (
        <div className="space-y-6">
            {/* Search and Filter Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
            >
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Select value={monthFilter} onValueChange={setMonthFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by month" />
                        </SelectTrigger>
                        <SelectContent>
                            {getUniqueMonths().map((month) => (
                                <SelectItem key={month} value={month.toLowerCase()}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </motion.div>

            {/* User Count */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <p className="text-sm text-muted-foreground">
                    Showing {filteredUsers.length} of {users.length} subscribers
                </p>
            </motion.div>

            {/* User List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    // Loading skeletons
                    Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                    <Skeleton className="h-20 w-full" />
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : filteredUsers.length > 0 ? (
                    // User cards
                    filteredUsers.map((user, index) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={{ y: -5 }}
                            className="h-full"
                        >
                            <Card className="h-full overflow-hidden">
                                <CardContent className="p-6 space-y-4 h-full flex flex-col">
                                    <div className='flex justify-between'>
                                        <div>
                                            <h3 className="font-semibold text-lg">{user.name}</h3>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                        <div className="self-end sm:self-auto">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="secondary" size="sm" disabled={isDeleting}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90' onClick={() => { handleDelete(user.id) }}>{isDeleting ? "Deleting..." : "Continue"}</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <p className="text-sm font-medium mb-1">Feedback:</p>
                                        <p className="text-sm text-muted-foreground line-clamp-3">{user.feedback}</p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <Badge variant="outline">
                                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </Badge>
                                        <div>
                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsDialogOpen(true); // Open the dialog when clicking the button
                                                        }}
                                                    >
                                                        <Mail className="h-4 w-4" />
                                                        <span className="sr-only">Email {user.name}</span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Send Email to {user.name}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="recipient">Recipient</Label>
                                                            <Input id="recipient" value={user.email} disabled />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="subject">Subject</Label>
                                                            <Input
                                                                id="subject"
                                                                placeholder="Enter subject"
                                                                value={emailSubject}
                                                                onChange={(e) => setEmailSubject(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="message">Message</Label>
                                                            <Textarea
                                                                id="message"
                                                                placeholder="Type your message here..."
                                                                rows={5}
                                                                value={emailContent}
                                                                onChange={(e) => setEmailContent(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        {isSending ? (
                                                            <>
                                                                <Loader className="animate-spin" />
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <Button onClick={handleSendEmail}>Send Email</Button>
                                                        )}
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <a
                                                href={getGmailUrl(user.email)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex"
                                            >
                                                <Button size={isMobile ? "icon" : "sm"} variant="outline" className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                                                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                                                    </svg>
                                                    {!isMobile && <span>Gmail</span>}
                                                    <span className="sr-only">Open Gmail to email {user.name}</span>
                                                </Button>
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                ) : (
                    // No results
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">No subscribers found matching your criteria.</p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default UserManagement
