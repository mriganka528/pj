import React from 'react'
import DropdownMenu from './DropdownMenu'
import MobileNav from './MobileNav'
import Link from 'next/link'
import Image from 'next/image'
const NavigationBar = () => {
    return (
        <header className=" mt-3 sm:mt-5 mx-4 bg-[#cdcccc] backdrop-blur-md shadow-md py-4 sm:py-3  px-6  rounded-xl ">
            {/* Mobile navigation manu */}
            <div className="min-[768px]:hidden">
                <MobileNav />
            </div>
            <div className="  max-[768px]:hidden container mx-auto flex justify-between items-center">
                {/* Left - Menu */}
                <nav className="hidden md:flex space-x-10 text-gray-800 text-lg font-bold">
                    <Link href="/">HOME</Link>
                    <DropdownMenu />
                    <Link href="/newsletter">NEWSLETTER</Link>
                </nav>

                {/* Center - Logo */}
                <Link href="/" className="flex flex-col justify-center items-center">
                    <Image src="/assets/bulletein.png"
                        width={45}
                        height={45}
                        alt="bulletinX Logo"
                        className="object-contain" />

                    <h1 className="font-bold ">bulletinX</h1>
                </Link>


                {/* Right - Additional Links */}
                <div className="hidden md:flex space-x-8 text-gray-800 text-lg font-bold">
                    <Link href="/sign-in">ADMIN LOGIN</Link>
                    <Link href="/about">ABOUT</Link>
                </div>
            </div>
        </header>
    )
}

export default NavigationBar
