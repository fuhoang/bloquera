import type { Metadata } from "next";

export function getSiteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!configured) {
    return "http://localhost:3000";
  }

  return configured.startsWith("http")
    ? configured.replace(/\/$/, "")
    : `https://${configured.replace(/\/$/, "")}`;
}

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, `${getSiteUrl()}/`).toString();
}

type PageMetadataOptions = {
  description: string;
  imagePath?: string;
  noIndex?: boolean;
  pathname: string;
  title: string;
};

export function createPageMetadata({
  description,
  imagePath = "/opengraph-image",
  noIndex = false,
  pathname,
  title,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(pathname);
  const image = absoluteUrl(imagePath);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Bloquera",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
