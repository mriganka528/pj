import React from 'react'
import UserManagement from './componenets/UserManagement'
import prismadb from '@/lib/prismadb'
export function generateMetadata() {
    return {
        title: "Subscription Management",
        description: "Manage your notice board subscriptions.",
    }
}
async function page() {
    const getSuscribedUsers = await prismadb.suscribedUser.findMany()
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Notice Board Subscription Management</h1>
            <UserManagement suscribedUser={getSuscribedUsers} />
        </main>
    )
}

export default page
