"use client";

import { GameCard } from "@/components/game-card";
import { GamePlayer } from "@/components/game-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Game } from "@/lib/game-store";
import { useGameStore } from "@/lib/game-store";
import { games } from "@/lib/games";
import { ArrowLeft, ChevronRight, Heart, Home, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function GameDetailPage() {
  const params = useParams<{ slug: string }>();

  const id = params.slug;

  const { toast } = useToast();
  const toggleFavorite = useGameStore((state) => state.toggleFavorite);
  const addRecentlyPlayed = useGameStore((state) => state.addRecentlyPlayed);

  const game = games.find((g: Game) => g.id === id);

  const favorite = useGameStore((state) => state.favorites.includes(id));

  useEffect(() => {
    if (game) {
      addRecentlyPlayed(game.id);
      document.title = `${game.title} - Play Free | PlayVault`;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Play ${game.title} for free. ${game.description.slice(0, 120)}...`
        );
      }
    }
  }, [game, addRecentlyPlayed]);

  const relatedGames = games
    .filter((g) => g.category === game?.category && g.id !== game?.id)
    .slice(0, 4);

  const handleShare = async () => {
    if (!game) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: game.title,
          text: game.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Game link has been copied to clipboard.",
        });
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // handle if game does not exists
  if (!game) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-2xl font-bold">Game Not Found</h2>
          <p className="text-muted-foreground">
            The game you're looking for doesn't exist.
          </p>
          <Link href="/" className="mt-4">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <nav
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate">
          {game.title}
        </span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" size="icon" className="shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="font-display text-2xl font-bold sm:text-3xl">
                  {game.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{game.category}</Badge>
                  {game.popular && (
                    <Badge className="bg-orange-500/90 text-white border-0">
                      Popular
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={favorite ? "default" : "outline"}
                onClick={() => {
                  toggleFavorite(game.id);
                  toast({
                    title: favorite
                      ? "Removed from favorites"
                      : "Added to favorites",
                    description: favorite
                      ? `${game.title} has been removed from your favorites.`
                      : `${game.title} has been added to your favorites.`,
                  });
                }}
                className="gap-2"
                data-testid="button-favorite"
              >
                <Heart
                  className={`h-4 w-4 ${favorite ? "fill-current" : ""}`}
                />
                {favorite ? "Favorited" : "Favorite"}
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="gap-2"
                data-testid="button-share"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <GamePlayer game={game} />

          <div className="lg:hidden">
            <Card data-testid="card-about-mobile">
              <CardHeader>
                <CardTitle className="font-display">About This Game</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-muted-foreground leading-relaxed"
                  data-testid="text-description-mobile"
                >
                  {game.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {relatedGames.length > 0 && (
            <section className="space-y-4" data-testid="section-related-games">
              <h2
                className="font-display text-xl font-semibold"
                data-testid="text-related-title"
              >
                More {game.category} Games
              </h2>
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                data-testid="grid-related-games"
              >
                {relatedGames.map((relatedGame: Game) => (
                  <GameCard key={relatedGame.id} game={relatedGame} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="hidden lg:block space-y-6" data-testid="sidebar">
          <Card data-testid="card-about">
            <CardHeader>
              <CardTitle className="font-display">About This Game</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p
                className="text-muted-foreground leading-relaxed"
                data-testid="text-description"
              >
                {game.description}
              </p>
              <div
                className="flex flex-wrap gap-2"
                data-testid="tags-container"
              >
                <Badge variant="outline" data-testid="tag-category">
                  {game.category}
                </Badge>
                {game.featured && (
                  <Badge variant="outline" data-testid="tag-featured">
                    Featured
                  </Badge>
                )}
                {game.popular && (
                  <Badge variant="outline" data-testid="tag-popular">
                    Popular
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {relatedGames.length > 0 && (
            <Card data-testid="card-sidebar-related">
              <CardHeader>
                <CardTitle className="font-display text-lg">
                  You Might Also Like
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedGames.slice(0, 3).map((relatedGame: Game) => (
                  <GameCard key={relatedGame.id} game={relatedGame} compact />
                ))}
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
