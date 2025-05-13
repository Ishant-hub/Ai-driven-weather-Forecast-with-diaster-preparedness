"use client"

import { useEffect, useRef } from "react"

interface WeatherIconProps {
  condition: "sunny" | "rainy" | "cloudy" | "snowy" | "stormy"
  size?: number
}

export function WeatherIcon({ condition, size = 48 }: WeatherIconProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw based on condition
    switch (condition) {
      case "sunny":
        drawSun(ctx, size)
        break
      case "rainy":
        drawRain(ctx, size)
        break
      case "cloudy":
        drawCloud(ctx, size)
        break
      case "snowy":
        drawSnow(ctx, size)
        break
      case "stormy":
        drawStorm(ctx, size)
        break
    }
  }, [condition, size])

  return (
    <canvas
      ref={canvasRef}
      className="weather-icon"
      width={size}
      height={size}
    />
  )
}

function drawSun(ctx: CanvasRenderingContext2D, size: number) {
  const center = size / 2
  const radius = size * 0.3

  // Draw sun circle
  ctx.beginPath()
  ctx.arc(center, center, radius, 0, Math.PI * 2)
  ctx.fillStyle = "#FFD700"
  ctx.fill()

  // Draw sun rays
  const rayLength = size * 0.15
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4
    const x1 = center + Math.cos(angle) * radius
    const y1 = center + Math.sin(angle) * radius
    const x2 = center + Math.cos(angle) * (radius + rayLength)
    const y2 = center + Math.sin(angle) * (radius + rayLength)

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = "#FFD700"
    ctx.lineWidth = 2
    ctx.stroke()
  }
}

function drawRain(ctx: CanvasRenderingContext2D, size: number) {
  const center = size / 2
  const cloudRadius = size * 0.25

  // Draw cloud
  ctx.beginPath()
  ctx.arc(center, center - cloudRadius * 0.5, cloudRadius, 0, Math.PI * 2)
  ctx.fillStyle = "#A9A9A9"
  ctx.fill()

  // Draw raindrops
  for (let i = 0; i < 5; i++) {
    const x = center + (i - 2) * (cloudRadius / 2)
    const y = center + cloudRadius * 0.5
    const dropLength = size * 0.15

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + dropLength)
    ctx.strokeStyle = "#4169E1"
    ctx.lineWidth = 2
    ctx.stroke()
  }
}

function drawCloud(ctx: CanvasRenderingContext2D, size: number) {
  const center = size / 2
  const cloudRadius = size * 0.25

  // Draw cloud
  ctx.beginPath()
  ctx.arc(center, center, cloudRadius, 0, Math.PI * 2)
  ctx.arc(center + cloudRadius * 0.5, center, cloudRadius * 0.8, 0, Math.PI * 2)
  ctx.arc(center - cloudRadius * 0.5, center, cloudRadius * 0.8, 0, Math.PI * 2)
  ctx.fillStyle = "#A9A9A9"
  ctx.fill()
}

function drawSnow(ctx: CanvasRenderingContext2D, size: number) {
  const center = size / 2
  const cloudRadius = size * 0.25

  // Draw cloud
  ctx.beginPath()
  ctx.arc(center, center - cloudRadius * 0.5, cloudRadius, 0, Math.PI * 2)
  ctx.fillStyle = "#A9A9A9"
  ctx.fill()

  // Draw snowflakes
  for (let i = 0; i < 5; i++) {
    const x = center + (i - 2) * (cloudRadius / 2)
    const y = center + cloudRadius * 0.5
    const flakeSize = size * 0.05

    ctx.beginPath()
    ctx.arc(x, y, flakeSize, 0, Math.PI * 2)
    ctx.fillStyle = "#FFFFFF"
    ctx.fill()
  }
}

function drawStorm(ctx: CanvasRenderingContext2D, size: number) {
  const center = size / 2
  const cloudRadius = size * 0.25

  // Draw cloud
  ctx.beginPath()
  ctx.arc(center, center - cloudRadius * 0.5, cloudRadius, 0, Math.PI * 2)
  ctx.fillStyle = "#4B4B4B"
  ctx.fill()

  // Draw lightning
  const lightningPoints = [
    [center, center + cloudRadius * 0.5],
    [center - cloudRadius * 0.3, center + cloudRadius * 0.8],
    [center, center + cloudRadius * 0.6],
    [center + cloudRadius * 0.3, center + cloudRadius * 0.9],
  ]

  ctx.beginPath()
  ctx.moveTo(lightningPoints[0][0], lightningPoints[0][1])
  for (let i = 1; i < lightningPoints.length; i++) {
    ctx.lineTo(lightningPoints[i][0], lightningPoints[i][1])
  }
  ctx.strokeStyle = "#FFD700"
  ctx.lineWidth = 2
  ctx.stroke()
} 