"use client";

import { Clock3 } from "lucide-react";
import { useEffect } from "react";

import { Footer } from "@/components/footer";
import { GameGrid } from "@/components/game-grid";
import { Header } from "@/components/header";
import { useGameStore } from "@/lib/game-store";
import { games } from "@/lib/games";

export default function RecentlyPlayedPage() {
  const recentlyPlayed = useGameStore((state) => state.recentlyPlayed);

  useEffect(() => {
    document.title = "Recently Played | PlayVault";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "See the games you recently played on PlayVault and jump back in instantly."
      );
    }
  }, []);

  const recentlyPlayedGames = recentlyPlayed
    .map((id) => games.find((g) => g.id === id))
    .filter((g): g is (typeof games)[number] => Boolean(g));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Clock3 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">Recently Played</h1>
          <p className="text-muted-foreground">
            {recentlyPlayedGames.length}{" "}
            {recentlyPlayedGames.length === 1 ? "game" : "games"} in your
            history
          </p>
        </div>
      </div>

      {recentlyPlayedGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Clock3 className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="font-display text-xl font-semibold">
            No games played yet
          </h3>
          <p className="mt-2 max-w-md text-muted-foreground">
            Once you start playing games, they’ll appear here so you can quickly
            jump back in.
          </p>
        </div>
      ) : (
        <section>
          <GameGrid games={recentlyPlayedGames} />
        </section>
      )}
    </div>
  );
}
