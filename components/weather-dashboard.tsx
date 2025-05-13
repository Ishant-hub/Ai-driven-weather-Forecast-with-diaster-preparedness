"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, Bell, Settings, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import dynamic from "next/dynamic"
import RainChart from "@/components/rain-chart"
import CityWeather from "@/components/city-weather"
import AIAssistant from "@/components/ai-assistant"
import WeatherAlerts from "@/components/weather-alerts"
import { getWeatherData, getPopularCitiesWeather, getWeatherAlerts, searchLocations } from "@/lib/actions"
import type { WeatherData, CityWeatherData, WeatherAlert } from "@/lib/types"
import { formatDate, formatTime } from "@/lib/utils"
import Link from "next/link"

// Import WeatherMap with SSR disabled
const WeatherMap = dynamic(() => import("@/components/weather-map"), {
  ssr: false,
  loading: () => (
    <div className="h-80 bg-[#2A2A2A] rounded-xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  ),
})

// Add AQI label helper (no color)
function getAQIInfo(aqi: number) {
  if (aqi <= 1) return { label: "Good" };
  if (aqi === 2) return { label: "Moderate" };
  if (aqi === 3) return { label: "Unhealthy (SG)" };
  if (aqi === 4) return { label: "Unhealthy" };
  if (aqi === 5) return { label: "Very Unhealthy" };
  if (aqi >= 6) return { label: "Hazardous" };
  return { label: "Unknown" };
}

export default function WeatherDashboard() {
  const [currentTab, setCurrentTab] = useState("next7days")
  const [viewMode, setViewMode] = useState("forecast")
  const [location, setLocation] = useState("London")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [citiesData, setCitiesData] = useState<CityWeatherData[]>([])
  const [alerts, setAlerts] = useState<WeatherAlert[]>([])
  const [showAIChat, setShowAIChat] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const [geolocationError, setGeolocationError] = useState<string | null>(null)
  const [defaultLocationUsed, setDefaultLocationUsed] = useState(false)

  // Define useDefaultLocation with useCallback to prevent unnecessary re-renders
  const useDefaultLocation = useCallback(() => {
    console.log(`Using default location: ${geolocationError || "No geolocation"}`)
    // Use a default location instead
    setLocation("London")
    setDefaultLocationUsed(true)
    toast({
      title: "Using default location",
      description: geolocationError || "Geolocation unavailable. You can search for your city.",
    })
  }, [toast, geolocationError])

  // Fetch weather data for the selected location
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const data = await getWeatherData(location)
        setWeatherData(data)

        const alertsData = await getWeatherAlerts(location)
        setAlerts(alertsData)

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching weather data:", error)
        toast({
          title: "Error",
          description: "Failed to load weather data. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchData()
  }, [location, toast])

  // Fetch popular cities weather data
  useEffect(() => {
    async function fetchCitiesData() {
      try {
        const data = await getPopularCitiesWeather()
        setCitiesData(data)
      } catch (error) {
        console.error("Error fetching cities data:", error)
      }
    }

    fetchCitiesData()
  }, [])

  // Handle location search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        const results = await searchLocations(searchQuery)
        setSearchResults(results)
      } else {
        setSearchResults([])
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  // Try to get user's location on initial load with better error handling
  useEffect(() => {
    // Check if we're in a secure context
    const isSecureContext = window.isSecureContext;
    
    if (!isSecureContext) {
      console.log("Not in a secure context, using default location");
      setGeolocationError("Geolocation requires a secure context (HTTPS)");
      useDefaultLocation();
      return;
    }

    // Only try geolocation if it's available and we're not in an iframe
    const isInIframe = window.self !== window.top;

    if (navigator.geolocation && !isInIframe) {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude},${longitude}`);
            toast({
              title: "Location detected",
              description: "Using your current location for weather data",
            });
          },
          (error) => {
            console.error("Geolocation error:", error.message);
            setGeolocationError(`Error: ${error.message}`);
            useDefaultLocation();
          },
          {
            timeout: 10000, // Increased timeout to 10 seconds
            maximumAge: 60000,
            enableHighAccuracy: false,
          },
        );
      } catch (error) {
        console.error("Geolocation exception:", error);
        setGeolocationError("Exception occurred");
        useDefaultLocation();
      }
    } else {
      setGeolocationError("Geolocation not supported or in iframe");
      useDefaultLocation();
    }
  }, [useDefaultLocation]);

  const handleLocationSelect = (loc: string) => {
    setLocation(loc)
    setSearchQuery("")
    setSearchResults([])
  }

  if (isLoading || !weatherData) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="rounded-3xl bg-[#1E1E1E] p-6 shadow-xl">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    )
  }

  const currentWeather = weatherData.current
  const forecast = weatherData.forecast.forecastday
  const currentLocation = weatherData.location
  // --- RainChart Data: Use all 24 hours for today (real-time) ---
  const rainChanceData = forecast[0].hour.map(hour => ({
    time: new Date(hour.time).getHours().toString().padStart(2, '0') + ':00',
    chance: hour.chance_of_rain,
  }))

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="rounded-3xl bg-[#181A20] p-8 shadow-2xl">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          {/* Left: Menu/Location/Disaster */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full bg-[#2A2A2A] border-0 hover:bg-[#23242B] transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-[#2A2A2A] border-0 hover:bg-[#23242B] transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <div className="flex items-center gap-2 bg-[#2A2A2A] rounded-full px-4 py-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-base font-semibold text-[#B3B8C5]">{`${currentLocation.name}, ${currentLocation.country}`}</span>
            </div>
            <Link href="/disaster-preparedness">
              <Button variant="outline" className="rounded-full bg-[#2A2A2A] border-0 flex items-center gap-2 hover:bg-[#23242B] transition-all">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-semibold">Disaster Preparedness</span>
              </Button>
            </Link>
          </div>
          {/* Center: Search */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <Input
                className="pl-10 pr-4 py-2 w-full bg-[#23242B] border-0 rounded-full text-base text-white shadow focus:ring-2 focus:ring-[#4FC3F7]"
                placeholder="Search city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search city"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-[#23242B] rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-[#3A3A3A] cursor-pointer text-base"
                      onClick={() => handleLocationSelect(`${result.name}, ${result.country}`)}
                    >
                      {result.name}, {result.country}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Right: Settings, Alerts, Avatar */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full bg-[#2A2A2A] border-0 hover:bg-[#23242B] transition-all">
              <Settings className="h-5 w-5 text-gray-300" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-[#2A2A2A] border-0 relative hover:bg-[#23242B] transition-all">
                  <Bell className="h-5 w-5 text-gray-300" />
                  {alerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs">
                      {alerts.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 bg-[#2A2A2A] border-[#3A3A3A]">
                <div className="p-3 border-b border-[#3A3A3A]">
                  <h3 className="font-medium">Weather Alerts</h3>
                </div>
                <div className="max-h-60 overflow-auto">
                  {alerts.length > 0 ? (
                    <WeatherAlerts alerts={alerts} />
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-400">No active alerts</div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <Avatar className="h-11 w-11 border-2 border-[#4FC3F7] shadow">
              <AvatarImage src="/placeholder.svg?height=44&width=44" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Disaster Preparedness Banner */}
        {alerts.length > 0 && (
          <div className="mb-6 p-4 bg-[#F87171]/20 border border-[#F87171] rounded-2xl flex items-center justify-between shadow-lg gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-7 w-7 text-[#F87171]" />
              <div>
                <h3 className="font-bold text-lg text-[#F3F4F6] mb-1">Weather Alert Active</h3>
                <p className="text-sm text-[#F87171]">Check disaster preparedness information for your safety</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/disaster-preparedness">
                <Button className="bg-[#F87171] hover:bg-[#F87171]/80 text-white rounded-full font-semibold px-5 py-2 transition-all shadow">View Safety Information</Button>
              </Link>
              {/* Modern close button (optional, if you want to allow dismiss) */}
              {/* <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-700/30 transition-all">
                <span className="sr-only">Dismiss</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </Button> */}
            </div>
          </div>
        )}

        {/* Main Content Grid: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left/Main Column (spans 2 columns on large screens) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Tabs: Today, Tomorrow, Next 7 Days, Forecast Cards */}
            <div className="mb-0">
              <Tabs defaultValue="next7days" onValueChange={setCurrentTab}>
                <TabsList className="bg-transparent space-x-4">
                  <TabsTrigger
                    value="today"
                    className={`text-sm font-medium px-4 py-2 rounded-md transition-all ${currentTab === "today" ? "tab-active text-[#4FC3F7]" : "text-[#B3B8C5]"}`}
                  >
                    Today
                  </TabsTrigger>
                  <TabsTrigger
                    value="tomorrow"
                    className={`text-sm font-medium px-4 py-2 rounded-md transition-all ${currentTab === "tomorrow" ? "tab-active text-[#4FC3F7]" : "text-[#B3B8C5]"}`}
                  >
                    Tomorrow
                  </TabsTrigger>
                  <TabsTrigger
                    value="next7days"
                    className={`text-sm font-medium px-4 py-2 rounded-md transition-all ${currentTab === "next7days" ? "tab-active text-[#4FC3F7]" : "text-[#B3B8C5]"}`}
                  >
                    Next 7 days
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="today" className="mt-0">
                  {/* Today's content - modern card */}
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <Card className="weather-card bg-[#4FC3F7] text-black p-6 rounded-2xl shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-8">
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex flex-col items-start text-left gap-2">
                          <div className="text-lg font-semibold text-[#f8fafc]">Today</div>
                          <div className="text-sm text-[#B3B8C5]">{formatDate(new Date(currentLocation.localtime))}</div>
                          <span className="text-sm text-white font-bold">{(() => { const aqi = Math.round(currentWeather.air_quality?.["us-epa-index"] || 0); const { label } = getAQIInfo(aqi); return `AQI ${aqi} - ${label}`; })()}</span>
                          <span className="text-6xl font-extrabold text-[#3b82f6]">{Math.round(currentWeather.temp_c)}<span className="text-3xl">°C</span></span>
                          <span className="text-xl font-semibold text-[#22c55e]">{currentWeather.condition.text}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-[#f8fafc]">Real Feel</div>
                            <div className="text-lg font-bold text-white">{Math.round(currentWeather.feelslike_c)}°C</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-[#f8fafc]">Wind</div>
                            <div className="text-lg font-bold text-[#4FC3F7]">{currentWeather.wind_kph} km/h</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-[#f8fafc]">Pressure</div>
                            <div className="text-lg font-bold text-[#FF6B6B]">{currentWeather.pressure_mb} hPa</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-[#f8fafc]">Humidity</div>
                            <div className="text-lg font-bold text-[#81D4FA]">{currentWeather.humidity}%</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <img
                          src={`https:${currentWeather.condition.icon}`}
                          alt={currentWeather.condition.text}
                          className="w-40 h-40 drop-shadow-xl"
                        />
                        <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-[#f8fafc]">Sunrise</div>
                            <div className="text-lg font-bold text-[#FFD700]">{forecast[0].astro.sunrise}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-[#f8fafc]">Sunset</div>
                            <div className="text-lg font-bold text-[#FFA500]">{forecast[0].astro.sunset}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="tomorrow" className="mt-0">
                  {/* Tomorrow's content */}
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <Card className="weather-card bg-[#C3E7FC] text-black p-4 relative overflow-hidden rounded-2xl shadow-xl">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 flex flex-col items-start text-left gap-2">
                          <div className="text-lg font-medium text-[#f8fafc]">Tomorrow</div>
                          <div className="text-sm text-[#B3B8C5]">{formatDate(new Date(forecast[1].date))}</div>
                          <span className="text-sm text-white font-bold">{(() => { const aqi = Math.round(forecast[1].day.air_quality?.["us-epa-index"] || 0); const { label } = getAQIInfo(aqi); return `AQI ${aqi} - ${label}`; })()}</span>
                          <span className="text-5xl font-bold text-[#3b82f6]">{Math.round(forecast[1].day.avgtemp_c)}<span className="text-2xl">°C</span></span>
                          <span className="text-lg text-[#22c55e]">{forecast[1].day.condition.text}</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center">
                          <img
                            src={`https:${forecast[1].day.condition.icon}`}
                            alt={forecast[1].day.condition.text}
                            className="w-32 h-32"
                          />
                          <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-[#f8fafc]">Sunrise</div>
                              <div className="text-lg text-[#FFD700]">{forecast[1].astro.sunrise}</div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-[#f8fafc]">Sunset</div>
                              <div className="text-lg text-[#FFA500]">{forecast[1].astro.sunset}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="next7days" className="mt-0">
                  {/* Forecast row - modern cards */}
                  <div className="grid grid-cols-7 gap-4 mt-4">
                    {/* Today's Weather Card (small) */}
                    <Card className="col-span-1 weather-card bg-[#4FC3F7] text-black p-4 rounded-2xl shadow flex flex-col items-center justify-between relative overflow-hidden">
                      <div className="text-sm font-semibold mb-1">{formatDate(new Date(forecast[0].date))}</div>
                      <div className="text-xs text-[#B3B8C5] mb-2">{formatTime(new Date(currentLocation.localtime))}</div>
                      <div className="text-3xl font-extrabold mb-2 flex items-start text-[#3b82f6]">
                        {Math.round(currentWeather.temp_c)}
                        <span className="text-lg">°</span>
                      </div>
                      <img
                        src={`https:${currentWeather.condition.icon}`}
                        alt={currentWeather.condition.text}
                        className="h-10 w-10 mb-2"
                      />
                      {/* Air Quality Info */}
                      {currentWeather?.air_quality && (() => {
                        const aqi = Math.round(currentWeather.air_quality?.["us-epa-index"] || 0);
                        const { label: forecastAQILabel } = getAQIInfo(aqi);
                        return (
                          <div className="mt-1 flex items-center gap-1">
                            <span className="text-sm text-white font-bold">AQI {aqi} - {forecastAQILabel}</span>
                          </div>
                        );
                      })()}
                      <div className="mt-auto space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#f8fafc]">Real Feel</span>
                          <span className="text-white">{Math.round(currentWeather.feelslike_c)}°</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#f8fafc]">Wind</span>
                          <span className="text-[#4FC3F7]">{currentWeather.wind_kph} km/h</span>
                        </div>
                      </div>
                    </Card>
                    {/* 6-Day Forecast Cards */}
                    {forecast.slice(1).map((day, index) => (
                      <Card
                        key={index}
                        className="col-span-1 weather-card bg-[#181A20] text-white p-4 rounded-2xl shadow flex flex-col items-start justify-between text-left"
                      >
                        <div className="text-sm font-semibold mb-2">{formatDate(new Date(day.date)).split(",")[0]}</div>
                        <span className="text-sm text-white font-bold">{(() => { const aqi = Math.round(day.day.air_quality?.["us-epa-index"] || 0); const { label } = getAQIInfo(aqi); return `AQI ${aqi} - ${label}`; })()}</span>
                        <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} className="h-10 w-10 mb-2" />
                        <div className="text-2xl font-bold mt-2 flex items-start text-[#3b82f6]">{Math.round(day.day.avgtemp_c)}<span className="text-base">°</span></div>
                        <div className="text-xs text-[#22c55e] mt-1">{day.day.condition.text}</div>
                        <div className="mt-auto space-y-1 text-xs w-full">
                          <div className="flex justify-between">
                            <span className="text-[#f8fafc]">Real Feel</span>
                            <span className="text-white">{Math.round(day.day.avgtemp_c)}°</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#f8fafc]">Wind</span>
                            <span className="text-[#4FC3F7]">{currentWeather.wind_kph} km/h</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            {/* Global Map Section */}
            <div className="rounded-2xl bg-[#181A20] p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white">Global map</h2>
                <Button variant="outline" size="sm" className="rounded-full text-xs font-semibold hover:bg-[#23242B] transition-all">
                  View wide
                </Button>
              </div>
              <WeatherMap location={[currentLocation.lat, currentLocation.lon]} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-8 bg-[#20222A] rounded-2xl p-6 shadow-xl">
            {/* Chance of Rain Section */}
            <div>
              <div className="flex items-center mb-2">
                <div className="text-lg font-semibold text-white">Chance of rain</div>
              </div>
              <Card className="bg-[#23242B] p-4 mt-2 rounded-xl shadow-md">
                <RainChart data={rainChanceData} />
              </Card>
            </div>
            {/* Other Large Cities Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#F3F4F6]">Other large cities</h2>
                <Button variant="outline" size="sm" className="rounded-full text-xs font-semibold bg-[#23242B] text-[#B3B8C5] hover:bg-[#313244] transition-all">
                  Show all
                </Button>
              </div>
              <div className="space-y-4">
                {citiesData.map((city, index) => (
                  <div key={index} className="city-card bg-[#23242B] text-[#F3F4F6] rounded-xl shadow hover:bg-[#313244] transition-all cursor-pointer">
                    <CityWeather city={city} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Button */}
        <button className="ai-button" onClick={() => setShowAIChat(!showAIChat)} aria-label="AI Weather Assistant">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* AI Assistant Chat */}
        {showAIChat && <AIAssistant onClose={() => setShowAIChat(false)} location={currentLocation.name} />}
      </div>
    </div>
  )
}
