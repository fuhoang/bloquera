import type { Metadata } from "next";

import { GuideLandingPage } from "@/components/marketing/GuideLandingPage";
import { getPublicGuide } from "@/lib/public-guides";
import { createPageMetadata } from "@/lib/seo";

const guide = getPublicGuide("learn-crypto");

export const metadata: Metadata = createPageMetadata({
  title: "Learn crypto",
  description:
    guide?.description ??
    "Learn crypto with a beginner-friendly roadmap in Blockwise.",
  pathname: "/learn-crypto",
  imagePath: "/learn-crypto/opengraph-image",
});

export default function LearnCryptoPage() {
  if (!guide) {
    return null;
  }

  return <GuideLandingPage guide={guide} />;
}
