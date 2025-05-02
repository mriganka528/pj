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
import { motion } from "framer-motion"
import Image from 'next/image'
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
            <Sheet >
                <SheetTrigger>
                    <PanelTopOpen className=' hover:text-foreground transition-colors' />
                </SheetTrigger>
                <SheetContent side={'top'} className='flex dark:bg-transparent dark:backdrop-blur-sm flex-col items-center justify-center space-y-4 py-10'>
                    <Link href="/admin" className="flex flex-col items-center justify-center w-full">
                        <Image
                            src="/assets/bulletein.png" // 🔁 Replace with your actual logo path
                            alt="Bulletin X Logo"
                            width={70}
                            height={70}
                            className="object-contain"
                        />
                        <h1 className="font-bold text-lg text-center">Bulletein X</h1>

                    </Link>
                    <ul className='flex flex-col  justify-between space-y-10 py-10'>
                        {navItems.map((item) => (
                            <SheetClose key={item.name}>
                                <motion.li animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -5 }} className={cn('shadow-md dark:shadow-gray-800 dark:shadow py-2 px-7 rounded-lg', pathname === item.href && "bg-gray-200 dark:bg-gray-900 font-medium",)}>
                                    <SheetClose>
                                        <Link
                                            href={item.href}

                                        >
                                            <SheetClose className=
                                                "flex items-center space-x-3 rounded-lg px-3 py-2 dark:text-muted-foreground  transition-colors">
                                                <item.icon className="h-5 w-5" />
                                                <span className='text-lg'>{item.name}</span>
                                            </SheetClose>
                                        </Link>
                                    </SheetClose>
                                </motion.li>
                            </SheetClose>
                        ))}
                    </ul>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Sidebar
