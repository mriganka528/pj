"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UploadNoticeComponent from "./components/UploadNoticeComponent";
import { Notice } from "@prisma/client";
import { RefreshCcw } from "lucide-react";
import NoticeCard from "../components/NoticeCard";
import { toast } from "sonner";
import { motion } from "framer-motion"


const Page = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchNotices = async () => {
    try {
      const response = await axios.get("/api/get-notices");
      if (response.data.success) {
        const allNotices = response.data.notices;

        const currentDate = new Date()
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        console.log("Helooo", allNotices)
        // Filter notices for the current month
        const filteredNotices = allNotices.filter((notice: Notice) => {
          const noticeDate = new Date(notice.dateCreated); // Ensure 'uploadDate' is in ISO format in DB
          return (
            noticeDate.getMonth() === currentMonth &&
            noticeDate.getFullYear() === currentYear
          );
        });
        console.log("Helooo$$$", filteredNotices)

        setNotices(filteredNotices);
        console.log("NNNN :", notices)
      }
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotices();
  }, [notices]);

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
      toast.error("Failed to delete the notice")
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="px-10">
      <UploadNoticeComponent />
      <div className="overflow-x-auto">
        <div className="max-w-7xl">
          <div className="flex justify-start">
            <h2 className="text-2xl font-semibold mr-3 mb-6">Recent Notices</h2>
          </div>
          {loading ? (
            <RefreshCcw className=" animate-spin" />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
