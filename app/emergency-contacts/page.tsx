"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Globe, Clock, Building2, Shield, Heart } from "lucide-react"

export default function EmergencyContacts() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181A20] via-[#20222A] to-[#23272F] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#4FC3F7] mb-10 tracking-tight drop-shadow-lg">Emergency Contacts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Emergency Services */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Shield className="h-5 w-5 text-red-500" />
                Emergency Services
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Immediate emergency response contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-white">Emergency (Police/Fire/Ambulance)</span>
                </div>
                <p className="text-2xl font-bold text-red-500">911</p>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Poison Control</span>
                </div>
                <p className="text-2xl font-bold text-blue-500">1-800-222-1222</p>
              </div>
            </CardContent>
          </Card>

          {/* Local Emergency Management */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Building2 className="h-5 w-5 text-blue-500" />
                Local Emergency Management
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Local emergency response and management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Local Emergency Management Office</span>
                </div>
                <p className="text-lg">Contact your local office for specific information</p>
                <div className="mt-2 flex items-center gap-2 text-[#A0AEC0]">
                  <MapPin className="h-4 w-4" />
                  <span>Find your local office</span>
                </div>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">FEMA</span>
                </div>
                <p className="text-lg">Federal Emergency Management Agency</p>
                <p className="text-2xl font-bold text-blue-500">1-800-621-3362</p>
              </div>
            </CardContent>
          </Card>

          {/* Medical Emergency */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Heart className="h-5 w-5 text-red-500" />
                Medical Emergency
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Medical emergency and health services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-white">Nearest Hospital</span>
                </div>
                <p className="text-lg">Contact your local hospital for emergency services</p>
                <div className="mt-2 flex items-center gap-2 text-[#A0AEC0]">
                  <MapPin className="h-4 w-4" />
                  <span>Find nearest hospital</span>
                </div>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span className="font-semibold text-white">Mental Health Crisis</span>
                </div>
                <p className="text-2xl font-bold text-red-500">988</p>
                <p className="text-sm text-[#A0AEC0]">24/7 Crisis Support</p>
              </div>
            </CardContent>
          </Card>

          {/* Weather Emergency */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Clock className="h-5 w-5 text-yellow-500" />
                Weather Emergency
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Weather-related emergency contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-white">National Weather Service</span>
                </div>
                <p className="text-lg">Weather alerts and warnings</p>
                <div className="mt-2 flex items-center gap-2 text-[#A0AEC0]">
                  <Globe className="h-4 w-4" />
                  <span>weather.gov</span>
                </div>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-white">NOAA Weather Radio</span>
                </div>
                <p className="text-lg">24/7 Weather Information</p>
                <p className="text-sm text-[#A0AEC0]">Find your local station</p>
              </div>
            </CardContent>
          </Card>

          {/* Utility Emergency */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Building2 className="h-5 w-5 text-blue-500" />
                Utility Emergency
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Utility emergency contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Gas Emergency</span>
                </div>
                <p className="text-lg">Contact your local gas company</p>
                <div className="mt-2 flex items-center gap-2 text-[#A0AEC0]">
                  <MapPin className="h-4 w-4" />
                  <span>Find your gas company</span>
                </div>
              </div>
              
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-white">Power Outage</span>
                </div>
                <p className="text-lg">Contact your local power company</p>
                <div className="mt-2 flex items-center gap-2 text-[#A0AEC0]">
                  <MapPin className="h-4 w-4" />
                  <span>Find your power company</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Contacts */}
          <Card className="bg-[#23272F] border border-[#31343C] hover:border-[#4FC3F7] hover:-translate-y-0.5 hover:shadow-lg transition-transform transition-shadow duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Phone className="h-5 w-5 text-green-500" />
                Save These Contacts
              </CardTitle>
              <CardDescription className="text-[#A0AEC0]">Download or print emergency contacts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-[#E3E8F0]">
              <div className="p-4 bg-[#2A2D35] rounded-lg">
                <p className="text-lg mb-4">Keep these emergency contacts readily available:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Save in your phone contacts</li>
                  <li>Print and keep in your emergency kit</li>
                  <li>Share with family members</li>
                  <li>Post in a visible location at home</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 