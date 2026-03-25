import { renderGuideOpenGraphImage } from "@/components/marketing/GuideOpenGraphImage";
import { getPublicGuide } from "@/lib/public-guides";

export const alt = "Crypto wallet basics with Blockwise";
export { contentType, size } from "@/components/marketing/GuideOpenGraphImage";

export default function CryptoWalletBasicsOpenGraphImage() {
  const guide = getPublicGuide("crypto-wallet-basics");

  if (!guide) {
    throw new Error("Guide not found");
  }

  return renderGuideOpenGraphImage(guide);
}
