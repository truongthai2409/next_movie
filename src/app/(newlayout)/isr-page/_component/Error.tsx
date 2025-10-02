"use client";

import Link from "next/link";

export function ErrorModal() {
  return (
    <div className="p-8 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">
            Error Loading Image
          </h1>
          <p className="text-gray-600 mb-6">
            Sorry, we could not load the image. Please try again.
          </p>
          <Link
            href="/isr-page"
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
