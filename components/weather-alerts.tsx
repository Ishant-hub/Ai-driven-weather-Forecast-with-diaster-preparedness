import type { WeatherAlert } from "@/lib/types"
import { AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WeatherAlertsProps {
  alerts: WeatherAlert[]
}

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <div className="flex justify-center mb-2">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <p>No active weather alerts</p>
      </div>
    )
  }

  // Function to determine severity color
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "extreme":
        return "bg-red-500"
      case "severe":
        return "bg-orange-500"
      case "moderate":
        return "bg-yellow-500"
      case "minor":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-2 space-y-3">
      {alerts.map((alert, index) => (
        <Card key={index} className="p-3 bg-[#2A2A2A] border-[#3A3A3A]">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-sm">{alert.headline}</h4>
                <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>{alert.severity}</Badge>
              </div>
              <p className="text-xs text-gray-400 mb-2">{alert.areas}</p>
              <p className="text-xs mb-2">{alert.description}</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>From: {new Date(alert.effective).toLocaleString()}</span>
                <span>Until: {new Date(alert.expires).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
