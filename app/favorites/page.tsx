"use client";

import { Heart } from "lucide-react";
import { useEffect } from "react";

import { GameGrid } from "@/components/game-grid";
import { useGameStore } from "@/lib/game-store";
import { games } from "@/lib/games";

export default function FavoritesPage() {
  useEffect(() => {
    document.title = "Your Favorites | PlayVault";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "View and play your favorite games on PlayVault. Quick access to all the games you love."
      );
    }
  }, []);

  const favorites = useGameStore((state) => state.favorites);

  const favoriteGames = games.filter((game) => favorites.includes(game.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
          <Heart className="h-6 w-6 text-red-500 fill-red-500" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">Your Favorites</h1>
          <p className="text-muted-foreground">
            {favoriteGames.length}{" "}
            {favoriteGames.length === 1 ? "game" : "games"} saved
          </p>
        </div>
      </div>

      {favoriteGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="font-display text-xl font-semibold">
            No favorites yet
          </h3>
          <p className="mt-2 text-muted-foreground max-w-md">
            Start exploring games and click the heart icon to add them to your
            favorites.
          </p>
        </div>
      ) : (
        <section>
          <GameGrid games={favoriteGames} />
        </section>
      )}
    </div>
  );
}
