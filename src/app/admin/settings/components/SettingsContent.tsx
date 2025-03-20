"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserProfile } from "@clerk/clerk-react"
import { Admin } from "@prisma/client"
import { Separator } from "@radix-ui/react-select"
import axios from "axios"
import { motion } from "framer-motion"
import { Loader2, Moon, Settings, Sun } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface SettingsContentProps {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    tabId: string;
    registeredAdmins: Admin[]
    userId: string
}

const themeItems = [
    {
        id: 1,
        label: "light",
        Name: "Light",
        icon: Sun
    },
    {
        id: 2,
        label: "dark",
        Name: "Dark",
        icon: Moon
    },
    {
        id: 3,
        label: "system",
        Name: "System",
        icon: Settings
    }
]
const SettingsContent = ({ tabId, theme, setTheme, registeredAdmins, userId }: SettingsContentProps) => {

    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const removeAdmin = async (userId: string) => {
        try {
            setLoading(true)
            const response = await axios.delete('/api/remove-registered-admin', {
                data: {
                    id: userId
                }
            })
            if (response.status === 200) {
                toast.success("Registration removed successfully")
                router.replace("/register-admin")
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to remove registration")
        } finally {
            setLoading(false)

        }
    }
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    if (tabId === "account") {
        return (
            <motion.div variants={container} initial="hidden" animate="show">
                <UserProfile />
            </motion.div>
        )
    }

    if (tabId === "appearance") {
        return (
            <motion.div variants={container} initial="hidden" animate="show">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize the look and feel of the application</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <motion.div variants={item} className="space-y-4">
                            <h3 className="font-medium">Theme</h3>
                            <div className="flex flex-col flex-wrap gap-4">

                                {
                                    themeItems.map((t) => (
                                        <motion.div key={t.id}
                                            whileHover={{
                                                scale: 1.008,
                                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                            }}
                                            whileTap={{ scale: 0.99 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 17,
                                            }}
                                            className={`
            cursor-pointer rounded-lg border p-4 
            ${theme === t.label
                                                    ? "border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5"
                                                    : "border-input bg-card hover:bg-accent/50"
                                                }
            transition-colors duration-200 ease-in-out
            shadow-sm hover:shadow-md
          `}
                                            onClick={() => {
                                                setTheme(t.label);
                                                toast.success(`${t.Name} mode applied`);
                                            }}

                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`
                rounded-full p-2
                ${theme === t.label ? "bg-primary/20" : "bg-muted"}
              `}
                                                    >
                                                        <t.icon className={`h-5 w-5 ${theme === `${t.label}` ? "text-primary" : "text-muted-foreground"}`} />
                                                    </div>
                                                    <span className={`font-medium ${theme === `${t.label}` ? "text-primary" : "text-foreground"}`}>{t.Name}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </motion.div>
                        <Separator />
                    </CardContent>
                </Card>
            </motion.div>
        )
    }

    if (tabId === "admins") {
        return (
            <motion.div variants={container} initial="hidden" animate="show">
                <Card>
                    <CardHeader>
                        <CardTitle>Admin Management</CardTitle>
                        <CardDescription>View and manage administrator accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <motion.div variants={item} className="space-y-4">
                            <h3 className="font-medium">Administrator List</h3>
                            <div className="space-y-4">
                                {registeredAdmins.map((admin) => (
                                    <motion.div
                                        key={admin.id}
                                        variants={item}
                                        className="rounded-md border p-4 transition-all hover:bg-accent/50"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <span className="font-bold text-primary">
                                                            {admin.firstName.charAt(0)}
                                                            {admin.lastName.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            {admin.firstName} {admin.middleName && `${admin.middleName} `}
                                                            {admin.lastName}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">{admin.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-3 text-sm">
                                                <div className="rounded-md bg-secondary px-2 py-1">Id: {admin.id}</div>
                                                {/* <div className="rounded-md bg-secondary px-2 py-1">Notices: {admin}</div> */}
                                            </div>
                                        </div>
                                        <motion.div whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }} className="flex justify-end">{
                                                (loading && admin.clerkId == userId) ? <Loader2 className=" animate-spin text-red-800" /> : (

                                                    <AlertDialog >
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                disabled={admin.clerkId !== userId}
                                                                className="text-sm px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                                                            >
                                                                Remove Registration
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent >
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90' onClick={() => { removeAdmin(admin.clerkId) }}>{loading ? "Deleting..." : "Continue"}</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                )
                                            }
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <Separator />

                        <motion.div variants={item} className="space-y-4">
                            <h3 className="font-medium">Admin Statistics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="rounded-md border p-4 text-center">
                                    <p className="text-2xl font-bold">{registeredAdmins.length}</p>
                                    <p className="text-sm text-muted-foreground">Total Registered Admins</p>
                                </div>
                            </div>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        )
    }


    return null
}
export default SettingsContent
