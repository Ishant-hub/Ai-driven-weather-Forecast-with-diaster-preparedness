"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  AlertTriangle,
  Droplets,
  Flame,
  Wind,
  CloudSnow,
  CloudLightning,
  ThermometerSun,
  Waves,
  Download,
  Share2,
  History,
  MessageSquareText,
  ArrowLeft,
} from "lucide-react"
import DisasterAIAssistant from "@/components/disaster-ai-assistant"
import { useRouter } from "next/navigation"

// Sample historical events data - Replace with API call in production
const historicalEvents = [
  // India Disasters (1900-2025)
  {
    id: 1,
    title: "Kangra Earthquake",
    country: "India",
    date: "April 4, 1905",
    type: "Earthquake",
    summary: "Magnitude 7.8 earthquake in Kangra, Himachal Pradesh. Killed over 19,000 people and destroyed thousands of buildings.",
    blogUrl: "https://en.wikipedia.org/wiki/1905_Kangra_earthquake"
  },
  {
    id: 2,
    title: "Bihar-Nepal Earthquake",
    country: "India",
    date: "January 15, 1934",
    type: "Earthquake",
    summary: "Magnitude 8.0 earthquake affecting Bihar and Nepal. Caused over 10,000 deaths in India and massive destruction.",
    blogUrl: "https://en.wikipedia.org/wiki/1934_Nepal%E2%80%93Bihar_earthquake"
  },
  {
    id: 3,
    title: "Bengal Famine",
    country: "India",
    date: "1943",
    type: "Famine",
    summary: "Devastating famine in Bengal during World War II. Estimated 2-3 million deaths due to starvation and disease.",
    blogUrl: "https://en.wikipedia.org/wiki/Bengal_famine_of_1943"
  },
  {
    id: 4,
    title: "Assam Earthquake",
    country: "India",
    date: "August 15, 1950",
    type: "Earthquake",
    summary: "Magnitude 8.6 earthquake in Assam. Caused massive landslides and flooding, affecting over 30 million people.",
    blogUrl: "https://en.wikipedia.org/wiki/1950_Assam%E2%80%93Tibet_earthquake"
  },
  {
    id: 5,
    title: "Koyna Earthquake",
    country: "India",
    date: "December 11, 1967",
    type: "Earthquake",
    summary: "Magnitude 6.6 earthquake in Maharashtra. Caused significant damage to the Koyna Dam and surrounding areas.",
    blogUrl: "https://en.wikipedia.org/wiki/1967_Koynanagar_earthquake"
  },
  {
    id: 6,
    title: "Bhola Cyclone",
    country: "India",
    date: "November 12, 1970",
    type: "Cyclone",
    summary: "Deadliest tropical cyclone ever recorded. Affected West Bengal and Bangladesh, causing over 500,000 deaths.",
    blogUrl: "https://en.wikipedia.org/wiki/1970_Bhola_cyclone"
  },
  {
    id: 7,
    title: "Morbi Dam Failure",
    country: "India",
    date: "August 11, 1979",
    type: "Flood",
    summary: "Dam failure in Gujarat causing massive flooding. Killed over 5,000 people and destroyed thousands of homes.",
    blogUrl: "https://en.wikipedia.org/wiki/Machchhu_dam_failure"
  },
  {
    id: 8,
    title: "Bhopal Gas Tragedy",
    country: "India",
    date: "December 3, 1984",
    type: "Industrial Disaster",
    summary: "World's worst industrial disaster. A gas leak at the Union Carbide plant killed over 15,000 people and affected 500,000 more.",
    blogUrl: "https://en.wikipedia.org/wiki/Bhopal_disaster"
  },
  {
    id: 9,
    title: "Latur Earthquake",
    country: "India",
    date: "September 30, 1993",
    type: "Earthquake",
    summary: "Magnitude 6.4 earthquake in Maharashtra. Killed over 9,000 people and destroyed 52 villages.",
    blogUrl: "https://en.wikipedia.org/wiki/1993_Latur_earthquake"
  },
  {
    id: 10,
    title: "Odisha Super Cyclone",
    country: "India",
    date: "October 29, 1999",
    type: "Cyclone",
    summary: "Category 5 cyclone that devastated Odisha. Killed over 10,000 people and caused massive destruction to infrastructure.",
    blogUrl: "https://en.wikipedia.org/wiki/1999_Odisha_cyclone"
  },
  {
    id: 11,
    title: "Gujarat Earthquake",
    country: "India",
    date: "January 26, 2001",
    type: "Earthquake",
    summary: "Magnitude 7.7 earthquake in Gujarat. Killed over 20,000 people and destroyed nearly 400,000 homes.",
    blogUrl: "https://en.wikipedia.org/wiki/2001_Gujarat_earthquake"
  },
  {
    id: 12,
    title: "Indian Ocean Tsunami",
    country: "India",
    date: "December 26, 2004",
    type: "Tsunami",
    summary: "Devastating tsunami affecting coastal areas. Killed over 10,000 people in India and caused massive destruction.",
    blogUrl: "https://en.wikipedia.org/wiki/2004_Indian_Ocean_earthquake_and_tsunami"
  },
  {
    id: 13,
    title: "Mumbai Floods",
    country: "India",
    date: "July 26, 2005",
    type: "Flood",
    summary: "Heavy rainfall caused massive flooding in Mumbai. Killed over 1,000 people and caused extensive damage.",
    blogUrl: "https://en.wikipedia.org/wiki/2005_Maharashtra_floods"
  },
  {
    id: 14,
    title: "Kashmir Earthquake",
    country: "India",
    date: "October 8, 2005",
    type: "Earthquake",
    summary: "Magnitude 7.6 earthquake affecting Jammu and Kashmir. Caused significant damage and loss of life.",
    blogUrl: "https://en.wikipedia.org/wiki/2005_Kashmir_earthquake"
  },
  {
    id: 15,
    title: "Kedarnath Floods",
    country: "India",
    date: "June 2013",
    type: "Flood",
    summary: "Devastating floods in Uttarakhand caused by heavy rainfall. Over 5,000 people died and thousands were stranded.",
    blogUrl: "https://en.wikipedia.org/wiki/2013_North_India_floods"
  },
  {
    id: 16,
    title: "Chennai Floods",
    country: "India",
    date: "November-December 2015",
    type: "Flood",
    summary: "Severe flooding in Chennai due to heavy rainfall. Killed over 500 people and caused massive infrastructure damage.",
    blogUrl: "https://en.wikipedia.org/wiki/2015_South_Indian_floods"
  },
  {
    id: 17,
    title: "Kerala Floods",
    country: "India",
    date: "August 2018",
    type: "Flood",
    summary: "Severe flooding in Kerala due to unusually high rainfall. Over 400 people died and more than a million were displaced.",
    blogUrl: "https://en.wikipedia.org/wiki/2018_Kerala_floods"
  },
  {
    id: 18,
    title: "Cyclone Fani",
    country: "India",
    date: "May 3, 2019",
    type: "Cyclone",
    summary: "Category 4 cyclone that hit Odisha. Caused significant damage and displacement of over 1.2 million people.",
    blogUrl: "https://en.wikipedia.org/wiki/Cyclone_Fani"
  },
  {
    id: 19,
    title: "Cyclone Amphan",
    country: "India",
    date: "May 20, 2020",
    type: "Cyclone",
    summary: "Super cyclonic storm affecting West Bengal and Odisha. Caused extensive damage and displacement.",
    blogUrl: "https://en.wikipedia.org/wiki/Cyclone_Amphan"
  },
  {
    id: 20,
    title: "Uttarakhand Glacier Burst",
    country: "India",
    date: "February 7, 2021",
    type: "Glacial Disaster",
    summary: "Glacier burst in Uttarakhand causing massive flooding. Killed over 200 people and caused significant damage.",
    blogUrl: "https://en.wikipedia.org/wiki/2021_Uttarakhand_flood"
  },
  {
    id: 21,
    title: "Cyclone Tauktae",
    country: "India",
    date: "May 17, 2021",
    type: "Cyclone",
    summary: "Severe cyclonic storm affecting Gujarat and Maharashtra. Caused significant damage and loss of life.",
    blogUrl: "https://en.wikipedia.org/wiki/Cyclone_Tauktae"
  },
  {
    id: 22,
    title: "Maharashtra Bridge Collapse",
    country: "India",
    date: "August 2, 2023",
    type: "Structural Failure",
    summary: "Bridge collapse in Maharashtra during monsoon season. Multiple casualties and injuries reported.",
    blogUrl: "https://en.wikipedia.org/wiki/2023_Maharashtra_bridge_collapse"
  },
  {
    id: 23,
    title: "Delhi Gas Leak",
    country: "India",
    date: "May 6, 2020",
    type: "Industrial Disaster",
    summary: "Toxic gas leak at a chemical factory in Delhi. Affected hundreds of people and caused multiple deaths.",
    blogUrl: "https://en.wikipedia.org/wiki/2020_Delhi_gas_leak"
  },
  {
    id: 24,
    title: "Mumbai Terror Attacks",
    country: "India",
    date: "November 26, 2008",
    type: "Terrorist Attack",
    summary: "Coordinated terrorist attacks across Mumbai. 166 people died and over 300 were injured in the 60-hour siege.",
    blogUrl: "https://en.wikipedia.org/wiki/2008_Mumbai_attacks"
  },
  {
    id: 25,
    title: "Uttar Pradesh Train Crash",
    country: "India",
    date: "November 20, 2016",
    type: "Transportation Disaster",
    summary: "Deadly train derailment in Kanpur. Over 150 people died and more than 200 were injured in one of India's worst train accidents.",
    blogUrl: "https://en.wikipedia.org/wiki/2016_Indore%E2%80%93Patna_Express_derailment"
  }
];

