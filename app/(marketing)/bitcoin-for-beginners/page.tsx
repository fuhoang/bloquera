import type { Metadata } from "next";

import { GuideLandingPage } from "@/components/marketing/GuideLandingPage";
import { getPublicGuide } from "@/lib/public-guides";
import { createPageMetadata } from "@/lib/seo";

const guide = getPublicGuide("bitcoin-for-beginners");

export const metadata: Metadata = createPageMetadata({
  title: "Bitcoin for beginners",
  description:
    guide?.description ??
    "Explore Bitcoin for beginners with guided lessons in Bloquera.",
  pathname: "/bitcoin-for-beginners",
  imagePath: "/bitcoin-for-beginners/opengraph-image",
});

export default function BitcoinForBeginnersPage() {
  if (!guide) {
    return null;
  }

  return <GuideLandingPage guide={guide} />;
}
