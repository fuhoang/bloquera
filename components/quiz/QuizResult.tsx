import { Card } from "@/components/ui/Card";

type QuizResultProps = {
  total?: number;
  correct?: number;
  passed?: boolean;
};

export function QuizResult({
  total = 1,
  correct = 1,
  passed = true,
}: QuizResultProps) {
  return (
    <Card className="border border-white/10 !bg-white/[0.03] p-6 text-white shadow-none">
      <p
        className={`text-sm font-semibold ${
          passed ? "text-emerald-400" : "text-orange-300"
        }`}
      >
        {passed ? "Quiz passed" : "Quiz locked"}
      </p>
      <p className="mt-2 text-base leading-7 text-zinc-300">
        {passed
          ? `You answered ${correct} of ${total} questions correctly. The next lesson is now unlocked.`
          : `Answer all ${total} questions correctly to unlock the next lesson.`}
      </p>
    </Card>
  );
}
