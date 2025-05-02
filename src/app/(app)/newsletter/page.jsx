import prismadb from '@/lib/prismadb'
import React from 'react'
import Newsletter from './components/Newsletter'
const page = async () => {
  const suscribedUser = await prismadb.suscribedUser.findMany()
  return (
    <div>
      <Newsletter suscribedUser={suscribedUser} />
    </div>
  )
}

export default page
