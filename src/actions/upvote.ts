"use server";

import { revalidatePath } from "next/cache";
import { upvoteImage } from "../lib/votes";

export async function upvoteAction(imageName: string) {
  // Increment the vote count for the image
  upvoteImage(imageName);

  // Revalidate the page to show updated vote counts
  revalidatePath("/");
}
