import { Input } from "@/components/ui/input";
import { useGameStore } from "@/lib/game-store";
import { Search, X } from "lucide-react";

export function SearchBar() {
  const searchQuery = useGameStore((state) => state.searchQuery);
  const setSearchQuery = useGameStore((state) => state.setSearchQuery);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="h-5 w-5" />
      </div>
      <Input
        type="search"
        placeholder="Search games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-12 w-full rounded-full border-border/50 bg-card pl-12 pr-12 text-base shadow-sm transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="h-5 w-5" />
      </div>
      {searchQuery && (
        <div
          onClick={() => setSearchQuery("")}
          aria-label="Clear search"
          role="button"
          className="
      absolute right-3 top-1/2 -translate-y-1/2
      flex items-center justify-center
      h-8 w-8
      rounded-full
      cursor-pointer
      text-muted-foreground
      hover:bg-muted/70
      hover:text-foreground
    "
        >
          <X className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
