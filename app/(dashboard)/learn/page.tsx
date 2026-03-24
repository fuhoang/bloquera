import { LearnOverview } from "@/components/learn/LearnOverview";
import { lessonConfig, moduleConfig } from "@/content/config";

export default function LearnPage() {
  return <LearnOverview modules={moduleConfig} totalLessons={lessonConfig.length} />;
}
