import prismadb from '@/lib/prismadb'
import React from 'react'
import Newsletter from './components/Newsletter'
export function generateMetadata() {
  return {
    title: "Newsletter",
    description: "Subscribe to our newsletter",
  }
}
const page = async () => {
  const suscribedUser = await prismadb.suscribedUser.findMany()
  return (
    <div>
      <Newsletter suscribedUser={suscribedUser} />
    </div>
  )
}

export default page
