"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
        <nav className="hidden items-center gap-6 justify-self-start text-sm text-zinc-400 md:flex">
          {isHomePage ? (
            <>
              <Link href="/#curriculum">Curriculum</Link>
              <Link href="/#demo">Demo</Link>
              <Link href="/#pricing">Pricing</Link>
            </>
          ) : (
            <>
              <Link href="/pricing">Pricing</Link>
              <Link href="/learn">Curriculum</Link>
              <Link href="/dashboard">Dashboard</Link>
            </>
          )}
        </nav>
        <Link
          href="/"
          className="flex items-end justify-center gap-2 md:justify-self-center"
        >
          <span
            className="text-center text-3xl uppercase tracking-[0.08em] text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: '"Bungee", cursive' }}
          >
            Satoshi Learn
          </span>
          <span
            aria-hidden="true"
            className="mb-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[8px] font-black text-black"
          >
            ₿
          </span>
        </Link>
        <div className="flex items-center justify-center gap-3 md:justify-self-end">
          <Link href="/auth/login" className="text-sm font-medium text-zinc-300">
            Log in
          </Link>
          <Link href="/auth/register">
            <Button className="bg-white text-black hover:bg-zinc-200">
              Start Learning
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
