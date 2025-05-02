"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import MobileNav from "./MobileNav";
import Image from "next/image";

export default function Header() {
  const videos = [
    "/assets/unibuilding.mp4",
    "/assets/lib.mp4",
    "/assets/uniground3.mp4",
    "/assets/classroom.mp4",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative  flex items-center justify-center mx-4 rounded-xl overflow-hidden mt-6">
      {/* Video Background */}
      <video
        key={currentIndex}
        src={videos[currentIndex]}
        className="w-full h-[90vh] object-cover rounded-xl"
        autoPlay
        muted
      />

      {/* Header */}
      <header className=" absolute top-0 left-0 w-full bg-[#cdcccc] backdrop-blur-md shadow-md py-4 sm:py-3 px-6 z-10 rounded-t-xl">
        {/* Mobile navigation manu */}
        <div className="min-[768px]:hidden">
          <MobileNav />
        </div>
        <div className="  max-[768px]:hidden container mx-auto flex justify-between items-center">
          {/* Left - Menu */}
          <nav className="hidden md:flex space-x-10 text-gray-800 text-lg font-bold">
            <DropdownMenu />
            <Link href="/">HOME</Link>
            <Link href="/newsletter">NEWSLETTER</Link>
          </nav>

          {/* Center - Logo */}
          <Link href="/" className="flex flex-col justify-center items-center">
            <Image src="/assets/bulletein.png"
              width={45}
              height={45}
              className="object-contain" />
            <h1 className="font-bold ">BulletinX</h1>
          </Link>


          {/* Right - Additional Links */}
          <div className="hidden md:flex space-x-8 text-gray-800 text-lg font-bold">
            <Link href="/admin">ADMIN LOGIN</Link>
            <Link href="/about">ABOUT</Link>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="absolute z-5 text-white text-center p-6 rounded-lg">
        <h2 className="text-5xl font-bold">Smart notices for a smarter YOU</h2>
        <p className="mt-4 text-2xl">Welcome to bulletin X!</p>
        <button className="mt-6 px-6 py-3 bg-gray-800 text-[#fffff] rounded-full shadow-md hover:bg-gray-200 font-bold">
          VIEW NOW
        </button>
      </div>
    </section>
  );
}
