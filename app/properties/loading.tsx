export default function PropertiesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title Skeleton */}
      <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter Skeleton */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
          </div>
          <div className="h-10 bg-gray-200 rounded-xl animate-pulse mt-4" />
        </div>

        {/* Property Cards Skeleton Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm animate-pulse space-y-4"
            >
              {/* Image Skeleton */}
              <div className="w-full h-48 bg-gray-200 rounded-2xl" />

              {/* Title & Price Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>

              {/* Badges Skeleton */}
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-12 bg-gray-200 rounded-lg" />
                <div className="h-6 w-12 bg-gray-200 rounded-lg" />
                <div className="h-6 w-12 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}