import { renderGuideOpenGraphImage } from "@/components/marketing/GuideOpenGraphImage";
import { getPublicGuide } from "@/lib/public-guides";

export const alt = "Bitcoin for beginners with Blockwise";
export { contentType, size } from "@/components/marketing/GuideOpenGraphImage";

export default function BitcoinForBeginnersOpenGraphImage() {
  const guide = getPublicGuide("bitcoin-for-beginners");

  if (!guide) {
    throw new Error("Guide not found");
  }

  return renderGuideOpenGraphImage(guide);
}
