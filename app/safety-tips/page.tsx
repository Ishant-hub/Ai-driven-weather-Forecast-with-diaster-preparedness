"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Droplets, Wind, Flame, CloudSnow, ThermometerSun, CloudLightning, Waves } from "lucide-react"

export default function SafetyTips() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181A20] via-[#20222A] to-[#23272F] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#4FC3F7] mb-10 tracking-tight drop-shadow-lg">Safety Tips</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Flood Safety */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Droplets className="h-5 w-5 text-blue-500" />
                Flood Safety
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Protect yourself during floods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">Before a Flood</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Know your area's flood risk</li>
                  <li>Keep gutters and drains clear</li>
                  <li>Have an emergency kit ready</li>
                  <li>Learn evacuation routes</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">During a Flood</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Move to higher ground</li>
                  <li>Never walk through flood waters</li>
                  <li>Stay informed with weather updates</li>
                  <li>Follow evacuation orders</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Hurricane Safety */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Wind className="h-5 w-5 text-cyan-500" />
                Hurricane Safety
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Stay safe during hurricanes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">Before a Hurricane</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Know your evacuation zone</li>
                  <li>Prepare emergency supplies</li>
                  <li>Secure outdoor items</li>
                  <li>Board up windows</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">During a Hurricane</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Stay indoors</li>
                  <li>Stay away from windows</li>
                  <li>Listen to weather updates</li>
                  <li>Follow evacuation orders</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Wildfire Safety */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Flame className="h-5 w-5 text-orange-500" />
                Wildfire Safety
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Protect yourself from wildfires</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">Before a Wildfire</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Create defensible space</li>
                  <li>Clear gutters and roofs</li>
                  <li>Have an evacuation plan</li>
                  <li>Prepare emergency supplies</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">During a Wildfire</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Evacuate if ordered</li>
                  <li>Wear protective clothing</li>
                  <li>Stay informed</li>
                  <li>Follow evacuation routes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Winter Storm Safety */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <CloudSnow className="h-5 w-5 text-indigo-500" />
                Winter Storm Safety
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Stay safe during winter storms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">Before a Winter Storm</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Prepare your home</li>
                  <li>Stock emergency supplies</li>
                  <li>Winterize your vehicle</li>
                  <li>Have backup power sources</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">During a Winter Storm</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Stay indoors</li>
                  <li>Keep warm</li>
                  <li>Conserve power</li>
                  <li>Check on neighbors</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Heat Wave Safety */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <ThermometerSun className="h-5 w-5 text-yellow-500" />
                Heat Wave Safety
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Stay safe during heat waves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">Before a Heat Wave</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Install air conditioning</li>
                  <li>Prepare cooling supplies</li>
                  <li>Know cooling centers</li>
                  <li>Have a power outage plan</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">During a Heat Wave</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Stay hydrated</li>
                  <li>Stay in air conditioning</li>
                  <li>Limit outdoor activities</li>
                  <li>Check on vulnerable people</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Thunderstorm Safety */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <CloudLightning className="h-5 w-5 text-purple-500" />
                Thunderstorm Safety
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Stay safe during thunderstorms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">Before a Thunderstorm</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Monitor weather forecasts</li>
                  <li>Secure outdoor items</li>
                  <li>Have emergency supplies</li>
                  <li>Know safe locations</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <h3 className="font-semibold text-white mb-2">During a Thunderstorm</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Stay indoors</li>
                  <li>Avoid electronics</li>
                  <li>Stay away from windows</li>
                  <li>Monitor weather updates</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 