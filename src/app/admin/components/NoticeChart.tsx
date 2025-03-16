"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", notices: 12 },
  { name: "Tue", notices: 19 },
  { name: "Wed", notices: 3 },
  { name: "Thu", notices: 5 },
  { name: "Fri", notices: 2 },
  { name: "Sat", notices: 3 },
  { name: "Sun", notices: 9 },
]

export function NoticeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="notices" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

