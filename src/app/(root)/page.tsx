import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='flex justify-between w-full px-3'>
        Notice page
        <Link href={'/sign-in'}>Sign in</Link>
      </div>
    </div>
  )
}

export default page
