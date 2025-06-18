import fs from "fs";
import { Metadata } from "next";
import Image from "next/image";
import path from "path";
import { UpvoteButton } from "../components/UpvoteButton";
import { getVotes } from "../lib/votes";

export const metadata: Metadata = {
  title: "The Corgi Site",
};

export const dynamic = "force-dynamic"; // Ensure this page is always fresh

export default async function Home() {
  const images = await getImages();
  const imagesWithRating = await Promise.all(
    images.map(async (imageName) => {
      const votes = await getVotes(imageName);
      return {
        imageName,
        votes,
      };
    })
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Corgi Galerie</h1>
          <p className="text-gray-600 mt-2">
            Stimme für deine liebsten Corgi-Bilder ab!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="space-y-12">
          {imagesWithRating.map(({ imageName, votes }, index) => {
            const displayName = imageName
              .replace(/\.(png|jpg|jpeg)$/i, "")
              .replace(/[_-]/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <article
                key={imageName}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Article Header */}
                <div className="p-6 pb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {displayName}
                  </h2>
                  <div className="text-sm text-gray-500">Foto #{index + 1}</div>
                </div>

                {/* Image */}
                <div className="relative w-full">
                  <Image
                    src={`/${imageName}`}
                    alt={displayName}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority={index < 2}
                  />
                </div>

                {/* Footer with upvote */}
                <div className="p-6 pt-4">
                  <div className="flex justify-between items-center">
                    <UpvoteButton imageName={imageName} currentVotes={votes} />
                    <div className="text-sm text-gray-500">
                      Klicke den Gefällt-mir-Button um deine Liebe zu zeigen! 🐕
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer message */}
        {images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Keine Corgi-Bilder im Assets-Ordner gefunden.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

async function getImages() {
  const publicDir = path.join(process.cwd(), "public");

  try {
    const files = await fs.promises.readdir(publicDir);
    return files.filter((file) => /\.(png|jpg|jpeg|gif|webp)$/i.test(file));
  } catch (e) {
    console.error("Error reading public directory:", e);
    return [];
  }
}
