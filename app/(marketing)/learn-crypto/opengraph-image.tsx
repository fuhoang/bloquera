import { renderGuideOpenGraphImage } from "@/components/marketing/GuideOpenGraphImage";
import { getPublicGuide } from "@/lib/public-guides";

export const alt = "Learn crypto with Bloquera";
export { contentType, size } from "@/components/marketing/GuideOpenGraphImage";

export default function LearnCryptoOpenGraphImage() {
  const guide = getPublicGuide("learn-crypto");

  if (!guide) {
    throw new Error("Guide not found");
  }

  return renderGuideOpenGraphImage(guide);
}
