import type { Metadata } from "next";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { publicGuides } from "@/lib/public-guides";
import { createPageMetadata } from "@/lib/seo";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Core lessons and preview access to the tutor.",
  },
  {
    name: "Pro",
    price: "$19",
    description: "Full curriculum, quizzes, and AI tutor support.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Pricing",
  description:
    "View Blockwise pricing for guided crypto learning plans, including the live Bitcoin curriculum, quizzes, and AI tutor support.",
  pathname: "/pricing",
  imagePath: "/pricing/opengraph-image",
});

export default function PricingPage() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          Pricing
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">Simple plans for serious crypto learners</h1>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.name} className="p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{plan.name}</p>
            <h2 className="mt-4 text-5xl font-black">{plan.price}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{plan.description}</p>
            <Link href="/learn" className="mt-8 inline-flex text-sm font-semibold text-[var(--accent-strong)]">
              Choose {plan.name}
            </Link>
          </Card>
        ))}
      </div>
      <div className="mt-12 max-w-5xl rounded-[1.75rem] border border-white/10 bg-white/5 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Explore free guides first
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight">
          Learn the basics before you choose a plan.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
          Public guides explain crypto basics, Bitcoin, wallets, and transactions
          in plain language before learners move into the full product.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {publicGuides.slice(0, 3).map((guide) => (
            <Link
              key={guide.id}
              href={guide.href}
              className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-orange-500/30 hover:bg-black/30"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {guide.eyebrow}
              </p>
              <h3 className="mt-3 text-lg font-semibold">{guide.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {guide.summary}
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[var(--accent-strong)]">
                Read guide
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
