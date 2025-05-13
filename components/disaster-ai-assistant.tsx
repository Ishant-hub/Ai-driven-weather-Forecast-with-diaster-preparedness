"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, AlertTriangle, Loader2, Info } from "lucide-react"

// Enhanced disaster-related datasets
const disasterData = {
  general: {
    greetings: [
      "Hello! I'm your Disaster Preparedness Assistant. How can I help you today?",
      "Hi there! I'm here to help you with disaster preparedness information. What would you like to know?",
      "Welcome! I'm your AI assistant for disaster safety. How can I assist you?",
      "Greetings! I'm your disaster safety guide. What information do you need?",
      "Hello! I'm here to help you prepare for and respond to disasters. What can I tell you about?",
    ],
    farewells: [
      "Stay safe! Feel free to ask if you need more information.",
      "Take care! Remember, being prepared is the best defense against disasters.",
      "Goodbye! Don't hesitate to return if you have more questions.",
      "Stay prepared! Come back anytime you need disaster safety information.",
      "Take care and stay safe! Remember to check your emergency supplies regularly.",
    ],
    unknown: [
      "I'm not sure about that, but I can help you with disaster preparedness information.",
      "I don't have information on that specific topic, but I can tell you about disaster safety measures.",
      "I'm still learning about that, but I can help you with emergency preparedness.",
      "I don't have that specific information, but I can provide general disaster safety guidance.",
      "I'm not familiar with that topic, but I can help you prepare for common disasters.",
    ],
    help: [
      "I can help you with information about various disasters, emergency contacts, safety tips, and preparedness measures.",
      "You can ask me about earthquakes, floods, hurricanes, wildfires, winter storms, heatwaves, and more.",
      "I can provide emergency contact numbers, safety guidelines, and preparation steps for different types of disasters.",
      "Feel free to ask about specific disasters, emergency procedures, or general safety information.",
      "I can help you understand warning signs, emergency responses, and preventive measures for various disasters.",
    ],
  },
  disasterTypes: {
    earthquake: {
      symptoms: [
        "Ground shaking",
        "Rumbling noise",
        "Building swaying",
        "Falling objects",
        "Power outages",
        "Gas leaks",
      ],
      actions: [
        "Drop, Cover, and Hold On",
        "Stay indoors",
        "Stay away from windows",
        "Turn off gas if you smell a leak",
        "Check for injuries",
        "Be prepared for aftershocks",
      ],
      preparation: [
        "Secure heavy furniture",
        "Create emergency kit",
        "Practice drills",
        "Know safe spots in each room",
        "Learn how to turn off utilities",
        "Have a family communication plan",
      ],
      afterEffects: [
        "Check for structural damage",
        "Be aware of aftershocks",
        "Avoid damaged buildings",
        "Check for gas leaks",
        "Listen to emergency broadcasts",
        "Help others if safe to do so",
      ],
    },
    flood: {
      symptoms: [
        "Rising water levels",
        "Heavy rainfall",
        "Flash flood warnings",
        "Saturated ground",
        "Rapid water flow",
        "Debris in water",
      ],
      actions: [
        "Move to higher ground",
        "Avoid flood waters",
        "Follow evacuation orders",
        "Stay informed about water levels",
        "Avoid walking or driving in flood waters",
        "Keep emergency supplies ready",
      ],
      preparation: [
        "Know your flood risk",
        "Have flood insurance",
        "Create evacuation plan",
        "Prepare emergency kit",
        "Elevate electrical equipment",
        "Install check valves",
      ],
      afterEffects: [
        "Wait for authorities to declare area safe",
        "Check for structural damage",
        "Document damage for insurance",
        "Clean and disinfect affected areas",
        "Check for electrical hazards",
        "Monitor local news for updates",
      ],
    },
    hurricane: {
      symptoms: [
        "Strong winds",
        "Heavy rain",
        "Storm surge warnings",
        "Rising water levels",
        "Power outages",
        "Flying debris",
      ],
      actions: [
        "Evacuate if ordered",
        "Stay indoors",
        "Monitor weather updates",
        "Secure outdoor objects",
        "Fill bathtubs with water",
        "Keep emergency supplies ready",
      ],
      preparation: [
        "Secure outdoor items",
        "Stock emergency supplies",
        "Know evacuation routes",
        "Prepare emergency kit",
        "Review insurance policies",
        "Have backup power sources",
      ],
      afterEffects: [
        "Wait for official all-clear",
        "Check for structural damage",
        "Avoid flood waters",
        "Document damage",
        "Check for gas leaks",
        "Help neighbors if safe",
      ],
    },
    wildfire: {
      symptoms: [
        "Smoke",
        "Ash falling",
        "Strong winds",
        "Red sky",
        "Burning smell",
        "Evacuation orders",
      ],
      actions: [
        "Evacuate immediately",
        "Follow emergency alerts",
        "Stay informed",
        "Close all windows and doors",
        "Turn off gas and electricity",
        "Wear protective clothing",
      ],
      preparation: [
        "Create defensible space",
        "Have evacuation plan",
        "Prepare emergency kit",
        "Keep gutters clean",
        "Store important documents",
        "Know evacuation routes",
      ],
      afterEffects: [
        "Wait for official all-clear",
        "Check for hot spots",
        "Wear protective gear",
        "Document damage",
        "Check air quality",
        "Help others if safe",
      ],
    },
    winterStorm: {
      symptoms: [
        "Heavy snowfall",
        "Freezing temperatures",
        "Ice accumulation",
        "Power outages",
        "Poor visibility",
        "Wind chill warnings",
      ],
      actions: [
        "Stay indoors",
        "Keep warm",
        "Conserve heat",
        "Check on neighbors",
        "Avoid unnecessary travel",
        "Monitor weather updates",
      ],
      preparation: [
        "Winterize home",
        "Stock emergency supplies",
        "Prepare vehicle",
        "Have backup heat source",
        "Insulate pipes",
        "Have emergency kit ready",
      ],
      afterEffects: [
        "Clear snow safely",
        "Check for damage",
        "Monitor for hypothermia",
        "Check on vulnerable neighbors",
        "Avoid overexertion",
        "Stay informed about conditions",
      ],
    },
    heatwave: {
      symptoms: [
        "High temperatures",
        "Humidity",
        "Heat index warnings",
        "Power outages",
        "Dehydration",
        "Heat-related illnesses",
      ],
      actions: [
        "Stay hydrated",
        "Stay in cool places",
        "Limit outdoor activities",
        "Wear light clothing",
        "Check on vulnerable people",
        "Monitor weather updates",
      ],
      preparation: [
        "Install air conditioning",
        "Have backup power",
        "Know cooling centers",
        "Prepare emergency kit",
        "Learn heat illness signs",
        "Have water supply ready",
      ],
      afterEffects: [
        "Continue staying hydrated",
        "Monitor for heat illness",
        "Check on vulnerable people",
        "Stay informed about conditions",
        "Avoid strenuous activity",
        "Keep cool spaces ready",
      ],
    },
  },
  emergencyContacts: {
    general: "911",
    poison: "1-800-222-1222",
    redCross: "1-800-RED-CROSS",
    fema: "1-800-621-FEMA",
    weather: "1-800-WEATHER",
    power: "1-800-POWER-ON",
    gas: "1-800-GAS-LEAK",
    water: "1-800-WATER-EMERGENCY",
  },
  safetyTips: {
    general: [
      "Always have an emergency kit ready",
      "Keep important documents in a safe place",
      "Have a family emergency plan",
      "Stay informed about local risks",
      "Practice emergency drills regularly",
      "Know your evacuation routes",
      "Have backup power sources",
      "Keep emergency contacts updated",
    ],
    communication: [
      "Have backup communication methods",
      "Keep phone charged during emergencies",
      "Know emergency contact numbers",
      "Have a meeting point for family",
      "Use text messages instead of calls",
      "Have a battery-powered radio",
      "Share your location with family",
      "Use social media for updates",
    ],
    firstAid: [
      "Keep a well-stocked first aid kit",
      "Learn basic first aid skills",
      "Know how to treat common injuries",
      "Have emergency medications ready",
      "Know CPR and basic life support",
      "Keep medical records accessible",
      "Have emergency medical contacts",
      "Know local hospital locations",
    ],
    supplies: [
      "Three days of water per person",
      "Non-perishable food",
      "First aid supplies",
      "Flashlights and batteries",
      "Emergency radio",
      "Extra clothing and blankets",
      "Personal hygiene items",
      "Important documents",
    ],
  },
  warningSigns: {
    general: [
      "Unusual weather patterns",
      "Emergency alerts",
      "Evacuation orders",
      "Power outages",
      "Unusual animal behavior",
      "Structural damage",
    ],
    weather: [
      "Dark clouds",
      "Strong winds",
      "Heavy rainfall",
      "Rapid temperature changes",
      "Unusual humidity",
      "Storm warnings",
    ],
    environmental: [
      "Smoke or ash",
      "Rising water levels",
      "Ground movement",
      "Gas leaks",
      "Chemical spills",
      "Air quality changes",
    ],
  },
}

