import React from "react";

export default function WeatherDashboardSkeleton() {
  return (
    <div className="container mx-auto p-4 max-w-7xl animate-pulse">
      <div className="rounded-3xl bg-[#1E1E1E] p-6 shadow-xl">
        {/* Top Navigation Bar Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-[#23242B]" />
            <div className="h-10 w-10 rounded-full bg-[#23242B]" />
            <div className="h-8 w-48 rounded-full bg-[#23242B]" />
            <div className="h-8 w-32 rounded-full bg-[#23242B]" />
          </div>
          <div className="h-10 w-80 rounded-full bg-[#23242B]" />
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-[#23242B]" />
            <div className="h-9 w-9 rounded-full bg-[#23242B]" />
            <div className="h-9 w-9 rounded-full bg-[#23242B]" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <div className="h-8 w-20 rounded-md bg-[#23242B]" />
            <div className="h-8 w-24 rounded-md bg-[#23242B]" />
            <div className="h-8 w-28 rounded-md bg-[#23242B]" />
          </div>
          <div className="flex justify-between items-center mt-4 mb-4">
            <div className="flex space-x-2">
              <div className="h-7 w-20 rounded-full bg-[#23242B]" />
              <div className="h-7 w-20 rounded-full bg-[#23242B]" />
            </div>
            <div className="h-7 w-32 rounded-full bg-[#23242B]" />
          </div>

          {/* Today + 7 Days Skeleton */}
          <div className="grid grid-cols-7 gap-4 mt-4">
            {/* Today Card */}
            <div className="col-span-1 weather-card bg-[#4FC3F7] p-4 flex flex-col justify-between min-h-[220px]">
              <div className="h-6 w-20 rounded bg-[#B3E5FC] mb-2" />
              <div className="h-4 w-16 rounded bg-[#B3E5FC] mb-4" />
              <div className="h-12 w-24 rounded bg-[#B3E5FC] mb-4" />
              <div className="h-8 w-8 rounded-full bg-[#B3E5FC] mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-[#B3E5FC]" />
                <div className="h-4 w-20 rounded bg-[#B3E5FC]" />
              </div>
            </div>
            {/* 6 Forecast Cards */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-span-1 weather-card bg-[#181A20] p-4 flex flex-col items-center justify-between min-h-[220px]">
                <div className="h-6 w-16 rounded bg-[#23242B] mb-2" />
                <div className="h-8 w-8 rounded-full bg-[#23242B] mb-4" />
                <div className="h-8 w-12 rounded bg-[#23242B] mb-2" />
              </div>
            ))}
          </div>

          {/* Rain Chart Skeleton */}
          <div className="mt-6 flex items-end justify-between h-40">
            <div className="flex flex-col items-center mr-6 h-full justify-between">
              <div className="h-4 w-10 rounded bg-[#23242B] mb-2" />
              <div className="h-4 w-10 rounded bg-[#23242B] mb-2" />
              <div className="h-4 w-10 rounded bg-[#23242B]" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="rain-bar w-8" style={{ height: `${80 + i * 10}px`, background: '#4FC3F7' }} />
                <div className="h-4 w-8 rounded bg-[#23242B] mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Map and Cities Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="md:col-span-3">
            <div className="h-8 w-32 rounded bg-[#23242B] mb-4" />
            <div className="w-full h-[320px] rounded-2xl bg-[#181A20] flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-[#23242B]" />
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="h-8 w-40 rounded bg-[#23242B] mb-4" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="city-card bg-[#23242B] text-white flex items-center p-4 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-[#181A20] mr-4" />
                  <div className="flex-1">
                    <div className="h-4 w-24 rounded bg-[#181A20] mb-2" />
                    <div className="h-4 w-16 rounded bg-[#181A20]" />
                  </div>
                  <div className="h-8 w-8 rounded-full bg-[#181A20] ml-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 