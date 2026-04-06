import type { Metadata } from "next";

import { GuideLandingPage } from "@/components/marketing/GuideLandingPage";
import { getPublicGuide } from "@/lib/public-guides";
import { createPageMetadata } from "@/lib/seo";

const guide = getPublicGuide("how-crypto-transactions-work");

export const metadata: Metadata = createPageMetadata({
  title: "How crypto transactions work",
  description:
    guide?.description ??
    "Learn how crypto transactions work with Bloquera.",
  pathname: "/how-crypto-transactions-work",
  imagePath: "/how-crypto-transactions-work/opengraph-image",
});

export default function HowCryptoTransactionsWorkPage() {
  if (!guide) {
    return null;
  }

  return <GuideLandingPage guide={guide} />;
}
