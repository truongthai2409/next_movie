"use client";

export function LoadingSkeleton() {
  return (
    <div className="p-8 mt-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Loading...</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-96 w-full"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="flex gap-4">
                <div className="h-12 bg-gray-300 rounded w-32"></div>
                <div className="h-12 bg-gray-300 rounded w-32"></div>
                <div className="h-12 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
