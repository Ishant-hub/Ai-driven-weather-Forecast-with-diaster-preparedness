import { Card } from "@/components/ui/card"
import type { CityWeatherData } from "@/lib/types"
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from "lucide-react"

interface CityWeatherProps {
  city: CityWeatherData
}

export default function CityWeather({ city }: CityWeatherProps) {
  // Function to determine which icon to show based on condition text
  const getWeatherIcon = () => {
    const condition = city.condition.text.toLowerCase()

    if (condition.includes("sun") || condition.includes("clear")) {
      return <Sun className="h-10 w-10 text-yellow-400" />
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      return <CloudRain className="h-10 w-10 text-blue-400" />
    } else if (condition.includes("snow")) {
      return <CloudSnow className="h-10 w-10 text-white" />
    } else if (condition.includes("thunder") || condition.includes("lightning")) {
      return <CloudLightning className="h-10 w-10 text-yellow-300" />
    } else if (condition.includes("fog") || condition.includes("mist")) {
      return <CloudFog className="h-10 w-10 text-gray-400" />
    } else if (condition.includes("cloud")) {
      return <Cloud className="h-10 w-10 text-gray-300" />
    } else {
      return <Sun className="h-10 w-10 text-yellow-400" />
    }
  }

  return (
    <Card className="city-card bg-[#23242B] text-white rounded-xl shadow flex items-center justify-between p-4 hover:bg-[#2A2A2A] transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        {getWeatherIcon()}
        <div>
          <div className="text-xs text-gray-400 font-medium">{city.country}</div>
          <div className="text-lg font-bold leading-tight">{city.name}</div>
          <div className="text-xs text-gray-400">{city.condition.text}</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-2xl font-bold leading-none">{Math.round(city.temp_c)}<span className="text-base">°</span></div>
      </div>
    </Card>
  )
}
