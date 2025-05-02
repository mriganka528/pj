"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book, FileText, RefreshCcw,
  AlertTriangle, CheckCircle,
  Medal, Briefcase, HeartPulse,
  GraduationCap, BookOpen, Home, Laptop,
  MoreHorizontal,
  MinusCircle,
  NotebookPen
} from "lucide-react"; 

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubcategory, setActiveSubcategory] = useState("");

  const handleOptionClick = () => {
    setIsOpen(false);
    setActiveSubcategory("");
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setActiveSubcategory("");
  };

  const subcategories = {
    ACADEMIC: [
      { name: "Academic", icon: <NotebookPen size={100} />, link: "/notices?category=Academic" },
      { name: "Final Exam", icon: <Book size={100} />, link: "/notices?category=FinalExam" },
      { name: "Results", icon: <FileText size={100} />, link: "/notices?category=ExamResults" },
      { name: "Revaluation", icon: <RefreshCcw size={100} />, link: "/notices?category=Revaluation" },
    ],
    PRIORITY: [
      { name: "High Priority", icon: <AlertTriangle size={100} />, link: "/notices?priority=High" },
      { name: "Medium Priority", icon: <MinusCircle size={100} />, link: "/notices?priority=Medium" },
      { name: "Low Priority", icon: <CheckCircle size={100} />, link: "/notices?priority=Low" },
    ],
    EVENTS: [
      { name: "Sports", icon: <Medal size={100} />, link: "/notices?category=Sports" },
      { name: "Career", icon: <Briefcase size={100} />, link: "/notices?category=Career" },
      { name: "Health & Wellness", icon: <HeartPulse size={100} />, link: "/notices?category=HealthAndWellness" },
    ],
    ADMINISTRATIVE: [
      { name: "Student Life", icon: <GraduationCap size={100} />, link: "/notices?category=StudentServices" },
      { name: "Library", icon: <BookOpen size={100} />, link: "/notices?category=Library" },
      { name: "Campus Life", icon: <Home size={100} />, link: "/notices?category=CampusLife" },
      { name: "Technology", icon: <Laptop size={100} />, link: "/notices?category=Technology" },
    ],
    "VIEW MORE": [
      { name: "More Options", icon: <MoreHorizontal size={100} />, link: "/notices" },
    ],
  };


  return (
    <div className="relative z-[1000] flex items-center gap-6">
      {/* NOTICE Button */}
      <div className="relative" onMouseEnter={() => setIsOpen(true)}>
        <button
          className="text-gray-800 text-lg font-bold focus:outline-none cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
        >
          NOTICE
        </button>



        {/* Animated Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full fixed top-[5.2rem] left-0 -translate-x-1/2 grid grid-cols-5 h-[25rem] bg-[#cdcccc] backdrop-blur-md shadow-md rounded-b-lg p-6"
              onMouseLeave={handleMouseLeave}
            >
              {Object.keys(subcategories).map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
                  className="relative flex flex-col items-center w-full"
                  onMouseEnter={() => setActiveSubcategory(category)}
                >
                  <Link
                    href="#"
                    className="text-gray-800 text-xl font-bold hover:text-[#ffffff]"
                    onClick={handleOptionClick}
                  >
                    {category}
                  </Link>

                  {/* Subcategories Display */}
                  <AnimatePresence>
                    {activeSubcategory === category && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-[80%] fixed top-[6.2rem] left-40  -translate-x-1/2 flex justify-center items-center gap-6 z-[1001]"

                        onMouseLeave={() => setActiveSubcategory("")}
                      >
                        {subcategories[category].map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            href={sub.link}
                            className="flex flex-col items-center gap-3 bg-[#666] text-white p-6 rounded-lg shadow-md w-[30%] hover:bg-[#555] transition"
                            onClick={handleOptionClick}
                          >
                            {sub.icon}
                            <span className="text-2xl font-bold">{sub.name}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


