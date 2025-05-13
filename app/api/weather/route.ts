import { NextResponse } from "next/server"
import { getWeatherData } from "@/lib/actions"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location") || "London"

  try {
    const weatherData = await getWeatherData(location)
    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Error in weather API route:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
