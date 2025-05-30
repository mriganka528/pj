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
            <Button variant={'outline'} className='flex items-center justify-center -space-x-1' onClick={handleClick} >
                <ChevronLeft className='h-8 w-8' />
                <span>
                    Back
                </span>
            </Button>
        </div>
    )
}

export default GoBackComponent
