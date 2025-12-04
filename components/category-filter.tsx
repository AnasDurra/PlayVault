import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useGameStore } from "@/lib/game-store";
import { gameCategories } from "@/lib/schema";

export function CategoryFilter() {
  const selectedCategories = useGameStore((state) => state.selectedCategories);
  const toggleCategory = useGameStore((state) => state.toggleCategory);
  const clearFilters = useGameStore((state) => state.clearFilters);
  const searchQuery = useGameStore((state) => state.searchQuery);

  const hasActiveFilters =
    selectedCategories.length > 0 || searchQuery.length > 0;

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2">
        {gameCategories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => toggleCategory(category)}
              className={`rounded-full px-4 transition-all duration-200 ${
                isSelected
                  ? "shadow-md"
                  : "border-border/50 hover:border-primary/50"
              }`}
            >
              {category}
            </Button>
          );
        })}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1.5 rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Clear all
          </Button>
        )}
      </div>

      {selectedCategories.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="gap-1.5 pl-3 pr-1.5"
            >
              {category}
              <button
                onClick={() => toggleCategory(category)}
                className="ml-1 rounded-full p-0.5 hover:bg-background/50"
                aria-label={`Remove ${category} filter`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
