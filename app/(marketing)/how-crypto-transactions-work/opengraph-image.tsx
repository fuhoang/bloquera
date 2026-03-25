import { renderGuideOpenGraphImage } from "@/components/marketing/GuideOpenGraphImage";
import { getPublicGuide } from "@/lib/public-guides";

export const alt = "How crypto transactions work with Blockwise";
export { contentType, size } from "@/components/marketing/GuideOpenGraphImage";

export default function HowCryptoTransactionsWorkOpenGraphImage() {
  const guide = getPublicGuide("how-crypto-transactions-work");

  if (!guide) {
    throw new Error("Guide not found");
  }

  return renderGuideOpenGraphImage(guide);
}
