import { renderGuideOpenGraphImage } from "@/components/marketing/GuideOpenGraphImage";
import { getPublicGuide } from "@/lib/public-guides";

export const alt = "What is Bitcoin with Bloquera";
export { contentType, size } from "@/components/marketing/GuideOpenGraphImage";

export default function WhatIsBitcoinOpenGraphImage() {
  const guide = getPublicGuide("what-is-bitcoin");

  if (!guide) {
    throw new Error("Guide not found");
  }

  return renderGuideOpenGraphImage(guide);
}
