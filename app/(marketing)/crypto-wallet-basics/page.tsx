import type { Metadata } from "next";

import { GuideLandingPage } from "@/components/marketing/GuideLandingPage";
import { getPublicGuide } from "@/lib/public-guides";
import { createPageMetadata } from "@/lib/seo";

const guide = getPublicGuide("crypto-wallet-basics");

export const metadata: Metadata = createPageMetadata({
  title: "Crypto wallet basics",
  description:
    guide?.description ??
    "Understand crypto wallet basics with guided explanations in Bloquera.",
  pathname: "/crypto-wallet-basics",
  imagePath: "/crypto-wallet-basics/opengraph-image",
});

export default function CryptoWalletBasicsPage() {
  if (!guide) {
    return null;
  }

  return <GuideLandingPage guide={guide} />;
}
