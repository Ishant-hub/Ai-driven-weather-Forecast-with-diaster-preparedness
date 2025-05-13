"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const demoNotification = {
  id: 1,
  title: "Weather Alert",
  message: "Heavy rainfall expected in your area in the next 2 hours.",
  time: "2 minutes ago",
  type: "warning",
}

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([demoNotification])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-16 z-50 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-[#2A2A2A] text-white border-l border-gray-700">
        <SheetHeader>
          <SheetTitle className="text-white">Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No new notifications
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-gray-800 rounded-lg p-4 relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-white"
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.filter((n) => n.id !== notification.id)
                      )
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-medium text-white">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 