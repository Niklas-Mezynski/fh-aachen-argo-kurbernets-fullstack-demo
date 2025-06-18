import "server-only";

// Extend the global object to include our votes store
declare global {
  var __votesStore: Map<string, number> | undefined;
}

// Initialize the global votes store only once
if (!global.__votesStore) {
  console.log("Initializing votes module...");
  global.__votesStore = new Map<string, number>();
}

const votes = global.__votesStore;

export function getVotes(imageName: string): number {
  const voteCount = votes.get(imageName) || 0;
  console.log(`[DEBUG] Getting votes for image: ${imageName}: ${voteCount}`);
  console.log(`[DEBUG] All votes:`, Array.from(votes.entries()));
  return voteCount;
}

export function upvoteImage(imageName: string): number {
  const currentVotes = votes.get(imageName) || 0;
  const newVotes = currentVotes + 1;
  votes.set(imageName, newVotes);

  console.log(`[DEBUG] Image "${imageName}" now has ${newVotes} votes.`);
  console.log("[DEBUG] Map Entries:", Array.from(votes.entries()));

  return newVotes;
}

export function getAllVotes(): Record<string, number> {
  return Object.fromEntries(votes);
}
