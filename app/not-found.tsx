"use client";

import { ArrowLeft, Gamepad2, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 mb-6">
        <Gamepad2 className="h-12 w-12 text-primary" />
      </div>

      <h1 className="font-display text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 font-display text-2xl font-semibold">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Oops! Looks like this page went on a gaming break. Let's get you back to
        the action.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            <Home className="h-4 w-4" />
            Go to Home
          </Button>
        </Link>
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.history.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}
