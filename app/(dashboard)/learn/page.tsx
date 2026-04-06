import type { Metadata } from "next";

import { LearnOverview } from "@/components/learn/LearnOverview";
import { lessonConfig, moduleConfig, trackConfig } from "@/content/config";
import { hasProAccessForCurrentUser } from "@/lib/account-status";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Curriculum",
  description: "Browse the Bloquera Bitcoin curriculum, modules, and lesson roadmap.",
  pathname: "/learn",
  noIndex: true,
});

export default async function LearnPage() {
  const currentTrack =
    trackConfig.find((track) => track.slug === "bitcoin") ?? trackConfig[0];
  const hasProAccess = await hasProAccessForCurrentUser();

  return (
    <LearnOverview
      currentTrack={currentTrack}
      hasProAccess={hasProAccess}
      modules={moduleConfig}
      totalLessons={lessonConfig.length}
      tracks={trackConfig}
    />
  );
}
