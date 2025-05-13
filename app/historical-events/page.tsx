"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react"

export default function HistoricalEvents() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181A20] via-[#20222A] to-[#23272F] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#4FC3F7] mb-4 tracking-tight drop-shadow-lg">Historical Events</h1>
        <a href="/disaster-preparedness#historical" className="inline-block mb-8">
          <button className="bg-[#4FC3F7] hover:bg-[#1976D2] text-white font-semibold px-6 py-2 rounded-full shadow transition-colors duration-300">
            See More Historical Events in Disaster Preparedness
          </button>
        </a>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Hurricane Katrina */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-1 hover:shadow-xl transition-transform transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Hurricane Katrina
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">August 23-31, 2005</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Location</span>
                </div>
                <p>Gulf Coast, United States</p>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Impact</span>
                </div>
                <ul className="space-y-2 list-disc pl-5">
                  <li>1,833 fatalities</li>
                  <li>1.2 million displaced</li>
                  <li>80% of New Orleans flooded</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-white">Economic Impact</span>
                </div>
                <p>$125 billion in damages</p>
              </div>
            </CardContent>
          </Card>

          {/* Indian Ocean Tsunami */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-1 hover:shadow-xl transition-transform transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Indian Ocean Tsunami
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">December 26, 2004</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Location</span>
                </div>
                <p>Indian Ocean Basin</p>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Impact</span>
                </div>
                <ul className="space-y-2 list-disc pl-5">
                  <li>227,898 fatalities</li>
                  <li>14 countries affected</li>
                  <li>1.7 million displaced</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-white">Economic Impact</span>
                </div>
                <p>$10 billion in damages</p>
              </div>
            </CardContent>
          </Card>

          {/* Japan Earthquake & Tsunami */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-1 hover:shadow-xl transition-transform transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Japan Earthquake & Tsunami
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">March 11, 2011</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Location</span>
                </div>
                <p>Tohoku, Japan</p>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Impact</span>
                </div>
                <ul className="space-y-2 list-disc pl-5">
                  <li>15,899 fatalities</li>
                  <li>2,526 missing</li>
                  <li>Fukushima nuclear disaster</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-white">Economic Impact</span>
                </div>
                <p>$360 billion in damages</p>
              </div>
            </CardContent>
          </Card>

          {/* California Wildfires */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-1 hover:shadow-xl transition-transform transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                California Wildfires
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">2017-2020</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Location</span>
                </div>
                <p>California, United States</p>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Impact</span>
                </div>
                <ul className="space-y-2 list-disc pl-5">
                  <li>100+ fatalities</li>
                  <li>10,000+ structures destroyed</li>
                  <li>4.2 million acres burned</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-white">Economic Impact</span>
                </div>
                <p>$148.5 billion in damages</p>
              </div>
            </CardContent>
          </Card>

          {/* Australian Bushfires */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-1 hover:shadow-xl transition-transform transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Australian Bushfires
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">2019-2020</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Location</span>
                </div>
                <p>Australia</p>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Impact</span>
                </div>
                <ul className="space-y-2 list-disc pl-5">
                  <li>34 fatalities</li>
                  <li>3 billion animals affected</li>
                  <li>46 million acres burned</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-white">Economic Impact</span>
                </div>
                <p>$103 billion in damages</p>
              </div>
            </CardContent>
          </Card>

          {/* Pakistan Floods */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-1 hover:shadow-xl transition-transform transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Pakistan Floods
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">2022</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Location</span>
                </div>
                <p>Pakistan</p>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Impact</span>
                </div>
                <ul className="space-y-2 list-disc pl-5">
                  <li>1,739 fatalities</li>
                  <li>33 million affected</li>
                  <li>1/3 of country underwater</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-white">Economic Impact</span>
                </div>
                <p>$30 billion in damages</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 