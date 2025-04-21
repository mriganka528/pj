import React from 'react'
import UserForm from './componenets/UserForm'
import { SignOutButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

function page() {
    return (
        <div className='bg-slate-50'>
            <div className='flex items-center justify-between px-4 py-6 border rounded-b-md'>
                <h1 className='text-3xl font-bold'>BulletinX</h1>
                <div className="justify-start p-2 rounded-lg text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">
                    <SignOutButton  >
                        <LogOut  className="mr-2 h-4 w-4 inline-block hover:translate-x-1 transition-all" />
                    </SignOutButton>
                </div>
            </div>
            <UserForm />
        </div>
    )
}

export default page