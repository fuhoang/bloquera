import type { Metadata } from "next";

import { GuideLandingPage } from "@/components/marketing/GuideLandingPage";
import { getPublicGuide } from "@/lib/public-guides";
import { createPageMetadata } from "@/lib/seo";

const guide = getPublicGuide("what-is-bitcoin");

export const metadata: Metadata = createPageMetadata({
  title: "What is Bitcoin",
  description:
    guide?.description ??
    "Learn what Bitcoin is in plain language with Bloquera.",
  pathname: "/what-is-bitcoin",
  imagePath: "/what-is-bitcoin/opengraph-image",
});

export default function WhatIsBitcoinPage() {
  if (!guide) {
    return null;
  }

  return <GuideLandingPage guide={guide} />;
}
