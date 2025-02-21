"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Calendar, Settings } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Schedule", href: "/admin/schedule", icon: Calendar },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <nav className=" bg-white w-svw flex justify-between px-6 py-4  shadow-md">
            <div >
                <h1 className="text-2xl font-bold">Admin Page</h1>
            </div>
            <ul className="space-x-2  flex ">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100",
                                pathname === item.href && "bg-gray-100 text-blue-600",
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className=" flex justify-center items-center">
                <UserButton />
            </div>
        </nav>
    )
}

export default Sidebar