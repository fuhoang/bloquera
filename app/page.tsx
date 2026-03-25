import type { Metadata } from "next";
import Script from "next/script";

import HomePage from "@/components/home/HomePage";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Learn crypto the structured way",
  description:
    "Learn crypto with structured beginner lessons, quizzes, progress tracking, and an AI tutor in Blockwise, starting with a live Bitcoin track.",
  pathname: "/",
});

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Blockwise",
    url: absoluteUrl("/"),
    description:
      "Structured crypto learning with lessons, quizzes, dashboard progress, and an AI tutor, starting with Bitcoin.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/")}#demo`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Script
        id="blockwise-home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage />
    </>
  );
}
