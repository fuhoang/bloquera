import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/pricing",
        "/learn-crypto",
        "/bitcoin-for-beginners",
        "/crypto-wallet-basics",
        "/what-is-bitcoin",
        "/how-crypto-transactions-work",
      ],
      disallow: ["/auth/", "/dashboard", "/learn", "/profiles", "/purchases", "/api/"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
    host: getSiteUrl(),
  };
}
