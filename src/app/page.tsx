import ImageFeed from "@/components/ImageFeed";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "The Corgi Site",
};

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Corgi Galerie
            {/* Corgi Galerie - Hallo EIT Kurs! */}
          </h1>
          <p className="text-gray-600 mt-2">
            Stimme für deine liebsten Corgi-Bilder ab!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="space-y-12">
          <Suspense
            fallback={<div className="text-center py-12">Loading feed...</div>}
          >
            <ImageFeed />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
