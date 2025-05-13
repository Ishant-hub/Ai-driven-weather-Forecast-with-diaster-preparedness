import { NextResponse } from "next/server"
import { getWeatherAlerts } from "@/lib/actions"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location") || "London"

  try {
    const alertsData = await getWeatherAlerts(location)
    return NextResponse.json({ alerts: alertsData })
  } catch (error) {
    console.error("Error in alerts API route:", error)
    return NextResponse.json({ error: "Failed to fetch alerts data" }, { status: 500 })
  }
}
