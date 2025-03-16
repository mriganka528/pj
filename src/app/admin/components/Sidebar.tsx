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
                    <SheetTitle className='text-xl'>BulletinX</SheetTitle>
                    <ul className='flex flex-col  justify-between space-y-12 py-14'>
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
                                    <SheetClose>
                                        <span>{item.name}</span>
                                    </SheetClose>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Sidebar
