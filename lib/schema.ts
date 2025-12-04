import { z } from "zod";

export const gameCategories = [
  "Action",
  "Puzzle",
  "Arcade",
  "Adventure",
  "Sports",
  "Racing",
  "Strategy",
  "Shooting",
] as const;

export type GameCategory = (typeof gameCategories)[number];

export const gameSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  iframeUrl: z.string(),
  category: z.enum(gameCategories),
  featured: z.boolean().default(false),
  popular: z.boolean().default(false),
  plays: z.number().default(0),
});

export type Game = z.infer<typeof gameSchema>;

export const insertGameSchema = gameSchema.omit({ id: true, plays: true });
export type InsertGame = z.infer<typeof insertGameSchema>;

export const gameFilterSchema = z.object({
  search: z.string().optional(),
  categories: z.array(z.enum(gameCategories)).optional(),
});

export type GameFilter = z.infer<typeof gameFilterSchema>;
