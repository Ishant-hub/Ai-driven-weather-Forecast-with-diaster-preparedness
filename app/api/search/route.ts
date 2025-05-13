import { NextResponse } from "next/server"
import { searchLocations } from "@/lib/actions"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  if (!query || query.length < 3) {
    return NextResponse.json([])
  }

  try {
    const locations = await searchLocations(query)
    return NextResponse.json(locations)
  } catch (error) {
    console.error("Error in search API route:", error)
    return NextResponse.json({ error: "Failed to search locations" }, { status: 500 })
  }
}