export default function DisasterAIAssistant({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: disasterData.general.greetings[0], isUser: false },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const processUserInput = (text: string) => {
    const lowerText = text.toLowerCase()
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      let response = ""

      // Handle historical disaster queries
      if (lowerText.includes("kedarnath") || lowerText.includes("uttarakhand flood")) {
        response = `The Kedarnath Flood (June 2013) was one of India's worst natural disasters:\n\n` +
          `• Date: June 2013\n` +
          `• Location: Uttarakhand, India\n` +
          `• Type: Flash Flood and Landslide\n` +
          `• Casualties: Over 5,000 people died\n` +
          `• Impact: Thousands were stranded, massive infrastructure damage\n` +
          `• Cause: Heavy rainfall and cloudburst triggered flash floods and landslides\n` +
          `• Recovery: Major rescue operations were conducted by Indian Armed Forces\n\n` +
          `This disaster led to significant changes in disaster management policies in India.`
      }
      else if (lowerText.includes("bhopal") || lowerText.includes("gas tragedy")) {
        response = `The Bhopal Gas Tragedy (December 3, 1984):\n\n` +
          `• Date: December 3, 1984\n` +
          `• Location: Bhopal, Madhya Pradesh\n` +
          `• Type: Industrial Disaster\n` +
          `• Casualties: Over 15,000 deaths\n` +
          `• Impact: Affected 500,000+ people\n` +
          `• Cause: Methyl isocyanate gas leak from Union Carbide plant\n` +
          `• Legacy: World's worst industrial disaster, led to major industrial safety reforms`
      }
      else if (lowerText.includes("kangra") || lowerText.includes("1905 earthquake")) {
        response = `The Kangra Earthquake (April 4, 1905):\n\n` +
          `• Date: April 4, 1905\n` +
          `• Location: Kangra, Himachal Pradesh\n` +
          `• Type: Earthquake\n` +
          `• Magnitude: 7.8\n` +
          `• Casualties: Over 19,000 deaths\n` +
          `• Impact: Destroyed thousands of buildings, including the Kangra Fort\n` +
          `• Legacy: One of the deadliest earthquakes in Indian history`
      }
      else if (lowerText.includes("bihar") || lowerText.includes("1934 earthquake")) {
        response = `The Bihar-Nepal Earthquake (January 15, 1934):\n\n` +
          `• Date: January 15, 1934\n` +
          `• Location: Bihar and Nepal\n` +
          `• Type: Earthquake\n` +
          `• Magnitude: 8.0\n` +
          `• Casualties: Over 10,000 deaths in India\n` +
          `• Impact: Massive destruction across Bihar and Nepal\n` +
          `• Legacy: Led to improvements in earthquake-resistant construction`
      }
      else if (lowerText.includes("bengal") || lowerText.includes("1943 famine")) {
        response = `The Bengal Famine (1943):\n\n` +
          `• Date: 1943\n` +
          `• Location: Bengal (now West Bengal and Bangladesh)\n` +
          `• Type: Famine\n` +
          `• Casualties: Estimated 2-3 million deaths\n` +
          `• Impact: Widespread starvation and disease\n` +
          `• Cause: Complex factors including World War II, crop failure, and policy decisions\n` +
          `• Legacy: Led to significant changes in food security policies`
      }
      else if (lowerText.includes("assam") || lowerText.includes("1950 earthquake")) {
        response = `The Assam Earthquake (August 15, 1950):\n\n` +
          `• Date: August 15, 1950\n` +
          `• Location: Assam\n` +
          `• Type: Earthquake\n` +
          `• Magnitude: 8.6\n` +
          `• Impact: Affected over 30 million people\n` +
          `• Cause: Massive landslides and flooding\n` +
          `• Legacy: One of the most powerful earthquakes ever recorded`
      }
      else if (lowerText.includes("bhola") || lowerText.includes("1970 cyclone")) {
        response = `The Bhola Cyclone (November 12, 1970):\n\n` +
          `• Date: November 12, 1970\n` +
          `• Location: West Bengal and Bangladesh\n` +
          `• Type: Cyclone\n` +
          `• Casualties: Over 500,000 deaths\n` +
          `• Impact: Devastated coastal areas\n` +
          `• Legacy: Deadliest tropical cyclone ever recorded`
      }
      else if (lowerText.includes("morbi") || lowerText.includes("dam failure")) {
        response = `The Morbi Dam Failure (August 11, 1979):\n\n` +
          `• Date: August 11, 1979\n` +
          `• Location: Morbi, Gujarat\n` +
          `• Type: Dam Failure\n` +
          `• Casualties: Over 5,000 deaths\n` +
          `• Impact: Destroyed thousands of homes\n` +
          `• Cause: Dam collapse due to heavy rainfall\n` +
          `• Legacy: Led to stricter dam safety regulations`
      }
      else if (lowerText.includes("latur") || lowerText.includes("1993 earthquake")) {
        response = `The Latur Earthquake (September 30, 1993):\n\n` +
          `• Date: September 30, 1993\n` +
          `• Location: Latur, Maharashtra\n` +
          `• Type: Earthquake\n` +
          `• Magnitude: 6.4\n` +
          `• Casualties: Over 9,000 deaths\n` +
          `• Impact: Destroyed 52 villages\n` +
          `• Legacy: Led to improved earthquake preparedness in Maharashtra`
      }
      else if (lowerText.includes("odisha") || lowerText.includes("1999 cyclone")) {
        response = `The Odisha Super Cyclone (October 29, 1999):\n\n` +
          `• Date: October 29, 1999\n` +
          `• Location: Odisha\n` +
          `• Type: Cyclone\n` +
          `• Category: 5\n` +
          `• Casualties: Over 10,000 deaths\n` +
          `• Impact: Massive infrastructure damage\n` +
          `• Legacy: Led to improved cyclone warning systems`
      }
      else if (lowerText.includes("gujarat") || lowerText.includes("2001 earthquake")) {
        response = `The Gujarat Earthquake (January 26, 2001):\n\n` +
          `• Date: January 26, 2001\n` +
          `• Location: Gujarat\n` +
          `• Type: Earthquake\n` +
          `• Magnitude: 7.7\n` +
          `• Casualties: Over 20,000 deaths\n` +
          `• Impact: Destroyed nearly 400,000 homes\n` +
          `• Legacy: Led to major improvements in earthquake-resistant construction`
      }
      else if (lowerText.includes("tsunami") || lowerText.includes("2004")) {
        response = `The Indian Ocean Tsunami (December 26, 2004):\n\n` +
          `• Date: December 26, 2004\n` +
          `• Location: Coastal areas of India\n` +
          `• Type: Tsunami\n` +
          `• Casualties: Over 10,000 deaths in India\n` +
          `• Impact: Massive coastal destruction\n` +
          `• Cause: Undersea earthquake off Sumatra\n` +
          `• Legacy: Led to improved tsunami warning systems`
      }
      else if (lowerText.includes("mumbai") || lowerText.includes("2005 flood")) {
        response = `The Mumbai Floods (July 26, 2005):\n\n` +
          `• Date: July 26, 2005\n` +
          `• Location: Mumbai, Maharashtra\n` +
          `• Type: Flood\n` +
          `• Casualties: Over 1,000 deaths\n` +
          `• Impact: Extensive damage to infrastructure\n` +
          `• Cause: Heavy rainfall and poor drainage\n` +
          `• Legacy: Led to improved urban flood management`
      }
      else if (lowerText.includes("kashmir") || lowerText.includes("2005 earthquake")) {
        response = `The Kashmir Earthquake (October 8, 2005):\n\n` +
          `• Date: October 8, 2005\n` +
          `• Location: Jammu and Kashmir\n` +
          `• Type: Earthquake\n` +
          `• Magnitude: 7.6\n` +
          `• Impact: Significant damage and loss of life\n` +
          `• Legacy: Led to improved disaster response in the region`
      }
      else if (lowerText.includes("chennai") || lowerText.includes("2015 flood")) {
        response = `The Chennai Floods (November-December 2015):\n\n` +
          `• Date: November-December 2015\n` +
          `• Location: Chennai, Tamil Nadu\n` +
          `• Type: Flood\n` +
          `• Casualties: Over 500 deaths\n` +
          `• Impact: Massive infrastructure damage\n` +
          `• Cause: Heavy rainfall and poor urban planning\n` +
          `• Legacy: Led to improved urban flood management`
      }
      else if (lowerText.includes("kerala") || lowerText.includes("2018 flood")) {
        response = `The Kerala Floods (August 2018):\n\n` +
          `• Date: August 2018\n` +
          `• Location: Kerala\n` +
          `• Type: Flood\n` +
          `• Casualties: Over 400 deaths\n` +
          `• Impact: More than a million people displaced\n` +
          `• Cause: Unusually high rainfall\n` +
          `• Legacy: Led to improved flood management systems`
      }
      else if (lowerText.includes("amphan") || lowerText.includes("2020 cyclone")) {
        response = `Cyclone Amphan (May 20, 2020):\n\n` +
          `• Date: May 20, 2020\n` +
          `• Location: West Bengal and Odisha\n` +
          `• Type: Cyclone\n` +
          `• Impact: Extensive damage and displacement\n` +
          `• Legacy: Highlighted the importance of disaster preparedness during COVID-19`
      }
      else if (lowerText.includes("uttarakhand") || lowerText.includes("2021 glacier")) {
        response = `The Uttarakhand Glacier Burst (February 7, 2021):\n\n` +
          `• Date: February 7, 2021\n` +
          `• Location: Uttarakhand\n` +
          `• Type: Glacial Disaster\n` +
          `• Casualties: Over 200 deaths\n` +
          `• Impact: Massive flooding and infrastructure damage\n` +
          `• Cause: Glacier burst in the Himalayas\n` +
          `• Legacy: Led to increased focus on climate change impacts`
      }
      // Handle general flood queries
      else if (lowerText.includes("flood")) {
        if (lowerText.includes("prepare") || lowerText.includes("before")) {
          response = `Flood Preparation:\n${disasterData.disasterTypes.flood.preparation.join("\n")}`
        } else if (lowerText.includes("after") || lowerText.includes("recovery")) {
          response = `After a Flood:\n${disasterData.disasterTypes.flood.afterEffects.join("\n")}`
        } else {
          response = `Flood Safety Measures:\n${disasterData.disasterTypes.flood.actions.join("\n")}`
        }
      }
      // Handle earthquake queries
      else if (lowerText.includes("earthquake")) {
        if (lowerText.includes("prepare") || lowerText.includes("before")) {
          response = `Earthquake Preparation:\n${disasterData.disasterTypes.earthquake.preparation.join("\n")}`
        } else if (lowerText.includes("after") || lowerText.includes("recovery")) {
          response = `After an Earthquake:\n${disasterData.disasterTypes.earthquake.afterEffects.join("\n")}`
        } else {
          response = `During an Earthquake:\n${disasterData.disasterTypes.earthquake.actions.join("\n")}`
        }
      }
      // Handle cyclone queries
      else if (lowerText.includes("cyclone")) {
        if (lowerText.includes("prepare") || lowerText.includes("before")) {
          response = `Cyclone Preparation:\n${disasterData.disasterTypes.hurricane.preparation.join("\n")}`
        } else if (lowerText.includes("after") || lowerText.includes("recovery")) {
          response = `After a Cyclone:\n${disasterData.disasterTypes.hurricane.afterEffects.join("\n")}`
        } else {
          response = `Cyclone Safety Measures:\n${disasterData.disasterTypes.hurricane.actions.join("\n")}`
        }
      }
      // Handle general safety queries
      else if (lowerText.includes("safety") || lowerText.includes("tips")) {
        response = `General Safety Tips:\n${disasterData.safetyTips.general.join("\n")}`
      }
      // Handle emergency contact queries
      else if (lowerText.includes("emergency") && lowerText.includes("contact")) {
        response = `Emergency Contacts:\nGeneral: ${disasterData.emergencyContacts.general}\nPoison Control: ${disasterData.emergencyContacts.poison}\nRed Cross: ${disasterData.emergencyContacts.redCross}\nFEMA: ${disasterData.emergencyContacts.fema}`
      }
      // Handle help requests
      else if (lowerText.includes("help") || lowerText.includes("what can you do")) {
        response = `I can help you with:\n\n` +
          `• Information about historical disasters in India\n` +
          `• Safety measures and preparedness tips\n` +
          `• Emergency contact information\n` +
          `• Specific disaster queries (floods, earthquakes, cyclones, etc.)\n` +
          `• General disaster preparedness guidance\n\n` +
          `Just ask me about any of these topics!`
      }
      // Handle greetings
      else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
        response = getRandomResponse(disasterData.general.greetings)
      }
      // Handle farewells
      else if (lowerText.includes("bye") || lowerText.includes("goodbye")) {
        response = getRandomResponse(disasterData.general.farewells)
      }
      // Default response for unknown queries
      else {
        response = `I'm not sure about that specific query, but I can help you with:\n\n` +
          `• Historical disasters in India\n` +
          `• Disaster preparedness tips\n` +
          `• Emergency procedures\n` +
          `• Safety measures\n\n` +
          `Please try asking about one of these topics!`
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }])
      setIsLoading(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [...prev, { text: input, isUser: true }])
    processUserInput(input)
    setInput("")
  }

  return (
    <Card className="fixed bottom-4 right-4 w-[400px] shadow-2xl border-0">
      <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-5 w-5" />
            Disaster AI Assistant
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-white hover:bg-red-800/50 transition-colors"
          >
          <X className="h-4 w-4" />
        </Button>
      </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea ref={scrollRef} className="h-[500px] px-4 py-4">
          <div className="space-y-4">
        {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
            <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.isUser
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white"
                      : "bg-gray-100 text-gray-900"
                  } shadow-sm`}
            >
                  {message.text.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
                  <Loader2 className="h-5 w-5 animate-spin text-red-600" />
            </div>
          </div>
        )}
      </div>
        </ScrollArea>
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about disaster preparedness..."
              className="flex-1 rounded-full border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
          <Button
              type="submit" 
              disabled={isLoading}
              className="rounded-full bg-red-600 hover:bg-red-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
