"use server"

import type { WeatherData, CityWeatherData, WeatherAlert } from "@/lib/types"

// Get API key from environment variables
const WEATHER_API_KEY = "8468dbdbfc014915be4182411252604"

// Helper function to handle API calls with retries
async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          ...options.headers,
        },
      })
      
      if (response.ok) {
        return response
      }
      
      // If we get a 403, the API key might be invalid
      if (response.status === 403) {
        throw new Error("Invalid API key or API key has been disabled")
      }
      
      // If we get a 429, we're being rate limited
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 1000 * (i + 1)
        await new Promise(resolve => setTimeout(resolve, waitTime))
        continue
      }
      
      throw new Error(`HTTP error! status: ${response.status}`)
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
  throw new Error("Max retries reached")
}

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    // Make sure we have a valid location string
    const safeLocation = location && location.trim() ? location : "London"

    const response = await fetchWithRetry(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(
        safeLocation,
      )}&days=7&aqi=yes&alerts=yes`,
      { next: { revalidate: 1800 } }
    )

    const data = await response.json()
    return data as WeatherData
  } catch (error) {
    console.error("Failed to fetch weather data:", error)
    throw new Error("Failed to fetch weather data. Please try again later.")
  }
}

export async function getPopularCitiesWeather(): Promise<CityWeatherData[]> {
  try {
    // List of popular cities to get weather for
    const cities = ["New York", "London", "Tokyo", "Sydney", "Paris", "Dubai", "Rio de Janeiro", "Cape Town"]

    const promises = cities.map(async (city) => {
      const response = await fetchWithRetry(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}`,
        { next: { revalidate: 3600 } }
      )

      const data = await response.json()

      return {
        name: data.location.name,
        country: data.location.country,
        temp_c: data.current.temp_c,
        condition: data.current.condition,
      }
    })

    const results = await Promise.all(promises)
    return results
  } catch (error) {
    console.error("Failed to fetch cities weather data:", error)
    throw new Error("Failed to fetch cities weather data. Please try again later.")
  }
}

export async function getWeatherAlerts(location: string): Promise<WeatherAlert[]> {
  try {
    const response = await fetchWithRetry(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(
        location,
      )}&days=1&aqi=no&alerts=yes`,
      { next: { revalidate: 1800 } }
    )

    const data = await response.json()
    return data.alerts?.alert || []
  } catch (error) {
    console.error("Failed to fetch weather alerts:", error)
    throw new Error("Failed to fetch weather alerts. Please try again later.")
  }
}

export async function searchLocations(query: string) {
  if (!query || query.length < 3) return []

  try {
    const response = await fetchWithRetry(
      `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(query)}`,
      { next: { revalidate: 86400 } }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to search locations:", error)
    return []
  }
}
