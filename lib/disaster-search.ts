import disasterData from "@/data/india-disasters.json"

export interface DisasterEvent {
  id: string
  location: string
  date: string
  disasterType: string
  description: string
}

export function searchDisasters(query: string): DisasterEvent[] {
  if (!query || query.trim().length < 3) return []

  const normalizedQuery = query.toLowerCase().trim()

  return disasterData.disasters.filter((disaster: DisasterEvent) => {
    return (
      disaster.location.toLowerCase().includes(normalizedQuery) ||
      disaster.date.toLowerCase().includes(normalizedQuery) ||
      disaster.disasterType.toLowerCase().includes(normalizedQuery) ||
      disaster.description.toLowerCase().includes(normalizedQuery) ||
      disaster.id.toLowerCase().includes(normalizedQuery)
    )
  })
}

export function getDisasterById(id: string): DisasterEvent | undefined {
  return disasterData.disasters.find((disaster: DisasterEvent) => disaster.id === id)
}

export function getDisastersByLocation(location: string): DisasterEvent[] {
  const normalizedLocation = location.toLowerCase().trim()
  return disasterData.disasters.filter((disaster: DisasterEvent) =>
    disaster.location.toLowerCase().includes(normalizedLocation),
  )
}

export function getDisastersByType(type: string): DisasterEvent[] {
  const normalizedType = type.toLowerCase().trim()
  return disasterData.disasters.filter((disaster: DisasterEvent) =>
    disaster.disasterType.toLowerCase().includes(normalizedType),
  )
}

export function getAllDisasterTypes(): string[] {
  const types = new Set<string>()
  disasterData.disasters.forEach((disaster: DisasterEvent) => {
    types.add(disaster.disasterType)
  })
  return Array.from(types)
}

export function getAllLocations(): string[] {
  const locations = new Set<string>()
  disasterData.disasters.forEach((disaster: DisasterEvent) => {
    locations.add(disaster.location.split(",")[0].trim())
  })
  return Array.from(locations)
}
