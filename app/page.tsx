"use client";

import { TrendingUp } from "lucide-react";
import { useEffect } from "react";

import { CategoryFilter } from "@/components/category-filter";
import { GameCard } from "@/components/game-card";
import { GameGrid } from "@/components/game-grid";
import { HeroSection } from "@/components/hero-section";
import { SearchBar } from "@/components/search-bar";
import { filterGames, useGameStore } from "@/lib/game-store";
import { games } from "@/lib/games";

export default function HomePage() {
  const searchQuery = useGameStore((state) => state.searchQuery);
  const selectedCategories = useGameStore((state) => state.selectedCategories);

  useEffect(() => {
    document.title = "PlayVault - Free Online Games | Play Instantly";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Play hundreds of free online games instantly in your browser. Action, puzzle, racing, arcade and more. No downloads required."
      );
    }
  }, []);

  const filteredGames = filterGames(games, searchQuery, selectedCategories);
  const popularGames = games.filter((g) => g.popular);
  const featuredGames = games.filter((g) => g.featured);
  const hasActiveFilters =
    searchQuery.length > 0 || selectedCategories.length > 0;

  return (
    <div>
      {
        //  !hasActiveFilters &&
        featuredGames.length > 0 && <HeroSection games={featuredGames} />
      }

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-4 lg:px-6">
          <div className="space-y-4">
            <SearchBar />
            <CategoryFilter />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="space-y-8">
          {hasActiveFilters ? (
            <GameGrid
              games={filteredGames}
              title={`Search Results (${filteredGames.length})`}
              emptyMessage="No games match your search"
            />
          ) : (
            <>
              {popularGames.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-orange-500" />
                    <h2 className="font-display text-2xl font-bold tracking-tight">
                      Trending Games
                    </h2>
                  </div>
                  <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {popularGames.slice(0, 6).map((game, index) => (
                      <div
                        key={game.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <GameCard game={game} featured />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <GameGrid games={games} title="All Games" />
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
