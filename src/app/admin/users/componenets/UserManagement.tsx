"use client"
import React from 'react'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Mail, Calendar } from "lucide-react"
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
const UserManagement = ({ suscribedUser }: { suscribedUser: SuscribedUser[] }) => {
    const [users, setUsers] = useState<SuscribedUser[]>([])
    const [filteredUsers, setFilteredUsers] = useState<SuscribedUser[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [monthFilter, setMonthFilter] = useState<string>("all")
    const [loading, setLoading] = useState(true)
    const [selectedUser, setSelectedUser] = useState<SuscribedUser | null>(null)
    const [emailContent, setEmailContent] = useState("")

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
    const handleSendEmail = () => {
        if (!selectedUser || !emailContent.trim()) return

        // In a real application, this would send the email via an API
        console.log(`Sending email to ${selectedUser.email}:`, emailContent)

        // Reset the form
        setEmailContent("")
        setSelectedUser(null)

        // Show success message (in a real app, you'd use a toast notification)
        alert(`Email sent to ${selectedUser.name}!`)
    }

    // Get unique months from user data
    const getUniqueMonths = () => {
        const months = users.map((user) => {
            const date = new Date(user.createdAt)
            return date.toLocaleString("default", { month: "long" })
        })
        return ["All", ...Array.from(new Set(months))]
    }
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
                                    <div>
                                        <h3 className="font-semibold text-lg">{user.name}</h3>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
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

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="icon" variant="ghost" onClick={() => setSelectedUser(user)}>
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
                                                    <Button onClick={handleSendEmail}>Send Email</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
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
