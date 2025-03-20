import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar, FileText, LayoutDashboard, PanelTopOpen, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {motion} from "framer-motion"
const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Notices", href: "/admin/notices", icon: Calendar },
    { name: "Users", href: "/admin/users", icon: User },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]
const Sidebar = () => {
    const pathname = usePathname()

    return (
        <div className='min-[768px]:hidden'>
            <Sheet>
                <SheetTrigger><PanelTopOpen /></SheetTrigger>
                <SheetContent side={'top'} className='flex flex-col items-center justify-center space-y-4 py-10'>
                    <SheetTitle className='text-3xl'>BulletinX</SheetTitle>
                    <ul className='flex flex-col  justify-between space-y-10 py-10'>
                        {navItems.map((item) => (
                            <motion.li    animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }} key={item.name} className={cn('shadow-md dark:shadow-gray-800 dark:shadow py-2 px-7 rounded-lg', pathname === item.href && "bg-gray-900 font-medium",)}>
                                <Link
                                    href={item.href}
                                    className=
                                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground  transition-colors"
                                >
                                    <item.icon className="h-5 w-5" />
                                    <SheetClose className='text-lg'>
                                        <span>{item.name}</span>
                                    </SheetClose>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Sidebar
