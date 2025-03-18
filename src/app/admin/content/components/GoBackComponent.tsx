"use client"
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const GoBackComponent = () => {
    const router = useRouter()
    const handleClick = () => {
        router.back()
    }
    return (
        <div>
            <Button variant={'secondary'} className='flex items-center justify-center -space-x-1' onClick={handleClick} >
                <ChevronLeft className='h-7 w-7' />
                <span>
                    Go Back
                </span>
            </Button>
        </div>
    )
}

export default GoBackComponent
