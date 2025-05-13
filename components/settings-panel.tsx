"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings, User, Sliders, Bell, LogOut } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-[#2A2A2A] text-white border-l border-gray-700">
        <SheetHeader>
          <SheetTitle className="text-white">Settings</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-700"
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-700"
          >
            <Sliders className="mr-2 h-4 w-4" />
            Preferences
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-700"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
} 