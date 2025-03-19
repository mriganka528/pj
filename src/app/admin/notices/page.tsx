"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Notice, Category, Priority } from "@prisma/client";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NoticeCard from "../components/NoticeCard";
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const Page = () => {
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
  const [selectedTab, setSelectedTab] = useState("all");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);

  // Toggle category selection
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
  // Clear filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriorities([]);
    setSearchQuery("");
  };

  // Fetch notices when tab or category changes
  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/get-notices`);

        if (response.data.success) {
          setNotices(response.data.notices);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [selectedCategories, selectedTab]);

  // Filter notices by search query
  const filteredNotices = notices.filter((notice) => {
    // Search filter
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase())

    // Tab filter
    const matchesTab =
      (selectedTab === "all") || ((selectedTab === "active") && (notice.status === "ACTIVE")) || ((selectedTab === "draft") && (notice.status === "DRAFT")) || ((selectedTab === "archived") && (notice.status === "ARCHIVED")) || ((selectedTab === "scheduled") && (notice.status === "SCHEDULED"))

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(notice.category)

    // Priority filter
    const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(notice.priority)


    return matchesSearch && matchesTab && matchesCategory && matchesPriority
  })
  // handle delete
  const handleDelete = async (notice_id: string) => {
    try {
      const response = await axios.delete("/api/delete-notice", {
        data: { notice_id },
      });

      if (response.data.success) {
        setNotices((prevNotices) => prevNotices.filter((n) => n.id !== notice_id));
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Notices</h1>
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
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
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
          {/* Priority filter */}
          <Popover open={openPriority} onOpenChange={setOpenPriority}>
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


          {/* Clear Filters Button */}
          {(selectedCategories.length > 0 || selectedPriorities.length > 0 || searchQuery) && (
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

      {/* Active Filters Display for */}
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
      {/* Tabs */}
      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList >
          <TabsTrigger className="text-xs sm:text-base" value="all">All Notices</TabsTrigger>
          <TabsTrigger className="text-xs sm:text-base" value="active">Active</TabsTrigger>
          <TabsTrigger className="text-xs sm:text-base" value="archived">Archived</TabsTrigger>
          <TabsTrigger className="text-xs sm:text-base" value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger className="text-xs sm:text-base" value="draft">Draft</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-4">
          {loading ? (
            // Loading skeletons
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {
                Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-20 w-full" />
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>

          )
            : (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice, index) => (
                    <motion.div key={notice.id} initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ y: -5 }}>
                      <NoticeCard notice={notice} onDelete={handleDelete} />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No notices found.</p>
                )}
              </div>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
