import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Game } from "@/lib/game-store";
import { useGameStore } from "@/lib/game-store";
import { Heart, Play, TrendingUp } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface GameCardProps {
  game: Game;
  featured?: boolean;
  compact?: boolean;
}

export function GameCard({
  game,
  featured = false,
  compact = false,
}: GameCardProps) {
  const { toast } = useToast();
  const favorite = useGameStore((state) => state.favorites.includes(game.id));

  const toggleFavorite = useGameStore((state) => state.toggleFavorite);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(game.id);
    toast({
      title: favorite ? "Removed from favorites" : "Added to favorites",
      description: favorite
        ? `${game.title} has been removed from your favorites.`
        : `${game.title} has been added to your favorites.`,
    });
  };

  if (compact) {
    return (
      <Link href={`/games/${game.id}`} prefetch={false}>
        <div className="group flex gap-3 rounded-lg p-2 transition-all duration-200 hover-elevate active-elevate-2 cursor-pointer">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-muted" />
            )}
            <div className="relative h-full w-full">
              <Image
                src={imageError ? "/favicon.png" : game.thumbnail}
                alt={game.title}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <h4 className="font-display font-semibold text-sm truncate group-hover:text-primary transition-colors">
              {game.title}
            </h4>
            <span className="text-xs text-muted-foreground">
              {game.category}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/games/${game.id}`} prefetch={false}>
      <div
        className={`group relative overflow-hidden rounded-lg bg-card transition-all duration-300 cursor-pointer ${
          featured ? "aspect-video" : "aspect-16/10"
        }`}
      >
        <div className="absolute inset-0 bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={imageError ? "/favicon.png" : game.thumbnail}
              alt={game.title}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              loading="lazy"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        <div className="absolute top-3 right-3 flex items-center gap-2">
          {game.popular && (
            <Badge className="gap-1 bg-orange-500/90 text-white border-0 backdrop-blur-sm">
              <TrendingUp className="h-3 w-3" />
              Popular
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="backdrop-blur-sm bg-black/40 text-white border-0"
          >
            {game.category}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 left-3 h-8 w-8 rounded-full backdrop-blur-sm transition-all duration-200 ${
            favorite
              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
              : "bg-black/40 text-white hover:bg-black/60"
          }`}
          onClick={handleFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-lg font-semibold text-white truncate">
            {game.title}
          </h3>
          {!compact && (
            <p className="mt-1 text-sm text-white/70 line-clamp-2">
              {game.description}
            </p>
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 ml-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
