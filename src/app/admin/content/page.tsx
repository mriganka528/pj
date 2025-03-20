"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UploadNoticeComponent from "./components/UploadNoticeComponent";
import { Notice } from "@prisma/client";
import NoticeCard from "../components/NoticeCard";
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";


const Page = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setIsUploading] = useState<boolean>(false);
  const fetchNotices = async () => {
    try {
      const response = await axios.get("/api/get-notices");
      if (response.data.success) {
        const allNotices = response.data.notices;
        console.log(allNotices)
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        // Filter notices for the current month
        const filteredNotices = allNotices.filter((notice: Notice) => {
          const noticeDate = new Date(notice.dateCreated); // Ensure 'uploadDate' is in ISO format in DB
          return (
            noticeDate.getMonth() === currentMonth &&
            noticeDate.getFullYear() === currentYear
          );
        });

        setNotices(() => filteredNotices);
      }
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotices();
  }, [uploading]);

  const handleDelete = async (notice_id: string) => {
    try {
      const response = await axios.delete("/api/delete-notice", {
        data: { notice_id },
      });

      if (response.data.success) {
        setNotices((prevNotices) => prevNotices.filter((n) => n.id !== notice_id));
        toast.success("Notice deleted successfully")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete the notice")
    }
  };

  return (
    <div className="px-4 sm:px-10">
      <UploadNoticeComponent setIsUploading={setIsUploading} />
      <div className="overflow-x-auto mt-3 sm:mt-6">
        <div className="max-w-7xl">
          <div className="flex justify-start">
            <h2 className="text-2xl font-semibold mr-3 mb-6">Recent Notices</h2>
          </div>{

          }
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

          ) : (
            (notices.length === 0) ? <p className="text-muted-foreground">No notices found.</p>
              : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notices.map((notice, index) => (
                    <motion.div key={notice.id} initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ y: -5 }}>
                      <NoticeCard notice={notice} onDelete={handleDelete} />
                    </motion.div>
                  ))}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
