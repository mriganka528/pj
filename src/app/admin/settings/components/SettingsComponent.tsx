"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { ChevronRight, LogOut, Palette, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SettingsContent from "./SettingsContent"
import { SignOutButton } from "@clerk/nextjs"
import { Admin } from "@prisma/client"
interface Props {
  registeredAdmins: Admin[],
  userId: string
}

export default function SettingsComponent({ registeredAdmins, userId }: Props) {
  const [activeTab, setActiveTab] = useState("account")
  const { theme, setTheme } = useTheme()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const settingsTabs = [
    { id: "account", label: "Account", icon: <User className="h-4 w-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="h-4 w-4" /> },
    { id: "admins", label: "Admins", icon: <Shield className="h-4 w-4" /> },
  ]

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for larger screens */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="hidden md:flex md:w-64 flex-col gap-1"
          >
            {settingsTabs.map((tab) => (
              <motion.div key={tab.id} variants={item}>
                <Button
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {activeTab === tab.id && <ChevronRight className="ml-auto h-4 w-4" />}
                </Button>
              </motion.div>
            ))}
            <Separator className="my-4" />
            <motion.div variants={item} className="justify-start p-2 rounded-lg text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">
              <LogOut className="mr-2 h-4 w-4 inline-block hover:translate-x-1 transition-all" />
              <SignOutButton />
            </motion.div>
          </motion.div>

          {/* Tabs for mobile */}
          <div className="md:hidden w-full">
            <Tabs defaultValue="account" onValueChange={setActiveTab} value={activeTab}>
              {/* Update the mobile tabs to only show the remaining options */}
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="admins">Admins</TabsTrigger>
              </TabsList>

              {/* Mobile tab contents */}
              {settingsTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="space-y-4">
                  <SettingsContent theme={theme} setTheme={setTheme} tabId={tab.id} registeredAdmins={registeredAdmins} userId={userId} />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Main content area */}
          <div className="hidden md:flex md:w-full">

            <motion.div
              className=" flex-1 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              key={activeTab}
            >
              <SettingsContent theme={theme} setTheme={setTheme} tabId={activeTab} registeredAdmins={registeredAdmins} userId={userId} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


