import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";

import { Game } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  games: Game[];
}

export function HeroSection({ games }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featuredGames = games.filter((g) => g.featured).slice(0, 5);
  const currentGame = featuredGames[currentIndex];

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    if (featuredGames.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, featuredGames.length]);

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prev) => (prev - 1 + featuredGames.length) % featuredGames.length
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (!currentGame) {
    return null;
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[700px] w-full overflow-hidden">
      {featuredGames.map((game, index) => (
        <div
          key={game.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-muted">
            <Image
              src={game.thumbnail}
              alt={game.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-background/80 to-transparent" />
        </div>
      ))}

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 lg:px-6">
        <div className="max-w-2xl animate-fade-in">
          <div className="mb-4 flex items-center gap-3">
            <Badge className="gap-1.5 bg-primary/90 text-primary-foreground border-0 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Game
            </Badge>
            <Badge
              variant="outline"
              className="border-white/30  bg-white/10 backdrop-blur-sm"
            >
              {currentGame.category}
            </Badge>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight  sm:text-5xl lg:text-6xl">
            {currentGame.title}
          </h1>

          <p className="mt-4 text-lg  line-clamp-3 sm:line-clamp-2">
            {currentGame.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <Link href={`/games/${currentGame.id}`}>
              <Button size="lg" className="gap-2 rounded-full px-8 shadow-lg">
                <Play className="h-5 w-5" />
                Play Now
              </Button>
            </Link>
          </div>
        </div>

        {featuredGames.length > 1 && (
          <div className="absolute bottom-6 right-4 flex items-center gap-2 lg:right-6">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="h-10 w-10 rounded-full border-white/30 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
              aria-label="Previous game"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-1.5 px-2">
              {featuredGames.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsTransitioning(false), 500);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="h-10 w-10 rounded-full border-white/30 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
              aria-label="Next game"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
