"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

const weekOptions = [
  { label: "Current Week", value: "current" },
  { label: "Last Week", value: "last" },
  { label: "Two Weeks Ago", value: "last-last" },
]

export function NoticeChart() {
  const [data, setData] = useState<{ name: string; notices: number }[]>([])
  const [selectedWeek, setSelectedWeek] = useState("current")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await fetch(`/api/get-notices-count?week=${selectedWeek}`)
        const notices = await res.json()
        setData(notices)
      } catch (error) {
        console.error("Error fetching notice data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedWeek])

  return (
    <div>
      {/* Week Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger className="w-full sm:w-[200px] border-gray-300 shadow-sm">
            <SelectValue placeholder="Select Week" />
          </SelectTrigger>
          <SelectContent>
            {weekOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart or Skeleton Loader */}
      {loading ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <Skeleton className="w-full h-[300px] rounded-lg" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 14 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="notices" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>


  )
}
