import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { AlertTriangle, AlignRight, Book, BookOpen, Briefcase, CheckCircle, ChevronRight, FileText, GraduationCap, HeartPulse, Home, House, Info, Laptop, Medal, MinusCircle, MoreHorizontal, Newspaper, NotebookPen, NotepadText, RefreshCcw, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const MobileNav = () => {
  const navLinks = [
    { name: "Home", link: "/", logo: <House className="inline-block mr-1.5 " /> },
    { name: "About", link: "/about", logo: <Info className="inline-block mr-1.5 " /> },
    { name: "Newsletter", link: "/newsletter", logo: <Newspaper className="inline-block mr-1.5 " /> },
    { name: "Admin Login", link: "/sign-in", logo: <User className="inline-block mr-1.5 " /> },
  ]
  const subcategories = {
    Academic: [
      { name: "Academic", icon: <NotebookPen size={100} />, link: "/notices?category=Academic" },
      { name: "Final Exam", icon: <Book size={100} />, link: "/notices?category=FinalExam" },
      { name: "Results", icon: <FileText size={100} />, link: "/notices?category=ExamResults" },
      { name: "Revaluation", icon: <RefreshCcw size={100} />, link: "/notices?category=Revaluation" },
    ],
    Priority: [
      { name: "High Priority", icon: <AlertTriangle size={100} />, link: "/notices?priority=High" },
      { name: "Medium Priority", icon: <MinusCircle size={100} />, link: "/notices?priority=Medium" },
      { name: "Low Priority", icon: <CheckCircle size={100} />, link: "/notices?priority=Low" },
    ],
    Events: [
      { name: "Sports", icon: <Medal size={100} />, link: "/notices?category=Sports" },
      { name: "Career", icon: <Briefcase size={100} />, link: "/notices?category=Career" },
      { name: "Health & Wellness", icon: <HeartPulse size={100} />, link: "/notices?category=HealthAndWellness" },
    ],
    Administrative: [
      { name: "Student Life", icon: <GraduationCap size={100} />, link: "/notices?category=StudentServices" },
      { name: "Library", icon: <BookOpen size={100} />, link: "/notices?category=Library" },
      { name: "Campus Life", icon: <Home size={100} />, link: "/notices?category=CampusLife" },
      { name: "Technology", icon: <Laptop size={100} />, link: "/notices?category=Technology" },
    ],
    "View More": [
      { name: "More Options", icon: <MoreHorizontal size={100} />, link: "/notices" },
    ],
  };

  return (
    <div className="flex justify-between  items-center">
      <Link href="/">
        <Image
          src="/assets/bulletein.png" // 🔁 Replace with your actual logo path
          alt="Bulletin X Logo"
          width={45}
          height={45}
          className="object-contain"
        />
      </Link>
      <Sheet >
        <SheetTrigger >
          <AlignRight />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-gray-100">
          <SheetHeader>
            <SheetTitle>
              {/* Center - Logo */}
              <Link href="/" className="flex flex-col items-center justify-center w-full">
                <Image
                  src="/assets/bulletein.png" // 🔁 Replace with your actual logo path
                  alt="Bulletin X Logo"
                  width={70}
                  height={70}
                  className="object-contain"
                />
                <h1 className="font-bold text-lg text-center">Bulletein X</h1>

              </Link>
            </SheetTitle>
            <SheetDescription >
              <div className="  container mx-auto mt-20 ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full justify-between mb-9 bg-gray-300 rounded-lg py-3 px-4 text-gray-800 text-lg font-bold">
                    <div className="flex">
                      <NotepadText className="inline-block mr-1.5" />
                      <span>Notices</span>
                    </div>
                    <ChevronRight className="inline-block" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[11rem]" >
                    {
                      Object.keys(subcategories).map((category, index) => (
                        <div className=" rounded-md" key={index}>
                          <DropdownMenuSub   >
                            <DropdownMenuSubTrigger className="py-3 px-4 w-full bg-gray-50 rounded-lg text-gray-800 text-lg font-bold">
                              {category}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              {subcategories[category].map((item, idx) => (
                                <div key={idx}>
                                  <DropdownMenuItem asChild className="bg-gray-50 p-3">
                                    <Link href={item.link} className="flex items-center gap-2">
                                      {item.icon}
                                      {item.name}
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                </div>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                        </div>

                      ))
                    }

                  </DropdownMenuContent>
                </DropdownMenu>
                <nav className="flex flex-col justify-start space-y-9 text-gray-800 text-lg font-bold">
                  {
                    navLinks.map((link, index) => (
                      <Link href={link.link} key={index} className="flex bg-gray-300 rounded-lg py-3 px-4  space-x-2" >
                        {link.logo}
                        {link.name}
                      </Link>
                    ))
                  }
                </nav>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
