import { Game } from "@/lib/schema";
import { GameCard } from "./game-card";

import { Frown } from "lucide-react";

interface GameGridProps {
  games: Game[];
  title?: string;
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
}

export function GameGrid({
  games,
  title,
  emptyMessage = "No games found",
  columns = 4,
}: GameGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
          <Frown className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-semibold">{emptyMessage}</h3>
        <p className="mt-2 text-muted-foreground max-w-md">
          Try adjusting your filters or search query to find more games.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="font-display text-2xl font-bold tracking-tight">
          {title}
        </h2>
      )}
      <div className={`grid gap-4 lg:gap-6 ${gridCols[columns]}`}>
        {games.map((game, index) => (
          <div
            key={game.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}
