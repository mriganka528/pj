"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TestimonialSection({ users }) {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? users.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === users.length - 1 ? 0 : prev + 1));
  };

  if (users.length == 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>No testimonials available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-10">
      <div className="mx-auto px-6">
        <div className="bg-gray-800 rounded-3xl shadow-xl p-10">
          <div className="text-center mb-9 flex items-center justify-center gap-3">
            <MessageSquare className="w-10 h-10 text-white" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
              What Our Users Say
            </h2>
          </div>

          <p className="text-gray-300 mt-1 text-lg max-w-l mx-auto text-center">
            Discover how bulletinX is enhancing communication and simplifying
            access to information across the campus.
          </p>
          {
            (users.length == 0) ?
              (
                <div className="text-center text-gray-500 py-10">
                  <p>No testimonials available at the moment.</p>
                </div>
              ) : (
                <div className="relative mt-12 flex items-center justify-center">
                  {/* Left Arrow */}
                  <Button
                    onClick={handlePrev}
                    className="absolute left-0 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100"
                    aria-label="Previous testimonial"
                    disabled={current === 0}
                  >
                    <ChevronLeft className="w-10 h-10 text-gray-700" />
                  </Button>

                  {/* Animated Testimonial */}
                  <div className="w-full max-w-md mx-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-2xl shadow-md p-3 flex flex-col items-center border border-gray-200"
                      >
                        <Image src={current % 2 == 0 ? '/assets/man2.jpeg' : '/assets/women.jpeg'} alt={users[current].name} width={100} height={100} className="w-24 h-24 rounded-full object-cover border-4 border-gray-300" />

                        <h3 className="mt-4 text-2xl font-semibold text-gray-700">
                          {users[current].name}
                        </h3>

                        <p className="mt-4 text-gray-600 text-center leading-relaxed">
                          "{users[current].feedback}"
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right Arrow */}
                  <Button
                    onClick={handleNext}
                    className="absolute right-0 z-10 p-2 rounded-full bg-white shadow hover:bg-gray-100"
                    aria-label="Next testimonial"
                    disabled={current === users.length - 1}
                  >
                    <ChevronRight className="w-10 h-10 text-gray-700" />
                  </Button>
                </div>
              )
          }


        </div>
      </div>
    </div>
  );

}

