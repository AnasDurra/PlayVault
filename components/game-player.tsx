import { useState, useRef, useEffect } from "react";
import {
  Maximize2,
  Minimize2,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Game } from "@/lib/game-store";
import Image from "next/image";

interface GamePlayerProps {
  game: Game;
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    if (iframeRef.current) {
      iframeRef.current.src = game.iframeUrl;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-black rounded-lg overflow-hidden ${
        isFullscreen ? "h-screen" : "aspect-video"
      }`}
    >
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted z-10">
          <div className="relative">
            <div className="absolute inset-0">
              <Image
                src={game.thumbnail}
                alt={game.title}
                fill
                sizes="100vw"
                className="object-cover blur-xl opacity-30"
              />
            </div>
            <div className="relative flex flex-col items-center gap-4 p-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium text-foreground">
                Loading game...
              </p>
              <p className="text-sm text-muted-foreground">{game.title}</p>
            </div>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted z-10">
          <div className="flex flex-col items-center gap-4 text-center p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">
                Game Failed to Load
              </h3>
              <p className="mt-2 text-muted-foreground max-w-md">
                There was an issue loading this game. This could be due to
                network issues or the game being temporarily unavailable.
              </p>
            </div>
            <Button onClick={handleRetry} className="gap-2 mt-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={game.iframeUrl}
        title={game.title}
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; gamepad"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />
      <div className="absolute top-1 left-3">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          className="absolute top-1 right-1 h-10 w-10 rounded-lg border-white/30 bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 z-20 "
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
