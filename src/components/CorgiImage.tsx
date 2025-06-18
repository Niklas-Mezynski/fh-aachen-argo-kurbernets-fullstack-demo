"use client";

import Image from "next/image";

interface CorgiImageProps {
  imageName: string;
  displayName: string;
  priority?: boolean;
}

export function CorgiImage({
  imageName,
  displayName,
  priority = false,
}: CorgiImageProps) {
  return (
    <div className="relative w-full">
      <Image
        src={`/${imageName}`}
        // Disable Next.js image optimization for this example
        loader={({ src }) => src}
        alt={displayName}
        width={800}
        height={600}
        className="w-full h-auto object-cover"
        priority={priority}
      />
    </div>
  );
}
