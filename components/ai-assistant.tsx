"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Loader2 } from "lucide-react"
import { getWeatherData } from "@/lib/actions"
import { searchDisasters } from "@/lib/disaster-search"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AIAssistantProps {
  onClose: () => void
  location: string
}

export default function AIAssistant({ onClose, location }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: `Hello! I'm your weather assistant for ${location}. How can I help you today?` },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch weather data for AI responses
  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const data = await getWeatherData(location)
        setWeatherData(data)
      } catch (error) {
        console.error("Error fetching weather data for AI:", error)
      }
    }

    fetchWeatherData()
  }, [location])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])
    setInput("")
    setIsLoading(true)

    try {
      // Generate AI response based on user query and weather data
      let response = ""
      const query = input.toLowerCase()

      // Check if the query is about historical disasters
      if (
        query.includes("disaster") ||
        query.includes("flood") ||
        query.includes("earthquake") ||
        query.includes("cyclone") ||
        query.includes("tsunami") ||
        query.includes("landslide")
      ) {
        const disasterResults = searchDisasters(query)

        if (disasterResults.length > 0) {
          const disaster = disasterResults[0]
          response = `Based on historical data, on ${disaster.date}, a ${disaster.disasterType.toLowerCase()} occurred in ${disaster.location}. ${disaster.description}\n\nFor more information about historical disasters, please check the Disaster Preparedness section.`
        } else {
          // Continue with weather response if no disaster info found
          response = generateWeatherResponse(query, weatherData, location)
        }
      } else {
        // Regular weather response
        response = generateWeatherResponse(query, weatherData, location)
      }

      // Add AI response
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "assistant", content: response }])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error generating AI response:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again." },
      ])
      setIsLoading(false)
    }
  }

  const generateWeatherResponse = (query: string, weatherData: any, location: string) => {
    if (!weatherData) {
      return "I'm sorry, I don't have the weather data available right now. Please try again later."
    }

    if (query.includes("rain") || query.includes("precipitation")) {
      const chanceOfRain = weatherData.forecast.forecastday[0].day.daily_chance_of_rain
      return `The chance of rain today in ${location} is ${chanceOfRain}%. ${
        chanceOfRain > 50 ? "You might want to bring an umbrella!" : "It should be relatively dry."
      }`
    } else if (query.includes("temperature") || query.includes("hot") || query.includes("cold")) {
      const temp = Math.round(weatherData.current.temp_c)
      const feelsLike = Math.round(weatherData.current.feelslike_c)
      return `The current temperature in ${location} is ${temp}°C, but it feels like ${feelsLike}°C.`
    } else if (query.includes("weekend") || query.includes("next few days")) {
      const weekend = weatherData.forecast.forecastday.slice(1, 3)
      const conditions = weekend
        .map(
          (day: any) =>
            `${new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}: ${Math.round(day.day.avgtemp_c)}°C, ${day.day.condition.text}`,
        )
        .join(", ")
      return `Here's the forecast for the next couple of days: ${conditions}`
    } else if (query.includes("wind")) {
      return `The current wind speed in ${location} is ${weatherData.current.wind_kph} km/h.`
    } else if (query.includes("humidity")) {
      return `The current humidity in ${location} is ${weatherData.current.humidity}%.`
    } else if (query.includes("sunrise") || query.includes("sunset")) {
      return `Today in ${location}, the sun rises at ${weatherData.forecast.forecastday[0].astro.sunrise} and sets at ${weatherData.forecast.forecastday[0].astro.sunset}.`
    } else if (query.includes("alert") || query.includes("warning")) {
      const alerts = weatherData.alerts?.alert || []
      if (alerts.length > 0) {
        return `There are ${alerts.length} weather alerts for ${location}: ${alerts.map((a: any) => a.headline).join(", ")}`
      } else {
        return `Good news! There are no weather alerts for ${location} at this time.`
      }
    } else {
      return `The current weather in ${location} is ${weatherData.current.condition.text} with a temperature of ${Math.round(weatherData.current.temp_c)}°C. How else can I help you with the weather?`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="fixed bottom-20 right-6 w-80 h-96 bg-[#1E1E1E] border border-[#3A3A3A] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
      <div className="p-3 bg-[#2A2A2A] flex justify-between items-center border-b border-[#3A3A3A]">
        <div className="text-sm font-medium">Weather Assistant</div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                message.role === "user" ? "bg-[#4F46E5] text-white" : "bg-[#2A2A2A] text-gray-200"
              }`}
            >
              {message.content.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-gray-200">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-[#3A3A3A] bg-[#2A2A2A]">
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about weather..."
            className="flex-1 bg-[#1E1E1E] border-[#3A3A3A] text-sm"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="h-8 w-8 bg-[#4F46E5] hover:bg-[#4338CA]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
