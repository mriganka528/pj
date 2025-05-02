"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MissionCarousel from "./MissionCarousel";
import QuoteSection from "./QuoteSection";
import StatsSection from "./StatsSection";
import MobileNav from "./MobileNav";

export default function About() {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      {/* Header */}

      <header className="  bg-white shadow-md py-3 px-6">
        <div className="min-[768px]:hidden py-2.5">
          <MobileNav />
        </div>
        <div className=" max-[768px]:hidden container mx-auto flex justify-between items-center">
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
                src="/assets/bulletein.png" // 🔁 Replace with your actual logo path
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
            <Link href="/newsletter" className="text-gray-800">
              NEWSLETTER
            </Link>
            <Link href="/admin">ADMIN LOGIN</Link>
          </nav>
        </div>
      </header>


      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center py-32 px-6 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/assets/about.jpg"
            alt="University background"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#02143e] leading-tight drop-shadow-lg">
            Empowering Students, One Notice at a Time.
          </h1>
          <p className="mt-6 text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Your trusted source for updates, events, and opportunities.
          </p>
        </motion.div>
      </motion.div>

      {/* FAQ Section */}

      <div className="bg-white py-20">
        <hr className="my-3 border-t-2 border-gray-800" />
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-center text-[#041f5d] mt-9"
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="mt-4 text-center text-gray-600 text-xl">
            Find quick answers to your questions.
          </p>

          {/* FAQ Content with Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 items-center px-6">
            {/* FAQ Questions */}
            <div>
              {[
                {
                  question: "What is Bulletin X?",
                  answer:
                    "Bulletin X is your trusted hub for everything happening around campus. Whether you're looking for the latest university updates, upcoming events, important announcements, or special opportunities, Bulletin X is designed to keep students and faculty members informed and connected. Our goal is to make sure you never miss out on anything important, helping you stay engaged with the university community every day.",
                },
                {
                  question: "How often is the information updated?",
                  answer:
                    "We take pride in keeping Bulletin X as current and reliable as possible. Our team updates the platform daily, ensuring that the information you see is fresh and accurate. From last-minute event changes to new announcements from university departments, you can count on Bulletin X to provide real-time updates so you’re always in the know.",
                },
                {
                  question: "Is Bulletin X free to use?",
                  answer:
                    "Absolutely! Bulletin X is completely free for all university students, faculty, and staff members. We believe that access to important information and campus happenings should be easy and accessible for everyone without any costs involved. Simply sign in with your university credentials and start exploring everything the platform has to offer.",
                },
                {
                  question: "How can I contribute or provide feedback?",
                  answer:
                    "We highly value your input and encourage you to share your ideas, suggestions, or feedback with us. If you’d like to contribute or let us know how we can improve, you can easily reach out through the contact form available on our website. Whether it’s reporting a technical issue, suggesting a new feature, or just letting us know how we’re doing, we’re always happy to hear from you and make Bulletin X even better for the community.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="mb-8"
                >
                  <h3
                    className="text-2xl font-bold text-[#041f5d] font-sans"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {faq.question}
                  </h3>

                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src="/assets/FAQ.jpg"
                alt="FAQ Illustration"
                fill
                className="object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <MissionCarousel />

      <QuoteSection
        quote="Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
        author="Bulletin X Team"
      />
      <hr className="my-3 border-t-2 border-gray-800" />
      <StatsSection />

      {/* Meet the Team */}
      <div className="bg-gradient-to-t from-gray-100 to-gray-300 py-20">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-extrabold text-[#041f5d]" style={{ fontFamily: "'Lora', serif" }}
          >
            Meet the Team
          </motion.h2>
          <p className="mt-4 text-gray-600 text-xl">
            The passionate minds behind Bulletin X.
          </p>

          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 px-6">
            {[
              {
                name: "Saemi Langthasa",
                role: "Co-Founder & Developer",
                description:
                  "A tech enthusiast with a love for intuitive platforms that transform student life.",
                image: "/assets/download1.jpeg",
                color: "text-pink-500",
              },
              {
                name: "Mriganka Sarma",
                role: "Co-Founder & Head of Operations",
                description:
                  "Ensures Bulletin X runs seamlessly, bridging students with crucial information.",
                image: "/assets/download2.jpeg",
                color: "text-blue-500",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col items-center"
              >
                <div className="relative w-32 h-32">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mt-6">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-gray-500 text-sm mt-4">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
