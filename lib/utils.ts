import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

export function getWeatherIcon(condition: string): string {
  const conditionLower = condition.toLowerCase()

  if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
    return "sun"
  } else if (conditionLower.includes("cloud") && conditionLower.includes("rain")) {
    return "cloud-rain"
  } else if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
    return "cloud-rain"
  } else if (conditionLower.includes("cloud")) {
    return "cloud"
  } else if (conditionLower.includes("snow")) {
    return "cloud-snow"
  } else if (conditionLower.includes("thunder") || conditionLower.includes("lightning")) {
    return "cloud-lightning"
  } else if (conditionLower.includes("fog") || conditionLower.includes("mist")) {
    return "cloud-fog"
  } else {
    return "sun"
  }
}

export function getBackgroundColor(temp: number): string {
  if (temp >= 30) {
    return "bg-gradient-to-br from-orange-400 to-red-500"
  } else if (temp >= 20) {
    return "bg-gradient-to-br from-yellow-300 to-orange-400"
  } else if (temp >= 10) {
    return "bg-gradient-to-br from-blue-200 to-blue-300"
  } else {
    return "bg-gradient-to-br from-blue-300 to-blue-500"
  }
}
