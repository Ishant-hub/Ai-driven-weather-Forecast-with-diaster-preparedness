import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingDashboard() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="rounded-3xl bg-[#1E1E1E] p-6 shadow-xl">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-full" />
          </div>

          <Skeleton className="h-10 w-80 rounded-full" />

          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>

            <Skeleton className="h-8 w-32" />
          </div>

          <div className="grid grid-cols-7 gap-4 mt-4">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
          </div>

          <div className="mt-6 h-40">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        </div>

        {/* Map and Cities Section */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          <div className="col-span-3">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>

          <div className="col-span-1">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
