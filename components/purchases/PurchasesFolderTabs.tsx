"use client";

import { useState } from "react";
import Link from "next/link";

import { BillingActions } from "@/components/purchases/BillingActions";
import { UpgradeFunnel } from "@/components/purchases/UpgradeFunnel";
import type { AccountStatus } from "@/lib/account-status";
import type { PurchaseEventRecord } from "@/types/billing";
import type { ModuleMeta } from "@/types/lesson";

type PurchasesFolderTabsProps = {
  accountStatus: AccountStatus;
  canCheckout: boolean;
  canOpenPortal: boolean;
  premiumModules: ModuleMeta[];
  profileLabel: string;
  purchaseEvents: PurchaseEventRecord[];
  purchaseCount: number;
  subscriptionTimeline: {
    helper: string;
    label: string;
    value: string;
  }[];
  timelineSummary: string | null;
  tutorLimit: number;
};

type TabKey = "current_plan" | "billings" | "history_purchases";

const TAB_COPY: {
  id: TabKey;
  label: string;
  summary: string;
}[] = [
  {
    id: "current_plan",
    label: "Current plan",
    summary: "See your active access, what is included, and the premium curriculum.",
  },
  {
    id: "billings",
    label: "Billings",
    summary: "Manage checkout, billing portal access, renewals, and invoice timing.",
  },
  {
    id: "history_purchases",
    label: "History purchases",
    summary: "Review recorded Stripe events and the current upgrade funnel.",
  },
];

export function PurchasesFolderTabs({
  accountStatus,
  canCheckout,
  canOpenPortal,
  premiumModules,
  profileLabel,
  purchaseEvents,
  purchaseCount,
  subscriptionTimeline,
  timelineSummary,
  tutorLimit,
}: PurchasesFolderTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("current_plan");
  const activeTabMeta = TAB_COPY.find((tab) => tab.id === activeTab) ?? TAB_COPY[0];

  return (
    <section className="space-y-0">
      <div className="flex flex-wrap items-end gap-2 border-b border-white/10">
        {TAB_COPY.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              aria-selected={isActive}
              className={`rounded-t-[1rem] border px-5 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-orange-500/30 border-b-zinc-950 bg-orange-500/12 text-orange-200"
                  : "border-transparent bg-white/[0.04] text-zinc-400 hover:bg-white/[0.07] hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-b-[2rem] rounded-tr-[2rem] border border-white/10 border-t-0 bg-white/[0.03] p-8">
        <div className="border-b border-white/10 pb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            {activeTabMeta.label}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
            {activeTabMeta.summary}
          </p>
        </div>

        {activeTab === "current_plan" ? (
          <div className="grid gap-6 pt-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Current plan
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                  {accountStatus.headline}
                </h2>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {accountStatus.billingSummary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                    {accountStatus.planLabel}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
                    {profileLabel}
                  </span>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Included right now
                </p>
                <div className="mt-4 space-y-3">
                  {accountStatus.includedFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Plan facts
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {subscriptionTimeline.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-4"
                    >
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                        {item.label}
                      </p>
                      <p className="mt-3 text-sm font-medium text-white">{item.value}</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{item.helper}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  What this plan includes
                </p>
                <div className="mt-4 space-y-2 text-sm text-zinc-200">
                  <p>{tutorLimit} tutor requests per minute</p>
                  <p>
                    {accountStatus.planLabel === "Pro"
                      ? `${premiumModules.length} premium modules unlocked`
                      : `${premiumModules.length} premium modules available with Pro`}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-[2rem] border border-white/10 bg-black/30 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                    Premium modules
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    These are the premium learning modules currently attached to Pro access.
                  </p>
                </div>
                <Link
                  className="text-sm font-semibold text-orange-300 transition hover:text-orange-200"
                  href="/learn"
                >
                  View curriculum
                </Link>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {premiumModules.map((module) => (
                  <div
                    key={module.slug}
                    className="rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-4 text-sm text-zinc-200"
                  >
                    <p className="font-medium text-white">{module.title}</p>
                    <p className="mt-2 text-zinc-400">{module.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "billings" ? (
          <div className="grid gap-6 pt-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Billing actions
                </p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                  <p>
                    {purchaseCount > 0
                      ? `${purchaseCount} recent Stripe event${purchaseCount === 1 ? "" : "s"} recorded for this account.`
                      : "No purchases are linked to this account yet."}
                  </p>
                  <p>{accountStatus.nextStep}</p>
                </div>
                <div className="mt-5">
                  <BillingActions
                    canCheckout={canCheckout}
                    canOpenPortal={canOpenPortal}
                    checkoutLabel={accountStatus.checkoutCtaLabel}
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Billing timeline
                </p>
                <div className="mt-4 space-y-3">
                  {subscriptionTimeline.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <span className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                          {item.value}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{item.helper}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {timelineSummary ? (
                <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-emerald-200">
                    Billing summary
                  </p>
                  <p className="mt-3 text-sm leading-7 text-emerald-50">
                    {timelineSummary}
                  </p>
                </div>
              ) : null}

              <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  Upcoming access
                </p>
                <div className="mt-4 space-y-3">
                  {accountStatus.upcomingFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "history_purchases" ? (
          <div className="space-y-6 pt-8">
            <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                    Purchase history
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Stripe events recorded for this account, most recent first.
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-zinc-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
                  {purchaseCount} event{purchaseCount === 1 ? "" : "s"}
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                {purchaseEvents.length > 0 ? (
                  purchaseEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-4 text-sm text-zinc-200"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="font-medium text-white">
                          {formatEventLabel(event.event_type)}
                        </p>
                        <span className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                          {formatDate(event.created_at)}
                        </span>
                      </div>
                      <p className="mt-2 text-zinc-300">
                        {event.amount_cents !== null && event.currency
                          ? formatMoney(event.amount_cents, event.currency)
                          : "Amount unavailable"}
                      </p>
                      {event.status ? (
                        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">
                          {event.status}
                        </p>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <div className="grid gap-3 md:grid-cols-2">
                    <Link
                      className="rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-4 text-sm font-medium text-white transition hover:bg-white/5"
                      href="/profiles"
                    >
                      Open profile settings
                    </Link>
                    <Link
                      className="rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-4 text-sm font-medium text-white transition hover:bg-white/5"
                      href="/dashboard"
                    >
                      Back to dashboard
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <UpgradeFunnel />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatMoney(amountCents: number, currency: string) {
  return `${(amountCents / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

function formatEventLabel(eventType: PurchaseEventRecord["event_type"]) {
  return eventType
    .split(".")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
