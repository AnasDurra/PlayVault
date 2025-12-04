import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Game, GameCategory } from "./schema";

interface GameState {
  searchQuery: string;
  selectedCategories: GameCategory[];
  favorites: string[];
  recentlyPlayed: string[];
  setSearchQuery: (query: string) => void;
  toggleCategory: (category: GameCategory) => void;
  clearFilters: () => void;
  toggleFavorite: (gameId: string) => void;
  addRecentlyPlayed: (gameId: string) => void;
  // isFavorite: (gameId: string) => boolean;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      searchQuery: "",
      selectedCategories: [],
      favorites: [],
      recentlyPlayed: [],

      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleCategory: (category) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),

      clearFilters: () => set({ searchQuery: "", selectedCategories: [] }),

      toggleFavorite: (gameId) =>
        set((state) => ({
          favorites: state.favorites.includes(gameId)
            ? state.favorites.filter((id) => id !== gameId)
            : [...state.favorites, gameId],
        })),

      addRecentlyPlayed: (gameId) =>
        set((state) => {
          const filtered = state.recentlyPlayed.filter((id) => id !== gameId);
          return {
            recentlyPlayed: [gameId, ...filtered].slice(0, 10),
          };
        }),

      // isFavorite: (gameId) => get().favorites.includes(gameId),
    }),
    {
      name: "playvault-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyPlayed: state.recentlyPlayed,
      }),
    }
  )
);

export function filterGames(
  games: Game[],
  searchQuery: string,
  selectedCategories: GameCategory[]
): Game[] {
  return games.filter((game) => {
    const matchesSearch =
      searchQuery === "" ||
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(game.category);

    return matchesSearch && matchesCategory;
  });
}
export type { Game };
