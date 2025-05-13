"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Disaster Preparedness",
    href: "/disaster-preparedness",
  },
  {
    name: "Historical Events",
    href: "/historical-events",
  },
  {
    name: "Emergency Contacts",
    href: "/emergency-contacts",
  },
  {
    name: "Safety Tips",
    href: "/safety-tips",
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Navigation Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-[#2A2A2A] text-white border-r border-gray-700 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-4 mt-20 px-4">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-red-600 text-white"
                  : "text-white hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
} 