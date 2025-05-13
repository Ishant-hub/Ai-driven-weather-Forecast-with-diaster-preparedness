"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Plus, Minus, Layers } from "lucide-react"
import dynamic from "next/dynamic"
import { createMarkerIcon } from "@/utils/markerIcons"

interface WeatherMapProps {
  location: [number, number]
  temperature?: number
  searchResults?: Array<{
    name: string
    lat: number
    lon: number
    temp_c: number
  }>
}

interface LocationMarker {
  location: [number, number]
  temperature: number
  name: string
}

// Extend the Map type to include our custom layers
interface WeatherMap extends L.Map {
  temperatureLayer?: L.Rectangle
  precipitationLayer?: L.Rectangle
  windLayer?: L.Rectangle
}

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

// Create a client-side only component
const WeatherMap = ({ location, temperature = 20, searchResults = [] }: WeatherMapProps) => {
  const mapRef = useRef<WeatherMap | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [activeLayer, setActiveLayer] = useState<string>("temperature")
  const [showLayerControl, setShowLayerControl] = useState(false)
  const [markers, setMarkers] = useState<L.Marker[]>([])
  const [locationMarkers, setLocationMarkers] = useState<LocationMarker[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0])

  // Update markers when search results change
  useEffect(() => {
    if (searchResults.length > 0) {
      console.log("Search results received:", searchResults)
      const newMarkers = searchResults.map(result => ({
        location: [result.lat, result.lon] as [number, number],
        temperature: result.temp_c,
        name: result.name
      }))
      setLocationMarkers(newMarkers)
    }
  }, [searchResults])

  // Initialize Leaflet only on client-side
  useEffect(() => {
    let mapInstance: WeatherMap | null = null

    const initMap = async () => {
      if (!mapContainerRef.current) return

      try {
        // Clean up existing map if it exists
        if (mapRef.current) {
          mapRef.current.remove()
          mapRef.current = null
        }

        // Initialize the map with a wider view
        mapInstance = L.map(mapContainerRef.current, {
          center: [20, 0],
          zoom: 2,
          zoomControl: false, // Disable default zoom control
          attributionControl: false // Disable default attribution control
        }) as WeatherMap

        // Add attribution control separately
        L.control.attribution({
          position: 'bottomright'
        }).addTo(mapInstance)

        mapRef.current = mapInstance

        // Add the tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapInstance)

        // Wait for the map to be ready
        await new Promise(resolve => setTimeout(resolve, 100))

          setMapLoaded(true)
      } catch (error) {
        console.error("Error initializing map:", error)
      }
    }

    initMap()

    // Cleanup function
    return () => {
      markers.forEach(marker => marker.remove())
      if (mapInstance) {
        mapInstance.remove()
      }
      mapRef.current = null
      setMarkers([])
      setMapLoaded(false)
    }
  }, [])

  // Update markers when locationMarkers change
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || locationMarkers.length === 0) return

    try {
      // Remove existing markers
      markers.forEach(marker => marker.remove())
      setMarkers([])

      // Add new markers
      const newMarkers = locationMarkers.map(loc => {
        console.log("Adding marker for:", loc)
        const marker = L.marker([loc.location[0], loc.location[1]], {
          icon: createMarkerIcon(loc.temperature)
        })
          .bindPopup(`${loc.name}: ${loc.temperature}°C`)
          .addTo(mapRef.current as L.Map)
        return marker
      })
      setMarkers(newMarkers)

      // Fit map bounds to show all markers
      const bounds = L.latLngBounds(locationMarkers.map(loc => [loc.location[0], loc.location[1]]))
      mapRef.current.fitBounds(bounds, { padding: [50, 50] })
    } catch (error) {
      console.error("Error updating markers:", error)
    }
  }, [locationMarkers, mapLoaded])

  const addWeatherLayers = (L: any, mapInstance: WeatherMap) => {
    // Create simple colored overlays instead of actual weather data
    // This avoids the need for API keys

    // Temperature layer (simulated with a colored overlay)
    const temperatureLayer = L.rectangle(
      [
        [-90, -180],
        [90, 180],
      ],
      {
        color: "transparent",
        fillColor: "#FF4500",
        fillOpacity: 0.2,
      },
    )

    // Precipitation layer (simulated with a colored overlay)
    const precipitationLayer = L.rectangle(
      [
        [-90, -180],
        [90, 180],
      ],
      {
        color: "transparent",
        fillColor: "#0000FF",
        fillOpacity: 0.2,
      },
    )

    // Wind layer (simulated with a colored overlay)
    const windLayer = L.rectangle(
      [
        [-90, -180],
        [90, 180],
      ],
      {
        color: "transparent",
        fillColor: "#00FF00",
        fillOpacity: 0.2,
      },
    )

    // Add the default layer
    if (activeLayer === "temperature") {
      temperatureLayer.addTo(mapInstance)
    } else if (activeLayer === "precipitation") {
      precipitationLayer.addTo(mapInstance)
    } else if (activeLayer === "wind") {
      windLayer.addTo(mapInstance)
    }

    // Store layers for later use
    mapInstance.temperatureLayer = temperatureLayer
    mapInstance.precipitationLayer = precipitationLayer
    mapInstance.windLayer = windLayer
  }

  const changeLayer = (layer: string) => {
    if (!mapRef.current || !mapLoaded) return

    setActiveLayer(layer)

    // Remove all layers first
    if (mapRef.current.temperatureLayer) mapRef.current.removeLayer(mapRef.current.temperatureLayer)
    if (mapRef.current.precipitationLayer) mapRef.current.removeLayer(mapRef.current.precipitationLayer)
    if (mapRef.current.windLayer) mapRef.current.removeLayer(mapRef.current.windLayer)

    // Add the selected layer
    if (layer === "temperature" && mapRef.current.temperatureLayer) {
      mapRef.current.temperatureLayer.addTo(mapRef.current)
    } else if (layer === "precipitation" && mapRef.current.precipitationLayer) {
      mapRef.current.precipitationLayer.addTo(mapRef.current)
    } else if (layer === "wind" && mapRef.current.windLayer) {
      mapRef.current.windLayer.addTo(mapRef.current)
    }

    setShowLayerControl(false)
  }

  const handleZoom = (zoomIn: boolean) => {
    if (!mapRef.current || !mapLoaded) return
    try {
      if (zoomIn) {
        mapRef.current.zoomIn()
      } else {
        mapRef.current.zoomOut()
      }
    } catch (error) {
      console.error("Error zooming map:", error)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0]
        const newCenter: [number, number] = [parseFloat(lat), parseFloat(lon)]
        setMapCenter(newCenter)
        setLocationMarkers([{ location: newCenter, temperature: 20, name: display_name }])
      }
    } catch (error) {
      console.error("Error searching location:", error)
    }
  }

  return (
    <Card className="w-full h-[600px] relative bg-[#181A20]">
      <div className="absolute top-4 left-4 z-[1000] w-64">
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location..."
            className="bg-white/90 backdrop-blur-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} className="bg-red-600 hover:bg-red-700">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={mapCenter} zoom={13} />
        {locationMarkers.map((marker, index) => (
          <Marker key={index} position={marker.location} icon={icon}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map controls */}
      <div className="absolute right-4 bottom-4 flex flex-col space-y-2 z-[400]">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-[#3A3A3A] border-0"
          onClick={() => handleZoom(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-[#3A3A3A] border-0"
          onClick={() => handleZoom(false)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-[#3A3A3A] border-0"
          onClick={() => setShowLayerControl(!showLayerControl)}
        >
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Layer control */}
      {showLayerControl && (
        <div className="absolute right-16 bottom-4 bg-[#3A3A3A] rounded-lg p-2 space-y-1 z-[400]">
          <Button
            variant={activeLayer === "temperature" ? "default" : "ghost"}
            size="sm"
            className="w-full text-xs justify-start"
            onClick={() => changeLayer("temperature")}
          >
            Temperature
          </Button>
          <Button
            variant={activeLayer === "precipitation" ? "default" : "ghost"}
            size="sm"
            className="w-full text-xs justify-start"
            onClick={() => changeLayer("precipitation")}
          >
            Precipitation
          </Button>
          <Button
            variant={activeLayer === "wind" ? "default" : "ghost"}
            size="sm"
            className="w-full text-xs justify-start"
            onClick={() => changeLayer("wind")}
          >
            Wind
          </Button>
        </div>
      )}

      {/* Map info card - modern overlay */}
      <Card className="absolute left-6 bottom-6 p-4 bg-[#23242B] border-0 text-white w-56 rounded-xl shadow-lg z-[400] flex flex-col items-start">
        <img src="/weather-satellite.jpg" alt="Satellite" className="rounded-lg mb-2 w-24 h-16 object-cover" />
        <span className="text-white text-sm mb-2 font-semibold">Explore global map of wind, weather and oceans condition.</span>
        <Button className="bg-[#4FC3F7] text-black rounded-full px-4 py-1 text-xs font-semibold hover:bg-[#81d4fa] transition-all mt-1">Get started</Button>
      </Card>
    </Card>
  )
}

// Export as a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(WeatherMap), {
  ssr: false,
})
