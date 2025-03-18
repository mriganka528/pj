import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, User, ChartBarStacked, ShieldCheck, CalendarCheck, GraduationCap, School, BookOpenCheck, HeartPulse, LibraryBig, Medal, HandHelping, Cpu, } from "lucide-react"
import { NoticeChart } from "./components/NoticeChart"
import getTotalNotice from "@/lib/getTotalNotice"
import getNoticeUploadGrowth from "@/lib/getNoticeUploadGrowth"
import getTotalActiveNotice from "@/lib/getTotalActiveNotice"
import getWeeklyNoticeGrowth from "@/lib/getWeeklyNoticeGrowth"
import getSubscribedUser from "@/lib/getSubscribedUser"
import getTotalScheduledNotice from "@/lib/getTotalScheduledNotice"
import getTotalCategories from "@/lib/getTotalCategories"
import { Category } from "@prisma/client"
import getCategoryDetails from "@/lib/categoryDetails/getCategoryDetails"

export default async function Dashboard() {

  const totalNotice = await getTotalNotice()
  const noticeUploadGrowth = await getNoticeUploadGrowth()
  const totalActiveNotice = await getTotalActiveNotice()
  const weeklyNoticeUploadGrowth = await getWeeklyNoticeGrowth()
  const subscribedUser = await getSubscribedUser()
  const totalScheduledNotice = await getTotalScheduledNotice()
  const totalCategories = await getTotalCategories()
  const categoryManu = [
    {
      name: Category.Academic,
      icon: GraduationCap
    }, {
      name: Category.Administrative,
      icon: ShieldCheck
    }, {
      name: Category.CampusLife,
      icon: School
    }, {
      name: Category.Career,
      icon: BookOpenCheck
    }, {
      name: Category.Events,
      icon: CalendarCheck
    }, {
      name: Category.HealthAndWellness,
      icon: HeartPulse
    }, {
      name: Category.Library,
      icon: LibraryBig
    }, {
      name: Category.Sports,
      icon: Medal
    },
    {
      name: Category.StudentServices,
      icon: HandHelping
    }, {
      name: Category.Technology,
      icon: Cpu
    }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNotice}</div>
            <p className="text-xs text-muted-foreground">{noticeUploadGrowth}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Notices</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveNotice}</div>
            <p className="text-xs text-muted-foreground">{weeklyNoticeUploadGrowth}% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Notice</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScheduledNotice}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <ChartBarStacked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suscribed Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribedUser}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main content area */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Notice Chart */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Notice Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <NoticeChart />
          </CardContent>
        </Card>
      </div>

      {/* Category Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Category Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categoryManu.map((category, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                  <category.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getCategoryDetails(category.name)}</div>
                  <p className="text-xs text-muted-foreground">Active notices</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

