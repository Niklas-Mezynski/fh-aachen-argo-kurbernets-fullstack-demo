import "server-only";
const votes: Map<string, number> = new Map<string, number>();

export async function getVotes(imageName: string): Promise<number> {
  const voteCount = votes.get(imageName) || 0;
  console.log(`[DEBUG] Getting votes for image: ${imageName}: ${voteCount}`);
  console.log(`[DEBUG] Current votes Map size: ${votes.size}`);
  console.log(`[DEBUG] All votes:`, Array.from(votes.entries()));
  console.log(`[DEBUG] Container PID: ${process.pid}`);
  console.log(`[DEBUG] Memory usage:`, process.memoryUsage());
  return voteCount;
}

export function upvoteImage(imageName: string): number {
  const currentVotes = votes.get(imageName) || 0;
  const newVotes = currentVotes + 1;
  votes.set(imageName, newVotes);

  console.log(`Image "${imageName}" now has ${newVotes} votes.`);
  console.log("[Map Entries]", Array.from(votes.entries()));

  return newVotes;
}

export function getAllVotes(): Record<string, number> {
  return Object.fromEntries(votes);
}
