import { LearnOverview } from "@/components/learn/LearnOverview";
import { lessonConfig, moduleConfig, trackConfig } from "@/content/config";

export default function LearnPage() {
  const currentTrack =
    trackConfig.find((track) => track.slug === "bitcoin") ?? trackConfig[0];

  return (
    <LearnOverview
      currentTrack={currentTrack}
      modules={moduleConfig}
      totalLessons={lessonConfig.length}
      tracks={trackConfig}
    />
  );
}
