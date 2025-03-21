"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Calendar, Settings, User } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@/components/ModeToggle"
import Sidebar from "./Sidebar"
import { useMotionValueEvent, useScroll, motion } from "framer-motion"
import { useState } from "react"
const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Notices", href: "/admin/notices", icon: Calendar },
    { name: "Users", href: "/admin/users", icon: User },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

const Navbar = () => {
    const pathname = usePathname()
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 90) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
        }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }} className=" text-sm sm:text-base bg-background border-b w-svw flex justify-between px-6 py-5 sm:py-6 shadow-sm dark:border-border">
            <Sidebar />
            <div >
                <h1 className=" max-[768px]:hidden  text-xl md:text-2xl font-bold text-foreground">Admin Control Center</h1>

                {/* Mobile navigation content */}
                <div className=" flex justify-center items-center  space-x-3 min-[768px]:hidden">
                    <ModeToggle />
                    <UserButton />
                </div>
            </div>
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
        </motion.nav>
    )
}

export default Navbar