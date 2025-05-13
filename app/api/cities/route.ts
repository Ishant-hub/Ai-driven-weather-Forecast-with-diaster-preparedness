import { NextResponse } from "next/server"
import { getPopularCitiesWeather } from "@/lib/actions"

export async function GET() {
  try {
    const citiesData = await getPopularCitiesWeather()
    return NextResponse.json(citiesData)
  } catch (error) {
    console.error("Error in cities API route:", error)
    return NextResponse.json({ error: "Failed to fetch cities data" }, { status: 500 })
  }
}
