import { GameCard } from "./game-card";
import type { Game } from "@/lib/game-store";

interface RelatedGamesProps {
  games: Game[];
  currentGameId: string;
}

export function RelatedGames({ games, currentGameId }: RelatedGamesProps) {
  const relatedGames = games.filter((g) => g.id !== currentGameId).slice(0, 4);

  if (relatedGames.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl font-semibold">Related Games</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
