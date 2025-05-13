"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Droplets, Flame, Wind, CloudSnow, CloudLightning, ThermometerSun, Waves } from "lucide-react"
import indiaDisasters from "@/data/india-disasters.json"

interface Disaster {
  id: string
  location: string
  date: string
  disasterType: string
  description: string
  }

const getDisasterIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "flood":
      return <Droplets className="h-5 w-5 text-blue-500" />
      case "earthquake":
      return <CloudLightning className="h-5 w-5 text-yellow-500" />
      case "cyclone":
      return <Wind className="h-5 w-5 text-cyan-500" />
    case "tsunami":
      return <Waves className="h-5 w-5 text-indigo-500" />
    case "heat wave":
      return <ThermometerSun className="h-5 w-5 text-red-500" />
      case "landslide":
      return <CloudSnow className="h-5 w-5 text-gray-500" />
      case "cloudburst":
      return <Droplets className="h-5 w-5 text-blue-500" />
      default:
      return <AlertTriangle className="h-5 w-5 text-orange-500" />
    }
  }

export default function HistoricalDisasters() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const disasters = indiaDisasters.disasters as Disaster[]

  const filteredDisasters = selectedType === "all"
    ? disasters
    : disasters.filter(disaster => disaster.disasterType.toLowerCase() === selectedType.toLowerCase())

  const disasterTypes = Array.from(new Set(disasters.map(d => d.disasterType)))

  return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedType === "all" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedType("all")}
        >
          All
        </Badge>
        {disasterTypes.map(type => (
                <Badge
                  key={type}
            variant={selectedType === type ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedType(type)}
                >
                  {type}
                </Badge>
              ))}
          </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDisasters.map(disaster => (
          <Card key={disaster.id} className="weather-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {getDisasterIcon(disaster.disasterType)}
                  {disaster.disasterType}
                </CardTitle>
                <Badge variant="outline">{disaster.date}</Badge>
            </div>
              <CardDescription>{disaster.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
              <p className="text-sm text-gray-300">{disaster.description}</p>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
  )
}
