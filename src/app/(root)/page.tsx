import React from 'react'
import Header from "@/app/(app)/components/Header";
import NoticeTicker from "@/app/(app)/components/NoticeTicker";
import TestimonialSection from "@/app/(app)/components/TestimonialSection";
import Events from "@/app/(app)/components/Events";
import Stats from "@/app/(app)/components/Stats";
import { startOfWeek, endOfWeek, subWeeks, startOfMonth, endOfMonth } from 'date-fns';
import prismadb from '@/lib/prismadb';

const page = async () => {
  const now = new Date();
  const weekstart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
  const weekend = endOfWeek(now, { weekStartsOn: 1 });

  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  //get weekly notices
  const currentWeekHighPriorityNotices = await prismadb.notice.findMany({
    where: {
      status: "ACTIVE",
      priority: "High",
      dateCreated: {
        gte: weekstart,
        lte: weekend,
      },

    }
  })

  //get all event related notices
  const allEvenets = await prismadb.notice.findMany({
    where: {
      status: "ACTIVE",
      dateCreated: {
        gte: monthStart,
        lte: monthEnd,
      }
    }
  })
  //get user feedbacks about the app

  const users = await prismadb.suscribedUser.findMany();
  return (
    <div>
      <NoticeTicker notices={currentWeekHighPriorityNotices} />
      <div className="mb-16">
        <Header />
      </div>
      <Stats />
      <Events allEvenets={allEvenets} />
      <TestimonialSection users={users} />
    </div>
  )
}

export default page