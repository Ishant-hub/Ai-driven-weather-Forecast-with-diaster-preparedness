import { Suspense } from "react"
import WeatherDashboard from "@/components/weather-dashboard"
import LoadingDashboard from "@/components/loading-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Suspense fallback={<LoadingDashboard />}>
        <WeatherDashboard />
      </Suspense>
    </main>
  )
}
