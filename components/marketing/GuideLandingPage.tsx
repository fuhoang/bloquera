import Script from "next/script";
import Link from "next/link";

import type { PublicGuide } from "@/lib/public-guides";
import { absoluteUrl } from "@/lib/seo";

export function GuideLandingPage({ guide }: { guide: PublicGuide }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: guide.title,
        description: guide.description,
        url: absoluteUrl(guide.href),
      },
      {
        "@type": "Course",
        name: guide.title,
        description: guide.summary,
        url: absoluteUrl(guide.href),
        provider: {
          "@type": "Organization",
          name: "Bloquera",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: guide.title,
            item: absoluteUrl(guide.href),
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Script
        id={`${guide.id}-structured-data`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-16">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
            <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
              <Link href="/" className="transition hover:text-zinc-300">
                Home
              </Link>
              <span className="px-2 text-zinc-700">/</span>
              <span>{guide.title}</span>
            </nav>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              {guide.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
              {guide.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-300">
              <span className="rounded-xl border border-white/10 bg-black/20 px-4 py-2">
                Beginner friendly
              </span>
              <span className="rounded-xl border border-white/10 bg-black/20 px-4 py-2">
                AI-supported learning
              </span>
              <span className="rounded-xl border border-white/10 bg-black/20 px-4 py-2">
                Live Bitcoin track
              </span>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
          {guide.sections.map((section) => (
            <article
              key={section.title}
              className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{section.body}</p>
            </article>
          ))}
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Frequently asked
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {guide.faq.map((item) => (
                <article
                  key={item.question}
                  className="flex h-full flex-col rounded-[1.5rem] border border-white/10 bg-black/20 p-6"
                >
                  <h2 className="text-lg font-semibold text-white">{item.question}</h2>
                  <p className="mt-3 flex-1 text-sm leading-7 text-zinc-400">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-orange-500/20 bg-orange-500/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
              Ready to go deeper?
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white">
              Keep the public guide, then move into the full learning flow.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
              Bloquera combines short lessons, quizzes, saved progress, and the AI
              tutor so beginners can build understanding without jumping between random
              videos and threads.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/auth/register?next=%2Flearn"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
              >
                Create free account
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Compare plans
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
