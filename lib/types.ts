// Weather API types
export interface WeatherData {
  location: {
    name: string
    country: string
    localtime: string
    lat: number
    lon: number
  }
  current: {
    temp_c: number
    condition: {
      text: string
      icon: string
    }
    wind_kph: number
    pressure_mb: number
    humidity: number
    feelslike_c: number
    uv: number
    air_quality?: AirQualityData
  }
  forecast: {
    forecastday: ForecastDay[]
  }
}

export interface ForecastDay {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    avgtemp_c: number
    condition: {
      text: string
      icon: string
    }
    daily_chance_of_rain: number
    air_quality?: AirQualityData
  }
  astro: {
    sunrise: string
    sunset: string
  }
  hour: HourForecast[]
}

export interface HourForecast {
  time: string
  temp_c: number
  chance_of_rain: number
  condition: {
    text: string
    icon: string
  }
}

export interface CityWeatherData {
  name: string
  country: string
  temp_c: number
  condition: {
    text: string
    icon: string
  }
}

export interface WeatherAlert {
  headline: string
  severity: string
  urgency: string
  areas: string
  description: string
  effective: string
  expires: string
}

export interface AirQualityData {
  co: number
  no2: number
  o3: number
  so2: number
  pm2_5: number
  pm10: number
  "us-epa-index": number
  "gb-defra-index": number
}