export default function DisasterPreparedness() {
  const [activeTab, setActiveTab] = useState("general")
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const router = useRouter()
  const [filteredEvents, setFilteredEvents] = useState(historicalEvents)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1C23] via-[#1E2028] to-[#23272F] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title, AI Assistant, Share, and Download */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <h1 className="text-4xl font-extrabold text-[#22C55E] tracking-tight drop-shadow-lg">
            Disaster Preparedness
          </h1>
          <div className="flex gap-2">
  <Button
    variant="outline"
    className="flex items-center gap-2 border-[#00000] text-[#EFEFEF] hover:bg-[#1E293B] hover:text-gray-200 bg-[#EB5B00]"
    onClick={() => setShowAIAssistant(true)}
  >
    <MessageSquareText className="h-5 w-5" />
    AI Assistant
  </Button>

  <Button
    variant="outline"
    className="flex items-center gap-2 border-[#00000] text-[#EFEFEF] hover:bg-[#1E293B] hover:text-gray-200 bg-[#EB5B00]"
    onClick={() => {
      // Share logic here
    }}
  >
    <Share2 className="h-5 w-5" />
    Share
  </Button>

  <Button
    variant="outline"
    className="flex items-center gap-2 border-[#00000] text-[#EFEFEF] hover:bg-[#1E293B] hover:text-gray-200 bg-[#EB5B00]"
    onClick={() => {
      // Download logic here
    }}
  >
    <Download className="h-5 w-5" />
    Download
  </Button>
</div>
</div>

        {/* Tabs and Content */}
        <Tabs className="bg-[#23272F] rounded-3xl border border-[#31343C] shadow-2xl p-8" defaultValue="general">
          <TabsList className="flex gap-4 mb-8 bg-transparent">
            <TabsTrigger
              value="general"
              className={`pb-2 rounded-none border-b-2 text-lg font-semibold transition-colors duration-200 ${activeTab === "general" ? "border-[#4FC3F7] text-[#4FC3F7]" : "border-transparent text-[#E3E8F0] hover:text-[#4FC3F7]"}`}
            >
              General Preparedness
            </TabsTrigger>
            <TabsTrigger
              value="flood"
              className={`pb-2 rounded-none border-b-2 text-lg font-semibold transition-colors duration-200 ${activeTab === "flood" ? "border-blue-400 text-blue-400" : "border-transparent text-[#E3E8F0] hover:text-blue-400"}`}
            >
              Flood
            </TabsTrigger>
            <TabsTrigger
              value="hurricane"
              className={`pb-2 rounded-none border-b-2 text-lg font-semibold transition-colors duration-200 ${activeTab === "hurricane" ? "border-cyan-400 text-cyan-400" : "border-transparent text-[#E3E8F0] hover:text-cyan-400"}`}
            >
              Hurricane
            </TabsTrigger>
            <TabsTrigger
              value="tornado"
              className={`pb-2 rounded-none border-b-2 text-lg font-semibold transition-colors duration-200 ${activeTab === "tornado" ? "border-emerald-400 text-emerald-400" : "border-transparent text-[#E3E8F0] hover:text-emerald-400"}`}
            >
              Tornado
            </TabsTrigger>
            <TabsTrigger
              value="wildfire"
              className={`pb-2 rounded-none border-b-2 text-lg font-semibold transition-colors duration-200 ${activeTab === "wildfire" ? "border-orange-400 text-orange-400" : "border-transparent text-[#E3E8F0] hover:text-orange-400"}`}
            >
              Wildfire
            </TabsTrigger>
            <TabsTrigger
              value="winter"
              className={`pb-2 rounded-none border-b-2 text-lg font-semibold transition-colors duration-200 ${activeTab === "winter" ? "border-indigo-400 text-indigo-400" : "border-transparent text-[#E3E8F0] hover:text-indigo-400"}`}
            >
              Winter Storm
            </TabsTrigger>
            <TabsTrigger
              value="heatwave"
              className={`pb-2 rounded-none border-b-2 text-lg font-semibold transition-colors duration-200 ${activeTab === "heatwave" ? "border-yellow-400 text-yellow-400" : "border-transparent text-[#E3E8F0] hover:text-yellow-400"}`}
            >
              Heat Wave
            </TabsTrigger>
            <TabsTrigger
              value="historical"
              className={`pb-2 rounded-none border-b-2 text-lg font-semibold flex items-center transition-colors duration-200 ${activeTab === "historical" ? "border-purple-400 text-purple-400" : "border-transparent text-[#E3E8F0] hover:text-purple-400"}`}
            >
              <History className="h-4 w-4 mr-1" />
              Historical Events
            </TabsTrigger>
          </TabsList>

          {/* General Preparedness */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-[#23272F] rounded-xl shadow-lg border border-[#31343C] hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4 bg-[#23272F] rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-white">General Preparedness</CardTitle>
                <Badge className="bg-gradient-to-r from-[#4FC3F7] to-[#1976D2] text-white font-semibold">Important</Badge>
              </CardHeader>
              <CardContent className="pt-4 text-[#E3E8F0]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-[#2A2D35] border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl text-white">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Emergency Kit
                      </CardTitle>
                      <CardDescription className="text-[#A0AEC0]">Essential items for any emergency</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-[#E3E8F0]">
                        <li className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-[#31343C] text-[#4FC3F7] border-[#4FC3F7]">✓</Badge>
                          Water (one gallon per person per day for at least three days)
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Non-perishable food (at least a three-day supply)
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Battery-powered or hand crank radio
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Flashlight and extra batteries
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          First aid kit
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Whistle to signal for help
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Dust mask, plastic sheeting, and duct tape
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Moist towelettes, garbage bags, and plastic ties
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Wrench or pliers to turn off utilities
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Manual can opener for food
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Local maps
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge variant="outline">✓</Badge>
                          Cell phone with chargers and a backup battery
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#2A2D35] border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl text-white">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Family Emergency Plan
                      </CardTitle>
                      <CardDescription className="text-[#A0AEC0]">Steps to prepare your family</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-4 list-decimal pl-5 text-[#E3E8F0]">
                        <li>
                          <strong className="text-white">Discuss these questions with your family/household:</strong>
                          <ul className="pl-5 mt-2 space-y-1 list-disc text-[#E3E8F0]">
                            <li>How will we receive emergency alerts and warnings?</li>
                            <li>What is our shelter plan?</li>
                            <li>What is our evacuation route?</li>
                            <li>What is our family/household communication plan?</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Consider specific needs in your household:</strong>
                          <ul className="pl-5 mt-2 space-y-1 list-disc text-[#E3E8F0]">
                            <li>Different ages of members</li>
                            <li>Responsibilities for assisting others</li>
                            <li>Dietary needs</li>
                            <li>Medical needs including prescriptions and equipment</li>
                            <li>Disabilities or access and functional needs</li>
                            <li>Languages spoken</li>
                            <li>Cultural and religious considerations</li>
                            <li>Pets or service animals</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Fill out a family emergency plan:</strong>
                          <div className="mt-2">
                            Include contact information for family members, work, school, and emergency contacts.
                          </div>
                        </li>
                        <li>
                          <strong>Practice your plan with your family/household.</strong>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#2A2D35] border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl text-white">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Stay Informed
                      </CardTitle>
                      <CardDescription className="text-[#A0AEC0]">How to get emergency information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-[#E3E8F0]">
                        <div>
                          <h3 className="font-semibold mb-2 text-white">Emergency Alert Systems</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-[#31343C] text-[#4FC3F7] border-[#4FC3F7]">📱</Badge>
                              Wireless Emergency Alerts (WEA)
                            </li>
                            <li className="flex items-center gap-2">
                              <Badge variant="outline">📻</Badge>
                              Emergency Alert System (EAS)
                            </li>
                            <li className="flex items-center gap-2">
                              <Badge variant="outline">🔊</Badge>
                              NOAA Weather Radio
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Apps and Websites</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <Badge variant="outline">📱</Badge>
                              FEMA App
                            </li>
                            <li className="flex items-center gap-2">
                              <Badge variant="outline">🌐</Badge>
                              Ready.gov
                            </li>
                            <li className="flex items-center gap-2">
                              <Badge variant="outline">🌐</Badge>
                              Weather.gov
                            </li>
                            <li className="flex items-center gap-2">
                              <Badge variant="outline">📱</Badge>
                              Red Cross Emergency App
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">Local Resources</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <Badge variant="outline">📞</Badge>
                              Local Emergency Management Office
                            </li>
                            <li className="flex items-center gap-2">
                              <Badge variant="outline">📻</Badge>
                              Local news and radio stations
                            </li>
                            <li className="flex items-center gap-2">
                              <Badge variant="outline">🏢</Badge>
                              Community warning systems
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-[#2A2D35] border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300 mt-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Know Your Risks</CardTitle>
                    <CardDescription className="text-[#A0AEC0]">Understanding the disasters that may affect your area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-[#1E2028] rounded-lg border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="h-5 w-5 text-blue-500" />
                          <h3 className="font-semibold text-white">Floods</h3>
                        </div>
                        <p className="text-sm text-[#E3E8F0]">
                          Floods are the most common natural disaster in the United States. Know your area's flood risk and
                          elevation levels.
                        </p>
                      </div>
                      <div className="p-4 bg-[#1E2028] rounded-lg border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Wind className="h-5 w-5 text-cyan-500" />
                          <h3 className="font-semibold text-white">Hurricanes</h3>
                        </div>
                        <p className="text-sm text-[#E3E8F0]">
                          Hurricanes bring high winds, heavy rainfall, storm surges, flooding, and tornadoes. Know if you're
                          in an evacuation zone.
                        </p>
                      </div>
                      <div className="p-4 bg-[#1E2028] rounded-lg border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Wind className="h-5 w-5 text-emerald-500" />
                          <h3 className="font-semibold text-white">Tornadoes</h3>
                        </div>
                        <p className="text-sm text-[#E3E8F0]">
                          Tornadoes can destroy buildings, flip cars, and create deadly flying debris. Know where to shelter
                          in your home.
                        </p>
                      </div>
                      <div className="p-4 bg-[#1E2028] rounded-lg border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Flame className="h-5 w-5 text-orange-500" />
                          <h3 className="font-semibold text-white">Wildfires</h3>
                        </div>
                        <p className="text-sm text-[#E3E8F0]">
                          Wildfires can spread quickly, igniting brush, trees, and homes. Create a defensible space around
                          your home.
                        </p>
                      </div>
                      <div className="p-4 bg-[#1E2028] rounded-lg border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <CloudSnow className="h-5 w-5 text-indigo-500" />
                          <h3 className="font-semibold text-white">Winter Storms</h3>
                        </div>
                        <p className="text-sm text-[#E3E8F0]">
                          Winter storms can bring freezing temperatures, power outages, and dangerous road conditions.
                          Prepare your home and vehicle.
                        </p>
                      </div>
                      <div className="p-4 bg-[#1E2028] rounded-lg border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <ThermometerSun className="h-5 w-5 text-yellow-500" />
                          <h3 className="font-semibold text-white">Heat Waves</h3>
                        </div>
                        <p className="text-sm text-[#E3E8F0]">
                          Extreme heat can cause heat-related illnesses and even death. Know cooling centers in your area.
                        </p>
                      </div>
                      <div className="p-4 bg-[#1E2028] rounded-lg border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <CloudLightning className="h-5 w-5 text-purple-500" />
                          <h3 className="font-semibold text-white">Thunderstorms</h3>
                        </div>
                        <p className="text-sm text-[#E3E8F0]">
                          Thunderstorms can produce lightning, flash floods, and hail. When thunder roars, go indoors.
                        </p>
                      </div>
                      <div className="p-4 bg-[#1E2028] rounded-lg border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <Waves className="h-5 w-5 text-blue-700" />
                          <h3 className="font-semibold text-white">Tsunamis</h3>
                        </div>
                        <p className="text-sm text-[#E3E8F0]">
                          Tsunamis are a series of enormous waves created by underwater disturbances. Know evacuation routes
                          if you live in a coastal area.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flood Tab */}
          <TabsContent value="flood" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#2A2D35] border border-[#31343C] hover:border-[#4FC3F7] transition-all duration-300">
                <CardHeader className="bg-blue-900 bg-opacity-30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-xl text-white">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      Flood Safety
                    </CardTitle>
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">High Risk</Badge>
                  </div>
                  <CardDescription className="text-[#A0AEC0]">Before, during, and after a flood</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 text-[#E3E8F0]">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="before">
                      <AccordionTrigger className="font-semibold text-white">Before a Flood</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#E3E8F0]">
                          <li>Know your area's flood risk and if you're in a floodplain.</li>
                          <li>Consider buying flood insurance.</li>
                          <li>Keep important documents in a waterproof container.</li>
                          <li>Learn and practice evacuation routes and shelter locations.</li>
                          <li>Keep gutters and drains clear of debris.</li>
                          <li>Install check valves in plumbing to prevent backups.</li>
                          <li>Consider a sump pump with battery backup.</li>
                          <li>Elevate the furnace, water heater, and electric panel if susceptible to flooding.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="during">
                      <AccordionTrigger className="font-semibold text-white">During a Flood</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#E3E8F0]">
                          <li className="text-red-500 font-semibold">
                            Turn Around, Don't Drown! Just 6 inches of moving water can knock you down, and one foot of
                            water can sweep your vehicle away.
                          </li>
                          <li>Move to higher ground or a higher floor.</li>
                          <li>Stay where you are unless told to evacuate.</li>
                          <li>
                            Listen to EAS, NOAA Weather Radio, or local alerting systems for current emergency
                            information.
                          </li>
                          <li>DO NOT walk, swim, or drive through flood waters.</li>
                          <li>Stay off bridges over fast-moving water.</li>
                          <li>Evacuate if told to do so.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="after">
                      <AccordionTrigger className="font-semibold text-white">After a Flood</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#E3E8F0]">
                          <li>Return home only when authorities say it is safe.</li>
                          <li>Be aware of areas where floodwaters have receded and watch out for debris.</li>
                          <li>Do not wade in floodwater, which can contain dangerous debris and be contaminated.</li>
                          <li>
                            Be aware of the risk of electrocution. Don't touch electrical equipment if it's wet or if
                            you're standing in water.
                          </li>
                          <li>
                            Clean and disinfect everything that got wet. Mud left from floodwater can contain sewage and
                            chemicals.
                          </li>
                          <li>
                            Throw out any food, beverages, and medicine that have come into contact with floodwaters.
                          </li>
                          <li>Take pictures of damage for insurance claims.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="bg-blue-900 bg-opacity-10 flex justify-between">
                  <span className="text-sm text-[#A0AEC0]">Source: FEMA & National Weather Service</span>
                  <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0">
                    Learn more
                  </Button>
                </CardFooter>
              </Card>

              <Card className="weather-card">
                <CardHeader>
                  <CardTitle className="text-[#4F959D]">Flood Terms to Know</CardTitle>
                  <CardDescription className="text-[#F5EEDC]">Understanding flood alerts and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Flood Watch</h3>
                      <p className="text-sm  text-[#FDFAF6]">
                        Flooding is possible. Be prepared to move to higher ground. Listen to NOAA Weather Radio, local
                        radio, or TV for information.
                      </p>
                    </div>

                    <div className="p-3 border border-orange-600 bg-orange-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-orange-400 mb-1">Flash Flood Watch</h3>
                      <p className="text-sm text-[#FDFAF6]">
                        Flash flooding is possible. Be prepared to move to higher ground. Flash flooding can occur
                        without typical warnings like rain clouds or heavy rain.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Flood Warning</h3>
                      <p className="text-sm text-[#FDFAF6]">
                        Flooding is occurring or will occur soon; if advised to evacuate, do so immediately.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Flash Flood Warning</h3>
                      <p className="text-sm text-[#FDFAF6]">A flash flood is occurring; seek higher ground immediately.</p>
                    </div>

                    <div className="p-3 border border-blue-600 bg-blue-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-blue-400 mb-1">Flood Advisory</h3>
                      <p className="text-sm text-[#FDFAF6]">
                        Flooding that may cause significant inconvenience but is not expected to be life-threatening is
                        occurring or imminent.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="weather-card">
              <CardHeader>
                <CardTitle className="text-[#60B5FF]">Flood Evacuation Plan</CardTitle>
                <CardDescription className="text-[#FFECDB]" >Know your evacuation routes and have a plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#AFDDFF]">Before You Evacuate</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FDFAF6]">
                      <li>Secure your home: lock doors and windows.</li>
                      <li>Turn off utilities if instructed to do so.</li>
                      <li>Take only essential items with you.</li>
                      <li>Follow recommended evacuation routes. Do not take shortcuts.</li>
                      <li>Be alert for washed-out roads and bridges.</li>
                      <li>Do not drive into flooded areas.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#AFDDFF]">What to Bring</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FDFAF6]">
                      <li>Emergency kit and supplies</li>
                      <li>Important documents in waterproof container</li>
                      <li>Cell phone with chargers</li>
                      <li>Prescription medications</li>
                      <li>Change of clothes</li>
                      <li>Sleeping bags or blankets</li>
                      <li>Pet supplies if applicable</li>
                      <li>Cash and credit cards</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#AFDDFF]">Where to Go</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FDFAF6]">
                      <li>Public shelters</li>
                      <li>Friends or family on higher ground</li>
                      <li>Hotels or motels outside of evacuation area</li>
                    </ul>
                    <div className="p-3 bg-[#2A2A2A] rounded-md mt-4">
                      <h4 className="font-semibold mb-1 text-[#00ADB5]">Find Shelters</h4>
                      <p className="text-sm mb-2 text-[#DBE2EF]">
                        Text SHELTER + your ZIP code to 43362 (4FEMA) to find the nearest shelter in your area.
                      </p>
                      <Button size="sm" className="w-full bg-[#4FC3F7] text-white hover:bg-[#3DB8E6]">
                        Find Shelters Near Me
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hurricane Tab */}
          <TabsContent value="hurricane" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="weather-card">
                <CardHeader className="bg-cyan-900 bg-opacity-30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-[#7AE2CF]">
                      <Wind className="h-5 w-5 text-cyan-500" />
                      Hurricane Safety
                    </CardTitle>
                    <Badge className="bg-cyan-500">High Risk</Badge>
                  </div>
                  <CardDescription className="text-[#F9F5F6]">Before, during, and after a hurricane</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="before">
                      <AccordionTrigger className="font-semibold text-[#61C0BF]">Before a Hurricane</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#F9F7F7]">
                          <li>Know your hurricane risk. Find out if you live in a hurricane evacuation zone.</li>
                          <li>Make an emergency plan and practice it with your family.</li>
                          <li>Build or restock your emergency preparedness kit.</li>
                          <li>Consider buying flood insurance.</li>
                          <li>
                            Strengthen your home: trim trees, secure loose outdoor items, reinforce roof, windows, and
                            doors.
                          </li>
                          <li>Learn your evacuation zone and evacuation routes.</li>
                          <li>Keep important documents in a waterproof container.</li>
                          <li>Fill your car's gas tank and stock up on supplies.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="during">
                      <AccordionTrigger className="font-semibold text-[#61C0BF]">During a Hurricane</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#F9F7F7]">
                          <li className="text-red-500 font-semibold   ">
                            If told to evacuate, do so immediately. Do not drive around barricades.
                          </li>
                          <li>
                            If sheltering during high winds, go to a FEMA safe room, ICC 500 storm shelter, or small,
                            interior, windowless room.
                          </li>
                          <li>
                            If trapped in a building by flooding, go to the highest level. Do not climb into a closed
                            attic.
                          </li>
                          <li>
                            Listen to EAS, NOAA Weather Radio, or local alerting systems for current emergency
                            information.
                          </li>
                          <li>Only use generators outdoors and away from windows.</li>
                          <li>Do not walk, swim, or drive through flood waters.</li>
                          <li>Stay off bridges over fast-moving water.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="after">
                      <AccordionTrigger className="font-semibold text-[#61C0BF]">After a Hurricane</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#F9F7F7]">
                          <li>Listen to authorities for information and instructions.</li>
                          <li>Return home only when authorities say it is safe.</li>
                          <li>Be careful during clean-up. Wear protective clothing and work with someone else.</li>
                          <li>Do not touch electrical equipment if it is wet or if you are standing in water.</li>
                          <li>Avoid wading in floodwater, which can contain dangerous debris and be contaminated.</li>
                          <li>
                            Save phone calls for emergencies. Use text messages or social media to communicate with
                            family and friends.
                          </li>
                          <li>
                            Document property damage with photographs. Contact your insurance company for assistance.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="bg-cyan-900 bg-opacity-10 flex justify-between">
                  <span className="text-sm">Source: FEMA & National Hurricane Center</span>
                  <Button variant="link" className="text-cyan-400 p-0">
                    Learn more
                  </Button>
                </CardFooter>
              </Card>

              <Card className="weather-card">
                <CardHeader>
                  <CardTitle className="text-[#4ED7F1]">Hurricane Terms to Know</CardTitle>
                  <CardDescription  className="text-[#FFFDF6]" >Understanding hurricane alerts and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1 ">Hurricane Watch</h3>
                      <p className="text-sm text-[#FFFDF6]">
                        Hurricane conditions (sustained winds of 74 mph or higher) are possible within the specified
                        area. A hurricane watch is issued 48 hours in advance of the anticipated onset of
                        tropical-storm-force winds.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Hurricane Warning</h3>
                      <p className="text-sm text-[#FFFDF6]">
                        Hurricane conditions (sustained winds of 74 mph or higher) are expected within the specified
                        area. A hurricane warning is issued 36 hours in advance of the anticipated onset of
                        tropical-storm-force winds.
                      </p>
                    </div>

                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Tropical Storm Watch</h3>
                      <p className="text-sm text-[#FFFDF6]">
                        Tropical storm conditions (sustained winds of 39 to 73 mph) are possible within the specified
                        area within 48 hours.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Tropical Storm Warning</h3>
                      <p className="text-sm text-[#FFFDF6]">
                        Tropical storm conditions (sustained winds of 39 to 73 mph) are expected within the specified
                        area within 36 hours.
                      </p>
                    </div>

                    <div className="p-3 border border-blue-600 bg-blue-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-blue-400 mb-1">Storm Surge</h3>
                      <p className="text-sm text-[#FFFDF6]">
                        An abnormal rise of water generated by a storm, over and above the predicted astronomical tide.
                        Storm surge is often the greatest threat to life and property from a hurricane.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="weather-card">
              <CardHeader>
                <CardTitle className="text-[#FE7743]">Hurricane Evacuation Plan</CardTitle>
                <CardDescription className="text-[#FAF6E9]">Know your evacuation zone and have a plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#F3C623]">Know Your Zone</h3>
                    <p className="text-[#FAF6E9]">
                      Hurricane evacuation zones are designated based on hurricane storm surge inundation maps. Know
                      which zone you live in.
                    </p>
                    <div className="p-3 bg-[#2A2A2A] rounded-md">
                      <h4 className="font-semibold mb-1 text-[#FFB22C]">Evacuation Zones</h4>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2">
                          <Badge className="bg-red-500">Zone A</Badge>
                          <span className="text-sm text-[#FF6363]">Highest risk, evacuate first</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge className="bg-orange-500">Zone B</Badge>
                          <span className="text-sm text-[#FE7743]">High risk</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge className="bg-yellow-500">Zone C</Badge>
                          <span className="text-sm text-[#E9A319]">Moderate risk</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Badge className="bg-green-500">Zone D</Badge>
                          <span className="text-sm text-[#A0C878]">Lower risk</span>
                        </li>
                      </ul>
                      <Button size="sm" className="w-full mt-3">
                        Find My Evacuation Zone
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#F3C623]">Evacuation Checklist</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FAF6E9]">
                      <li>Fill your vehicle's gas tank.</li>
                      <li>Take cash and credit cards.</li>
                      <li>Notify friends/family of your evacuation plans.</li>
                      <li>Secure your home: board up windows, secure outdoor objects.</li>
                      <li>Turn off utilities if instructed to do so.</li>
                      <li>Take your emergency supply kit.</li>
                      <li>Take important documents in waterproof container.</li>
                      <li>Take prescription medications and medical supplies.</li>
                      <li>Take your pets and their supplies.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#F3C623]">If You Cannot Evacuate</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FAF6E9]">
                      <li>Stay in a small, interior, windowless room on the lowest level not likely to flood.</li>
                      <li>Stay away from windows, skylights, and glass doors.</li>
                      <li>Do not stay in a mobile home or temporary structure.</li>
                      <li>Do not stay in areas subject to flooding.</li>
                      <li>Have enough supplies for at least 3 days.</li>
                      <li>Fill bathtubs and containers with water.</li>
                      <li>Turn refrigerator to coldest setting and keep closed.</li>
                      <li>Turn off propane tanks and unplug small appliances.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tornado Tab */}
          <TabsContent value="tornado" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="weather-card">
                <CardHeader className="bg-emerald-900 bg-opacity-30">
                  <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-[#9EBC8A]">
  <Wind className="h-5 w-5 text-[#81E7AF]" />
  Tornado Safety
</CardTitle>

                    <Badge className="bg-emerald-500">High Risk</Badge>
                  </div>
                  <CardDescription className="text-[#F9F5F6]">Before, during, and after a tornado</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="before">
                      <AccordionTrigger className="font-semibold text-[#A0C878]">Before a Tornado</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#F9F7F7]">
                          <li>Know your area's tornado risk and warning signs.</li>
                          <li>Identify a safe room in your home or workplace.</li>
                          <li>Practice tornado drills with your family.</li>
                          <li>Keep important documents in a waterproof container.</li>
                          <li>Build or restock your emergency preparedness kit.</li>
                          <li>Learn the difference between a tornado watch and warning.</li>
                          <li>Consider installing a tornado safe room or storm shelter.</li>
                          <li>Keep trees and shrubs trimmed and remove damaged limbs.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="during">
                      <AccordionTrigger className="font-semibold text-[#A0C878]">During a Tornado</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#F9F7F7]">
                          <li className="text-red-500 font-semibold">
                            Go to a safe room, basement, or storm cellar immediately.
                          </li>
                          <li>If no underground shelter is available, go to an interior room on the lowest floor.</li>
                          <li>Stay away from windows, doors, and outside walls.</li>
                          <li>Get under something sturdy like a heavy table or workbench.</li>
                          <li>Cover your body with a blanket, sleeping bag, or mattress.</li>
                          <li>Protect your head with anything available.</li>
                          <li>If in a vehicle, do not try to outrun a tornado. Get out and find shelter.</li>
                          <li>If outside with no shelter, lie flat in a ditch or low-lying area.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="after">
                      <AccordionTrigger className="font-semibold text-[#A0C878]">After a Tornado</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#F9F7F7]">
                          <li>Keep your family together and wait for emergency personnel to arrive.</li>
                          <li>Stay clear of fallen power lines or broken utility lines.</li>
                          <li>Check for injuries and provide first aid if necessary.</li>
                          <li>Check for damage to your home and utilities.</li>
                          <li>Use battery-powered flashlights or lanterns rather than candles.</li>
                          <li>Wear sturdy shoes and protective clothing when walking through debris.</li>
                          <li>Take pictures of damage for insurance claims.</li>
                          <li>Contact your insurance company to report damage.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="bg-emerald-900 bg-opacity-10 flex justify-between">
                  <span className="text-sm text-[#90D1CA]">Source: FEMA & National Weather Service</span>
                  <Button variant="link" className="text-emerald-400 p-0">
                    Learn more
                  </Button>
                </CardFooter>
              </Card>

              <Card className="weather-card">
                <CardHeader>
                  <CardTitle className="text-[#90D1CA]">Tornado Terms to Know</CardTitle>
                  <CardDescription>Understanding tornado alerts and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Tornado Watch</h3>
                      <p className="text-sm text-[#FFFFFF]">
                        Tornadoes are possible in and near the watch area. Review and discuss your emergency plans and
                        check supplies and your safe room.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Tornado Warning</h3>
                        <p className="text-sm text-[#FFFFFF]">
                        A tornado has been sighted or indicated by weather radar. Take shelter immediately.
                      </p>
                    </div>

                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Severe Thunderstorm Watch</h3>
                      <p className="text-sm text-[#FFFFFF]">
                        Severe thunderstorms are possible in and near the watch area. Stay informed and be ready to act
                        if a severe thunderstorm warning is issued.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Severe Thunderstorm Warning</h3>
                      <p className="text-sm text-[#FFFFFF]">
                        Severe weather has been reported by spotters or indicated by radar. Warnings indicate imminent
                        danger to life and property.
                      </p>
                    </div>

                    <div className="p-3 border border-blue-600 bg-blue-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-blue-400 mb-1">Tornado Emergency</h3>
                      <p className="text-sm text-[#FFFFFF]">
                        A rare warning issued when there is a severe threat to human life and catastrophic damage from a
                        tornado. Take immediate action to protect your life.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="weather-card">
              <CardHeader>
                <CardTitle className="text-[#90D1CA]">Tornado Safety Plan</CardTitle>
                <CardDescription className="text-[#F3F3E0]">Know where to go and what to do</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#F3C623]">Safe Room Location</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#F9F7F7]">
                      <li>Basement or storm cellar</li>
                      <li>Interior room on lowest floor</li>
                      <li>Small, windowless room</li>
                      <li>Under a sturdy table or workbench</li>
                      <li>Away from windows and doors</li>
                    </ul>
                    <div className="p-3 bg-[#2A2A2A] rounded-md">
                      <h4 className="font-semibold mb-1 text-[#FFB22C]">Safe Room Checklist</h4>
                      <ul className="space-y-1 text-[#F3F3E0]">
                        <li>Emergency supplies kit</li>
                        <li>Battery-powered radio</li>
                        <li>Flashlights and extra batteries</li>
                        <li>First aid kit</li>
                        <li>Water and non-perishable food</li>
                        <li>Blankets or sleeping bags</li>
                        <li>Whistle to signal for help</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#F3C623]">Warning Signs</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#F9F7F7]">
                      <li>Dark, often greenish sky</li>
                      <li>Large hail</li>
                      <li>Large, dark, low-lying cloud</li>
                      <li>Loud roar, similar to a freight train</li>
                      <li>Debris cloud</li>
                      <li>Funnel cloud</li>
                      <li>Rotating wall cloud</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#F3C623]">If You're Outside</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#F9F7F7]">
                      <li>Seek shelter immediately</li>
                      <li>If no shelter is available:</li>
                      <li>Lie flat in a ditch or low-lying area</li>
                      <li>Cover your head with your arms</li>
                      <li>Stay away from trees and cars</li>
                      <li>Do not try to outrun a tornado</li>
                      <li>Protect yourself from flying debris</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wildfire Tab */}
          <TabsContent value="wildfire" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="weather-card">
                <CardHeader className="bg-orange-900 bg-opacity-30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-[#F4631E]">
                      <Flame className="h-5 w-5 text-orange-500" />
                      Wildfire Safety
                    </CardTitle>
                    <Badge className="bg-orange-500">High Risk</Badge>
                  </div>
                  <CardDescription className="text-[#F9F5F6]">Before, during, and after a wildfire</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="before">
                      <AccordionTrigger className="font-semibold text-[#FA812F]">Before a Wildfire</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                          <li>Create a defensible space around your home.</li>
                          <li>Clear leaves and debris from gutters and roofs.</li>
                          <li>Trim trees and shrubs regularly.</li>
                          <li>Use fire-resistant materials for home construction.</li>
                          <li>Keep important documents in a fireproof safe.</li>
                          <li>Have an evacuation plan and practice it.</li>
                          <li>Prepare an emergency supply kit.</li>
                          <li>Sign up for local emergency alerts.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="during">
                      <AccordionTrigger className="font-semibold text-[#FA812F]">During a Wildfire</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                          <li className="text-red-500 font-semibold">
                            If ordered to evacuate, do so immediately.
                          </li>
                          <li>Wear protective clothing and footwear.</li>
                          <li>Take your emergency supply kit.</li>
                          <li>Close all windows and doors.</li>
                          <li>Turn off gas, electricity, and water.</li>
                          <li>Move flammable furniture to the center of rooms.</li>
                          <li>Leave lights on for visibility.</li>
                          <li>Follow designated evacuation routes.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="after">
                      <AccordionTrigger className="font-semibold text-[#FA812F]">After a Wildfire</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                          <li>Wait for official word that it's safe to return.</li>
                          <li>Be aware of hot spots and flare-ups.</li>
                          <li>Check for structural damage before entering.</li>
                          <li>Wear a mask when cleaning up.</li>
                          <li>Document damage for insurance claims.</li>
                          <li>Check for gas leaks and electrical damage.</li>
                          <li>Be cautious of ash pits and hot spots.</li>
                          <li>Contact your insurance company.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="bg-orange-900 bg-opacity-10 flex justify-between">
                  <span className="text-sm text-[#90D1CA]">Source: FEMA & National Interagency Fire Center</span>
                  <Button variant="link" className="text-orange-400 p-0">
                    Learn more
                  </Button>
                </CardFooter>
              </Card>

              <Card className="weather-card">
                <CardHeader>
                  <CardTitle className="text-[#FE7743]">Wildfire Terms to Know</CardTitle>
                  <CardDescription className="text-[#FFFFF1]">Understanding wildfire alerts and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Fire Weather Watch</h3>
                      <p className="text-sm text-[#FFFFFF]">
                        Critical fire weather conditions are possible. Be prepared for rapid changes in the weather.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Red Flag Warning</h3>
                      <p className="text-sm text-[#FFFFFF]">
                        Critical fire weather conditions are occurring or will occur soon. A combination of strong winds,
                        low relative humidity, and warm temperatures can contribute to extreme fire behavior.
                      </p>
                    </div>

                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Evacuation Warning</h3>
                      <p className="text-sm text-[#FFFFFF]">
                        A wildfire is threatening your area. Be ready to evacuate at a moment's notice.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Evacuation Order</h3>
                      <p className="text-sm text-[#FFFFFF]">
                        A wildfire is threatening your area. Leave immediately.
                      </p>
                    </div>

                    <div className="p-3 border border-blue-600 bg-blue-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-blue-400 mb-1">Defensible Space</h3>
                      <p className="text-sm text-[#FFFFFF]">
                        The area around a structure that has been modified to reduce fire hazard. This space helps protect
                        your home from catching fire.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="weather-card">
              <CardHeader>
                <CardTitle className="text-[#FE7743]">Wildfire Safety Plan</CardTitle>
                <CardDescription>Protect your home and family</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#FF9B17]">Defensible Space Zones</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                      <li>Zone 1 (0-5 feet): Immediate area around home</li>
                      <li>Zone 2 (5-30 feet): Lean, clean, and green area</li>
                      <li>Zone 3 (30-100 feet): Reduced fuel area</li>
                      <li>Zone 4 (100+ feet): Natural area</li>
                    </ul>
                    <div className="p-3 bg-[#2A2A2A] rounded-md">
                      <h4 className="font-semibold mb-1 text-[#FF9B17]">Home Hardening</h4>
                      <ul className="space-y-1 text-[#FFECDB]">
                        <li>Fire-resistant roofing</li>
                        <li>Ember-resistant vents</li>
                        <li>Fire-resistant siding</li>
                        <li>Dual-pane windows</li>
                        <li>Fire-resistant decking</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#FF9B17]">Evacuation Checklist</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                      <li>Emergency supply kit</li>
                      <li>Important documents</li>
                      <li>Medications</li>
                      <li>Pet supplies</li>
                      <li>Change of clothes</li>
                      <li>Cash and credit cards</li>
                      <li>Cell phone and charger</li>
                      <li>Family photos</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#FF9B17]">If You Cannot Evacuate</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                      <li>Stay inside your home</li>
                      <li>Close all windows and doors</li>
                      <li>Fill sinks and tubs with water</li>
                      <li>Turn off gas and electricity</li>
                      <li>Stay in a room away from outside walls</li>
                      <li>Keep a radio on for updates</li>
                      <li>Wear protective clothing</li>
                      <li>Be ready to defend your home</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Winter Storm Tab */}
          <TabsContent value="winter" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="weather-card">
                <CardHeader className="bg-indigo-900 bg-opacity-30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-[#0077b6]">
                      <CloudSnow className="h-5 w-5 text-indigo-500" />
                      Winter Storm Safety
                    </CardTitle>
                    <Badge className="bg-indigo-500">High Risk</Badge>
                  </div>
                  <CardDescription className="text-[#dda15e]">Before, during, and after a winter storm</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="before">
                      <AccordionTrigger className="font-semibold text-[#dda15e]">Before a Winter Storm</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                          <li>Prepare your home for winter weather.</li>
                          <li>Insulate pipes and allow faucets to drip.</li>
                          <li>Have your heating system serviced.</li>
                          <li>Stock up on emergency supplies.</li>
                          <li>Keep a supply of firewood if you have a fireplace.</li>
                          <li>Have your vehicle winterized.</li>
                          <li>Keep a full tank of gas in your vehicle.</li>
                          <li>Have a backup power source ready.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="during">
                      <AccordionTrigger className="font-semibold text-[#dda15e]">During a Winter Storm</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                          <li className="text-red-500 font-semibold">
                            Stay indoors if possible. If you must go outside, wear several layers of loose-fitting,
                            lightweight, warm clothing.
                          </li>
                          <li>Keep dry. Change wet clothing to prevent loss of body heat.</li>
                          <li>Watch for signs of frostbite and hypothermia.</li>
                          <li>Conserve fuel by keeping your home cooler than normal.</li>
                          <li>Use generators and space heaters safely.</li>
                          <li>Stay off roads if possible.</li>
                          <li>If you must drive, keep an emergency kit in your vehicle.</li>
                          <li>Check on neighbors, especially the elderly.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="after">
                      <AccordionTrigger className="font-semibold text-[#dda15e]">After a Winter Storm</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                          <li>Continue to protect yourself from frostbite and hypothermia.</li>
                          <li>Be careful when shoveling snow.</li>
                          <li>Check on neighbors who may need assistance.</li>
                          <li>Be aware of the risk of heart attacks from overexertion.</li>
                          <li>Watch for signs of frostbite and hypothermia.</li>
                          <li>Check your home for damage.</li>
                          <li>Be careful when walking on ice.</li>
                          <li>Stay off roads until they are cleared.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="bg-indigo-900 bg-opacity-10 flex justify-between">
                  <span className="text-sm text-[#90D1CA]">Source: FEMA & National Weather Service</span>
                  <Button variant="link" className="text-indigo-400 p-0">
                    Learn more
                  </Button>
                </CardFooter>
              </Card>

              <Card className="weather-card">
                <CardHeader>
                  <CardTitle className="text-[#219ebc]">Winter Storm Terms to Know</CardTitle>
                  <CardDescription className="text-[#F3F3E0]">Understanding winter weather alerts and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Winter Storm Watch</h3>
                      <p className="text-sm text-[#fefae0]">
                        A winter storm is possible in your area. Be alert to changing weather conditions and avoid
                        unnecessary travel.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Winter Storm Warning</h3>
                      <p className="text-sm text-[#fefae0]">
                        A winter storm is occurring or will soon occur in your area. Take immediate precautions.
                      </p>
                    </div>

                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Blizzard Warning</h3>
                      <p className="text-sm text-[#fefae0]">
                        Sustained winds or frequent gusts of 35 mph or greater and considerable falling or blowing snow
                        are expected to reduce visibility to less than a quarter mile for three hours or more.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Ice Storm Warning</h3>
                      <p className="text-sm text-[#fefae0]">
                        Significant ice accumulation is expected. This will make travel dangerous or impossible and likely
                        lead to snapped power lines and falling tree branches.
                      </p>
                    </div>

                    <div className="p-3 border border-blue-600 bg-blue-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-blue-400 mb-1">Wind Chill Warning</h3>
                      <p className="text-sm text-[#fefae0]">
                        Life-threatening wind chills are expected. Frostbite can occur in minutes, and hypothermia can
                        occur if precautions are not taken.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="weather-card">
              <CardHeader>
                <CardTitle className="text-[#219ebc]">Winter Storm Safety Plan</CardTitle>
                <CardDescription className="text-[#F3F3E0]">Stay safe during winter weather</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#219ebc]">Home Preparation</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                      <li>Insulate walls and attics</li>
                      <li>Caulk and weather-strip doors and windows</li>
                      <li>Install storm windows or cover windows with plastic</li>
                      <li>Insulate pipes and allow faucets to drip</li>
                      <li>Have your heating system serviced</li>
                    </ul>
                    <div className="p-3 bg-[#2A2A2A] rounded-md">
                      <h4 className="font-semibold mb-1 text-[#dda15e]">Emergency Supplies</h4>
                      <ul className="space-y-1 text-[#FFECDB]">
                        <li>Rock salt or sand</li>
                        <li>Snow shovels</li>
                        <li>Heating fuel</li>
                        <li>Emergency heat source</li>
                        <li>Fire extinguisher</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#219ebc]">Vehicle Preparation</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                      <li>Winter tires or chains</li>
                      <li>Full gas tank</li>
                      <li>Emergency kit in vehicle</li>
                      <li>Ice scraper and brush</li>
                      <li>Jumper cables</li>
                      <li>Road flares</li>
                      <li>Blankets</li>
                      <li>First aid kit</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#219ebc]">If You're Stranded</h3>
                      <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                      <li>Stay in your vehicle</li>
                      <li>Run the engine for 10 minutes each hour</li>
                      <li>Keep a window slightly open</li>
                      <li>Make sure the exhaust pipe is clear</li>
                      <li>Turn on the dome light at night</li>
                      <li>Exercise to maintain body heat</li>
                      <li>Take turns sleeping</li>
                      <li>Conserve battery power</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Heat Wave Tab */}
          <TabsContent value="heatwave" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="weather-card">
                <CardHeader className="bg-yellow-900 bg-opacity-30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-[#ffbe0b]">
                      <ThermometerSun className="h-5 w-5 text-yellow-500" />
                      Heat Wave Safety
                    </CardTitle>
                    <Badge className="bg-yellow-500">High Risk</Badge>
                  </div>
                  <CardDescription className="text-[#FFFFFF]">Before, during, and after a heat wave</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="before">
                      <AccordionTrigger className="font-semibold text-[#ffbe0b]">Before a Heat Wave</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                          <li>Install window air conditioners and insulate them.</li>
                          <li>Check air conditioning ducts for proper insulation.</li>
                          <li>Install temporary window reflectors.</li>
                          <li>Weather-strip doors and windows.</li>
                          <li>Cover windows with drapes or shades.</li>
                          <li>Learn the symptoms of heat-related illnesses.</li>
                          <li>Identify cooling centers in your area.</li>
                          <li>Have a plan for power outages.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="during">
                      <AccordionTrigger className="font-semibold text-[#ffbe0b]">During a Heat Wave</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                          <li className="text-red-500 font-semibold">
                            Stay hydrated. Drink plenty of fluids, even if you don't feel thirsty.
                          </li>
                          <li>Stay in an air-conditioned place as much as possible.</li>
                          <li>Limit outdoor activities to morning and evening hours.</li>
                          <li>Wear lightweight, loose-fitting clothing.</li>
                          <li>Take cool showers or baths.</li>
                          <li>Never leave people or pets in a closed car.</li>
                          <li>Check on family, friends, and neighbors.</li>
                          <li>Monitor local news for updates.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="after">
                      <AccordionTrigger className="font-semibold text-[#ffbe0b]">After a Heat Wave</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                          <li>Continue to stay hydrated.</li>
                          <li>Check on vulnerable neighbors.</li>
                          <li>Monitor local news for updates.</li>
                          <li>Be aware of the risk of heat-related illnesses.</li>
                          <li>Check your home for damage.</li>
                          <li>Be careful when walking on hot surfaces.</li>
                          <li>Stay off roads until they are cleared.</li>
                          <li>Contact your insurance company if needed.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="bg-yellow-900 bg-opacity-10 flex justify-between">
                  <span className="text-sm text-[#90D1CA]">Source: FEMA & National Weather Service</span>
                  <Button variant="link" className="text-yellow-400 p-0">
                    Learn more
                  </Button>
                </CardFooter>
              </Card>

              <Card className="weather-card">
                <CardHeader>
                  <CardTitle className="text-[#ffbe0b]">Heat Wave Terms to Know</CardTitle>
                  <CardDescription className="text-[#F3F3E0]">Understanding heat-related alerts and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Excessive Heat Watch</h3>
                      <p className="text-sm text-[#fefae0]">
                        Conditions are favorable for an excessive heat event in the next 24 to 72 hours. Be prepared to
                        take action.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Excessive Heat Warning</h3>
                      <p className="text-sm text-[#fefae0]">
                        An excessive heat event is expected in the next 12 to 24 hours. Take immediate precautions.
                      </p>
                    </div>

                    <div className="p-3 border border-yellow-600 bg-yellow-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-yellow-400 mb-1">Heat Advisory</h3>
                      <p className="text-sm text-[#fefae0]">
                        An excessive heat event is expected in the next 12 to 24 hours. Take extra precautions if you
                        work or spend time outside.
                      </p>
                    </div>

                    <div className="p-3 border border-red-600 bg-red-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-red-400 mb-1">Heat Index</h3>
                      <p className="text-sm text-[#fefae0]">
                        A measure of how hot it really feels when relative humidity is factored in with the actual air
                        temperature.
                      </p>
                    </div>

                    <div className="p-3 border border-blue-600 bg-blue-900 bg-opacity-20 rounded-md">
                      <h3 className="font-semibold text-blue-400 mb-1">Heat Cramps</h3>
                      <p className="text-sm text-[#fefae0]">
                        Muscle pains or spasms that usually occur in the abdomen, arms, or legs. They may occur during
                        strenuous activity in a hot environment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="weather-card">
              <CardHeader>
                <CardTitle className="text-[#ffbe0b]">Heat Wave Safety Plan</CardTitle>
                <CardDescription className="text-[#F3F3E0]">Stay safe during extreme heat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#ffbe0b]">Home Preparation</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                      <li>Install window air conditioners</li>
                      <li>Insulate air conditioning ducts</li>
                      <li>Install temporary window reflectors</li>
                      <li>Weather-strip doors and windows</li>
                      <li>Cover windows with drapes or shades</li>
                    </ul>
                    <div className="p-3 bg-[#2A2A2A] rounded-md">
                      <h4 className="font-semibold mb-1 text-[#fb5607]">Emergency Supplies</h4>
                      <ul className="space-y-1 text-[#f7ede2]">
                        <li>Water</li>
                        <li>Electrolyte drinks</li>
                        <li>Ice packs</li>
                        <li>Battery-powered fan</li>
                        <li>First aid kit</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#ffbe0b]">Heat-Related Illnesses</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                      <li>Heat cramps</li>
                      <li>Heat exhaustion</li>
                      <li>Heat stroke</li>
                      <li>Sunburn</li>
                      <li>Heat rash</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-[#ffbe0b]">If You're Outside</h3>
                    <ul className="space-y-2 list-disc pl-5 text-[#FFFFFF]">
                      <li>Limit outdoor activities</li>
                      <li>Wear lightweight clothing</li>
                      <li>Take frequent breaks</li>
                      <li>Stay hydrated</li>
                      <li>Use sunscreen</li>
                      <li>Find shade</li>
                      <li>Monitor local news</li>
                      <li>Know the signs of heat-related illnesses</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Historical Events Tab */}
          <TabsContent value="historical" className="space-y-6">
            <Card className="weather-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#b08968]">
                  <History className="h-5 w-5 text-purple-500" />
                  Historical Disaster Events
                </CardTitle>
                <CardDescription className="text-[#ddbea9]">Search and explore major historical disaster events by country</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by country name..."
                      className="w-full p-3 pl-10 bg-[#2A2A2A] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={(e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        const filteredEvents = historicalEvents.filter(event =>
                          event.country.toLowerCase().includes(searchTerm)
                        );
                        setFilteredEvents(filteredEvents);
                      }}
                    />
                    <svg
                      className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="weather-card hover:bg-[#2A2A2A] transition-colors cursor-pointer bg-[#FFFFFF]"
                      onClick={() => window.open(event.blogUrl, '_blank')}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 ">
                          <span role="img" aria-label="Event">🧭</span>
                          {event.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span role="img" aria-label="Country">🌍</span>
                          {event.country}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span role="img" aria-label="Date">📅</span>
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span role="img" aria-label="Type">⚠️</span>
                            {event.type}
                          </div>
                          <p className="text-sm mt-2">{event.summary}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant */}
      {showAIAssistant && <DisasterAIAssistant onClose={() => setShowAIAssistant(false)} />}
    </div>
  )
}
