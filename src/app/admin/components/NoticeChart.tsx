"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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

  const chartConfig = {
    desktop: {
      label: "notices",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <div className='w-full'>
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
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="notices" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      )}
    </div>


  )
}