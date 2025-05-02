"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, User, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function Newsletter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Thank you for subscribing and providing feedback!");
    setFormData({ name: "", email: "", feedback: "" });
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/libb.jpg')" }} // <-- Replace with your image path
    >
      {/* Header */}
      <header className="bg-white shadow-md py-3 px-6">
  <div className="container mx-auto flex justify-between items-center">
    {/* Left - Site Name */}
    <div className="flex-1">
      <Link href="/" className="text-4xl font-extrabold text-gray-800">
        bulletin X
      </Link>
    </div>

    {/* Center - Logo */}
    <div className="flex-1 flex justify-center">
      <Link href="/">
        <Image
          src="/assets/bulletein.png" // Replace with your actual logo path
          alt="Bulletin X Logo"
          width={90}
          height={90}
          className="object-contain"
        />
      </Link>
    </div>

    {/* Right - Navigation */}
    <nav className="flex-1 flex justify-end space-x-6 text-lg font-bold text-gray-800">
      <Link href="/">HOME</Link>
      <Link href="/about">ABOUT</Link>
      <Link href="/login">LOGIN</Link>
    </nav>
  </div>
</header>


      {/* Newsletter Section */}
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="bg-white flex items-center justify-center py-12 px-8 rounded-3xl shadow-2xl w-3xl overflow-hidden border border-gray-300">
          {/* Content */}
          <div>
          </div>
          <div className="relative z-10">
            <h2 className="text-6xl font-extrabold text-gray-800 text-center mb-6" style={{ fontFamily: "'Lora', serif" }}>
              Subscribe to Our Newsletter
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500" size={24} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-100 transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={24} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-100 transition-all"
                />
              </div>

              {/* Feedback Field */}
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-500" size={24} />
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="Your Feedback"
                  rows="4"
                  className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-100 resize-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-[#cdcccc] transition duration-300 shadow-lg"
              >
                Subscribe & Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


