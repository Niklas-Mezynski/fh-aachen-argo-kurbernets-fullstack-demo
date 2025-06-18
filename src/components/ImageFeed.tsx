import fs from "fs";
import path from "path";
import { getVotes } from "../lib/votes";
import { UpvoteButton } from "./UpvoteButton";
import { CorgiImage } from "./CorgiImage";

export default async function ImageFeed() {
  const images = await getImages();
  const imagesWithRating = images.map((imageName) => {
    const votes = getVotes(imageName);
    return {
      imageName,
      displayName: imageName
        .replace(/\.(png|jpg|jpeg)$/i, "")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      votes,
    };
  });

  return images.length > 0 ? (
    imagesWithRating.map(({ imageName, votes, displayName }, index) => {
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
          <CorgiImage
            imageName={imageName}
            displayName={displayName}
            priority={index < 2}
          />

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
    })
  ) : (
    <div className="text-center py-12">
      <p className="text-gray-500">
        Keine Corgi-Bilder im Assets-Ordner gefunden.
      </p>
    </div>
  );
}

async function getImages() {
  const publicDir = path.join(process.cwd(), "public");

  try {
    const files = await fs.promises.readdir(publicDir);
    const imageFiles = files.filter((file) =>
      /\.(png|jpg|jpeg|gif|webp)$/i.test(file)
    );

    // Prefer WebP versions over other formats
    const preferredImages = new Set<string>();
    const webpFiles = imageFiles.filter((file) => file.endsWith(".webp"));

    // Add WebP files first
    webpFiles.forEach((file) => {
      preferredImages.add(file);
    });

    // Add non-WebP files only if WebP version doesn't exist
    imageFiles.forEach((file) => {
      if (!file.endsWith(".webp")) {
        const nameWithoutExt = file.replace(/\.(png|jpg|jpeg|gif)$/i, "");
        const webpVersion = `${nameWithoutExt}.webp`;
        if (!webpFiles.includes(webpVersion)) {
          preferredImages.add(file);
        }
      }
    });

    return Array.from(preferredImages);
  } catch (e) {
    console.error("Error reading public directory:", e);
    return [];
  }
}
