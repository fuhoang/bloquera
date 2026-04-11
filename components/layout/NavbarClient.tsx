"use client";

import { useState } from "react";
import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import type { AccountStatus } from "@/lib/account-status";

type NavLink = {
  href: Route | "/#demo" | "/#guides";
  label: string;
};

type NavbarClientProps = {
  accountStatus: AccountStatus | null;
  avatarUrl: string | null;
  isAuthenticated: boolean;
  userLabel: string | null;
};

const NAV_LINKS = [
  { href: "/learn-crypto", label: "Guides" },
  { href: "/learn", label: "Curriculum" },
  { href: "/pricing", label: "Pricing" },
] satisfies NavLink[];

const BRAND_FONT_STACK =
  '"Bungee", Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif';

export function NavbarClient({
  accountStatus,
  avatarUrl,
  isAuthenticated,
  userLabel,
}: NavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileInitial = userLabel?.charAt(0).toUpperCase() ?? "P";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="flex items-center justify-between md:hidden">
          <Link
            href="/"
            className="flex items-center justify-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              alt="Bloquera logo"
              className="h-8 w-auto"
              height={611}
              priority
              src="/bloquera-navbar-icon.png"
              width={671}
            />
            <span
              className="text-center text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl"
              style={{ fontFamily: BRAND_FONT_STACK }}
            >
              Bloquera
            </span>
          </Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            <span
              className={`h-0.5 w-5 rounded-full bg-white transition-transform ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-white transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-white transition-transform ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        <nav className="hidden items-center gap-6 justify-self-start text-sm text-zinc-400 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="hidden items-center justify-center gap-3 md:flex md:justify-self-center"
        >
          <Image
            alt="Bloquera logo"
            className="h-11 w-auto"
            height={611}
            priority
            src="/bloquera-navbar-icon.png"
            width={671}
          />
          <span
            className="text-center text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl md:text-4xl"
            style={{ fontFamily: BRAND_FONT_STACK }}
          >
            Bloquera
          </span>
        </Link>
        <div className="hidden items-center justify-center gap-3 md:flex md:justify-self-end">
          {isAuthenticated ? (
            <div className="relative flex items-center gap-3">
              <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                {accountStatus?.planLabel ?? "Free"} plan
              </span>
              <button
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="menu"
                aria-label="Open profile menu"
                className="flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white transition hover:bg-white/10"
                onClick={() => setIsProfileMenuOpen((current) => !current)}
                type="button"
              >
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="Profile avatar"
                    className="h-full w-full object-cover"
                    src={avatarUrl}
                  />
                ) : (
                  profileInitial
                )}
              </button>
              {isProfileMenuOpen ? (
                <div className="absolute right-0 top-full mt-3 w-64 rounded-3xl border border-white/10 bg-zinc-950/95 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur">
                  {userLabel ? (
                    <p className="truncate border-b border-white/10 pb-3 text-sm text-zinc-400">
                      {userLabel}
                    </p>
                  ) : null}
                  <p className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.16em] text-zinc-400">
                    {accountStatus?.headline ?? "Free plan"}
                  </p>
                  <p className="mt-3 px-1 text-xs leading-6 text-zinc-500">
                    {accountStatus?.planSummary ?? "Free access is active for your account."}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link
                      className="rounded-2xl px-4 py-3 text-sm text-white transition hover:bg-white/5"
                      href="/profiles"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      className="rounded-2xl px-4 py-3 text-sm text-white transition hover:bg-white/5"
                      href="/learn"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Curriculum
                    </Link>
                    <Link
                      className="rounded-2xl px-4 py-3 text-sm text-white transition hover:bg-white/5"
                      href="/purchases"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Purchases
                    </Link>
                    <form
                      action="/auth/logout"
                      method="post"
                    >
                      <button
                        className="w-full rounded-2xl px-4 py-3 text-left text-sm text-white transition hover:bg-white/5"
                        type="submit"
                      >
                        Log out
                      </button>
                    </form>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                Log in
              </Link>
              <Link href="/auth/register">
                <Button className="bg-orange-500 !px-6 !py-3 !text-lg !leading-none !text-white hover:bg-orange-400 hover:!text-white">
                  Join for free
                </Button>
              </Link>
            </>
          )}
        </div>

        {isMenuOpen ? (
          <div
            id="mobile-navigation"
            className="rounded-3xl border border-white/10 bg-white/5 p-4 md:hidden"
          >
            <nav className="flex flex-col gap-3 text-base font-medium text-zinc-300">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <>
                  {userLabel ? (
                    <p className="truncate text-center text-xs uppercase tracking-[0.16em] text-zinc-500">
                      {userLabel}
                    </p>
                  ) : null}
                  <p className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                    {accountStatus?.planLabel ?? "Free"} plan
                  </p>
                  <Link href="/profiles" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full !rounded-lg" variant="secondary">
                      Profile
                    </Button>
                  </Link>
                  <Link href="/purchases" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full !rounded-lg" variant="secondary">
                      Purchases
                    </Button>
                  </Link>
                  <form
                    action="/auth/logout"
                    method="post"
                  >
                    <Button className="w-full !rounded-lg" variant="secondary">
                      Log out
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-orange-500 !px-6 !py-3 !text-lg !leading-none !text-white hover:bg-orange-400 hover:!text-white">
                      Join for free
                    </Button>
                  </Link>
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <button
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
                      type="button"
                    >
                      Log in
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
