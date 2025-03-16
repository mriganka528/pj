import React from 'react'
import UserManagement from './componenets/UserManagement'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function page() {
    const getSuscribedUsers = await prisma.suscribedUser.findMany()
    console.log(getSuscribedUsers)
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Notice Board Subscription Management</h1>
            <UserManagement suscribedUser={getSuscribedUsers} />
        </main>
    )
}

export default page
