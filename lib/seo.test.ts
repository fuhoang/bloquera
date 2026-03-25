import { absoluteUrl, createPageMetadata } from "@/lib/seo";

describe("seo helpers", () => {
  it("builds absolute URLs against the site root", () => {
    expect(absoluteUrl("/pricing")).toBe("http://localhost:3000/pricing");
  });

  it("builds metadata with canonical URLs and social images", () => {
    const metadata = createPageMetadata({
      title: "Learn crypto",
      description: "Crypto guide",
      pathname: "/learn-crypto",
      imagePath: "/opengraph-image",
    });

    expect(metadata.alternates?.canonical).toBe("http://localhost:3000/learn-crypto");
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "http://localhost:3000/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Learn crypto",
      },
    ]);
    expect(metadata.twitter?.images).toEqual(["http://localhost:3000/opengraph-image"]);
  });
});
