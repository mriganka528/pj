"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Calendar, Settings, User } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@/components/ModeToggle"
import Sidebar from "./Sidebar"

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Notices", href: "/admin/notices", icon: Calendar },
    { name: "Users", href: "/admin/users", icon: User },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

const Navbar = () => {
    const pathname = usePathname()

    return (
        <nav className=" text-sm sm:text-base bg-background border-b w-svw flex justify-between px-6 py-6 shadow-sm dark:border-border">
            <div >
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Admin Control Center</h1>
            </div>
            <Sidebar />
            <ul className="space-x-2 flex max-[768px]:hidden ">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                                pathname === item.href && "bg-muted text-primary font-medium",
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="  max-[768px]:hidden flex justify-center space-x-3 items-center">
                <ModeToggle />
                <UserButton />
            </div>
        </nav>
    )
}

export default Navbar