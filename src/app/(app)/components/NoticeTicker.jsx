"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NoticeTicker({ notices }) {
  if (!notices || notices.length === 0) {
    return null; // Don't render anything if there are no notices
  }
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[95%] sm:max-w-[98%] mt-2.5 sm:mt-5  mx-auto bg-[#cdcccc] backdrop-blur-lg shadow-lg h-11 rounded-2xl flex items-center justify-center overflow-hidden px-6">
      {/* Wrapper to prevent text shifting */}
      <div className="w-full h-11 flex items-center justify-center relative">
        {notices.map((notice, index) => (
          <Link
            key={index}
            href={`/notices/${notice.id}`}
            className={`absolute text-xl md:text-xl font-bold text-gray-800 hover:text-white transition-all duration-700 transform text-center w-full ${index === currentIndex
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
              }`}
          >
            {notice.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
