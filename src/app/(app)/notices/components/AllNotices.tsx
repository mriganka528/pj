"use client";
import React from 'react'
import { useState, } from "react";
import { Category, Notice, Priority } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import NoticeCard from './NoticeCard';
import { motion } from "framer-motion"
import Image from 'next/image';
interface AllNoticesProps {
    notices: Notice[]
    totalnotices: number;
    category?: string;
    priority?: string;
}
const AllNotices: React.FC<AllNoticesProps> = ({ notices, totalnotices, category, priority }) => {
    const categories: { value: Category; label: string }[] = [
        { value: "Academic", label: "Academic" },
        { value: "Events", label: "Events" },
        { value: "StudentServices", label: "Student Services" },
        { value: "CampusLife", label: "Campus Life" },
        { value: "Sports", label: "Sports" },
        { value: "Career", label: "Career" },
        { value: "HealthAndWellness", label: "Health & Wellness" },
        { value: "Technology", label: "Technology" },
        { value: "Library", label: "Library" },
        { value: "Administrative", label: "Administrative" },
    ];
    const Priorities: { value: Priority; label: string }[] = [
        { value: "High", label: "High" },
        { value: "Medium", label: "Medium" },
        { value: "Low", label: "Low" }
    ]
    const [searchQuery, setSearchQuery] = useState("");
    const [openCategory, setOpenCategory] = useState(false);
    const [openPriority, setOpenPriority] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([]);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    //Toggle category selection
    const toggleCategory = (category: Category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    // Toggle priority selection
    const togglePriority = (priority: Priority) => {
        setSelectedPriorities((prev) =>
            prev.includes(priority)
                ? prev.filter((p) => p !== priority)
                : [...prev, priority]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedPriorities([]);
        setSearchQuery("");
        setDateRange(undefined);
    };
    const filteredNotices = notices.filter((notice) => {
        // Search filter
        const matchesSearch =
            notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.content.toLowerCase().includes(searchQuery.toLowerCase())

        // Category filter
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(notice.category)

        // Priority filter
        const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(notice.priority)

        // Date range filter
        const noticeDate = new Date(notice.dateCreated)
        const matchesDateRange =
            !dateRange ||
            !dateRange.from ||
            (!dateRange.to && noticeDate >= dateRange.from) ||
            (dateRange.to && noticeDate >= dateRange.from && noticeDate <= dateRange.to)


        return matchesSearch && matchesCategory && matchesPriority && matchesDateRange;
    })
    return (
        <div className="container  mx-auto py-0 space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Notices</h1>
                <div className='flex space-x-3'>
                    {
                        category && (
                            <h1 className="text-xl sm:text-2xl  text-gray-700 dark:text-slate-200 font-medium tracking-tight">
                                Category: <i>{category}{priority && ","}</i>
                            </h1>
                        )
                    }
                    {
                        priority && (
                            <h1 className="text-xl sm:text-2xl text-gray-700 dark:text-slate-200 font-medium tracking-tight">
                                Priority:<i> {priority}</i>
                            </h1>
                        )
                    }
                </div>
                <p className="text-muted-foreground">
                    View and manage all system notices and announcements.
                </p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search notices..."
                        className="w-full pl-8  focus:border-[#7a7979]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Category Filter */}
                    <div className={cn((category ? "hidden" : "flex"))}>

                        <Popover open={openCategory} onOpenChange={setOpenCategory}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="h-10 justify-between">
                                    {selectedCategories.length > 0
                                        ? `${selectedCategories.length} category${selectedCategories.length > 1 ? "s" : ""
                                        }`
                                        : "Category"}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0" align="end">
                                <Command>
                                    <CommandInput placeholder="Search category..." />
                                    <CommandList>
                                        <CommandEmpty>No category found.</CommandEmpty>
                                        <CommandGroup>
                                            {categories.map((category) => (
                                                <CommandItem
                                                    key={category.value}
                                                    onSelect={() => toggleCategory(category.value)}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedCategories.includes(category.value)
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {category.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Priority filter */}

                    <div className={cn((priority ? "hidden" : "flex"))}>

                        <Popover open={openPriority} onOpenChange={setOpenPriority} >
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="h-10 justify-between">
                                    {selectedPriorities.length > 0
                                        ? `${selectedPriorities.length} priority${selectedPriorities.length > 1 ? "ies" : ""}`
                                        : "Priority"}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0" align="end">
                                <Command>
                                    <CommandInput placeholder="Search priority..." />
                                    <CommandList>
                                        <CommandEmpty>No priority found.</CommandEmpty>
                                        <CommandGroup>
                                            {Priorities.map((priority) => (
                                                <CommandItem key={priority.value} onSelect={() => togglePriority(priority.value)}>
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedPriorities.includes(priority.value) ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {priority.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Date Range filter */}
                    {totalnotices > 0 && (

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn("h-10 justify-between", dateRange && "text-primary")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateRange?.from ? (
                                        dateRange.to ? (
                                            <>
                                                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(dateRange.from, "LLL dd, y")
                                        )
                                    ) : (
                                        "Date Range"
                                    )}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end"  side='bottom'    sideOffset={8}>
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={dateRange?.from}
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    numberOfMonths={2}
                                    disabled={(date) => date > new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    )}

                    {/* Clear Filters Button */}
                    {(selectedCategories.length > 0 || selectedPriorities.length > 0 || searchQuery || dateRange) && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={clearFilters}
                            className="h-10 w-10"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Clear filters</span>
                        </Button>
                    )}
                </div>
            </div>

            {/* Active Filters Display for Category */}
            {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="flex items-center gap-1">
                            {cat}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(cat)} />
                        </Badge>
                    ))}
                </div>
            )}

            {/* Active Filters Display for priorities */}
            {selectedPriorities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {
                        selectedPriorities.map((pri) => (
                            <Badge key={pri} variant="secondary" className="flex items-center gap-1">
                                {pri}
                                <X className="h-3 w-3 cursor-pointer" onClick={() => togglePriority(pri)} />
                            </Badge>
                        ))
                    }
                </div>
            )}


            {/* Active Filters Display for date range */}
            {dateRange && dateRange.from && (
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                        {dateRange.to ? (
                            <>
                                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(dateRange.from, "LLL dd, y")
                        )}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setDateRange(undefined)} />
                    </Badge>
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    filteredNotices.length > 0 ? (
                        filteredNotices.map((notice, index) => (
                            <motion.div key={notice.id} initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                whileHover={{ y: -5 }}>
                                <NoticeCard notice={notice} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-3 flex  flex-col justify-center items-center  text-gray-500">
                            <Image src={'/assets/NoResult_dark.png'} height={400} width={400} alt='No result' />
                            <span>No notice Found</span>
                        </div>
                    )
                }
            </div>


        </div>
    )
}

export default AllNotices
