"use client";

import { upvoteAction } from "../actions/upvote";

interface UpvoteButtonProps {
  imageName: string;
  currentVotes: number;
}

export function UpvoteButton({ imageName, currentVotes }: UpvoteButtonProps) {
  return (
    <form
      action={() => upvoteAction(imageName)}
      className="flex items-center gap-2"
    >
      <button
        type="submit"
        className="flex items-center gap-1 px-3 py-2 bg-[#24857D] hover:bg-[#53aaa3] text-white rounded-lg transition-colors duration-200 font-medium"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
        Gefällt mir
      </button>
      <span className="text-gray-600 font-medium">
        {currentVotes} {currentVotes === 1 ? "Stimme" : "Stimmen"}
      </span>
    </form>
  );
}
