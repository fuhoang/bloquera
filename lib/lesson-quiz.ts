import type { Lesson } from "@/types/lesson";
import type { QuizQuestion } from "@/types/quiz";

const misconceptionBank: Record<string, string[]> = {
  Foundations: [
    "Money only works when a central authority can change the rules at any time.",
    "Bitcoin matters mainly because it lets institutions print a digital asset faster.",
    "A monetary system becomes stronger when users cannot verify how it works.",
    "The most important thing about Bitcoin is that it removes the need to think about tradeoffs.",
    "Traditional money problems disappear automatically when more intermediaries are added.",
  ],
  "Core Concepts": [
    "Bitcoin works because one company keeps the official ledger synchronized.",
    "Blocks matter mainly as marketing language rather than part of verification.",
    "Security comes from hiding the rules from ordinary users.",
    "Scarcity in Bitcoin can be changed whenever demand increases enough.",
    "Decentralization means nobody needs to verify anything at all.",
  ],
  "Wallets & Ownership": [
    "A wallet stores bitcoin inside the app the same way a photo app stores images.",
    "Custody and ownership mean the same thing as long as the interface looks trustworthy.",
    "Private keys are safe to share if the recipient promises not to use them.",
    "Seed phrases are mostly optional once a wallet is installed.",
    "Safe storage is mainly about convenience rather than recovery and control.",
  ],
  Transactions: [
    "Transactions become final the instant a wallet screen refreshes.",
    "Fees are fixed by Bitcoin and never change with network demand.",
    "Confirmations are cosmetic and do not affect confidence in settlement.",
    "Sending bitcoin safely does not require checking addresses or amounts.",
    "Most transaction mistakes are irreversible only for advanced users, not beginners.",
  ],
  "Mining & Network": [
    "Mining exists to let a single operator approve every transaction.",
    "Proof of Work is mainly about creating coins with no security tradeoff.",
    "Miners are optional because Bitcoin can run without block production incentives.",
    "Difficulty and hash rate are unrelated to the network's behavior.",
    "Bitcoin energy use can only be understood by ignoring what the network secures.",
  ],
  "Safety & Mistakes": [
    "Scams usually work because the technology is broken, not because trust is abused.",
    "People mainly lose bitcoin because the network randomly deletes balances.",
    "Keeping funds on an exchange always carries the same risk as self-custody.",
    "Phishing only affects people who are already highly technical.",
    "A safety checklist matters less than speed when moving funds.",
  ],
  "Real World Use": [
    "Buying bitcoin safely means using whichever path asks the fewest questions.",
    "Where you buy bitcoin never affects cost, custody, or privacy.",
    "Using bitcoin in daily life only matters if you trade it constantly.",
    "Storing and spending are identical decisions with identical tradeoffs.",
    "Long-term thinking mainly means ignoring what you are learning.",
  ],
  "Advanced Basics": [
    "Nodes are mainly passive observers with no role in rule enforcement.",
    "Lightning replaces Bitcoin rather than building on it.",
    "Forks are just branding choices and do not reflect rule changes.",
    "Bitcoin and other crypto systems all solve the same problem in the same way.",
    "Bitcoin is different mostly because it changes direction quickly.",
  ],
  "Mindset & Strategy": [
    "Volatility becomes easier when decisions are made emotionally.",
    "Short-term reactions usually produce the same outcomes as long-term thinking.",
    "Beginner mistakes mostly come from learning too slowly rather than acting too fast.",
    "People panic sell because fundamentals suddenly disappear every time price drops.",
    "Conviction is built by avoiding first-principles understanding.",
  ],
  default: [
    "The main lesson takeaway is to trust appearance over verification.",
    "Beginners benefit most when they skip the underlying tradeoffs.",
    "A concept is strongest when ordinary users cannot inspect it.",
    "The safest approach is usually the fastest and least deliberate one.",
    "Understanding matters less than convenience in Bitcoin.",
  ],
};

function normalizeSentence(sentence: string, fallback: string) {
  const value = sentence.replace(/\s+/g, " ").trim();

  if (!value) {
    return fallback;
  }

  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function getSentences(text: string) {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function pickDistractors(section: string | undefined, exclude: string[], count = 3) {
  const pool = misconceptionBank[section ?? ""] ?? misconceptionBank.default;
  return pool.filter((item) => !exclude.includes(item)).slice(0, count);
}

function buildQuestion(
  lesson: Lesson,
  id: string,
  prompt: string,
  correctAnswer: string,
  explanation: string,
  distractorOffset: number,
): QuizQuestion {
  const distractors = pickDistractors(lesson.section, [correctAnswer]).slice(
    distractorOffset,
    distractorOffset + 3,
  );
  const options = [...distractors, correctAnswer];

  return {
    id,
    prompt,
    correctAnswer,
    explanation,
    options,
  };
}

export function buildLessonQuiz(lesson: Lesson): QuizQuestion[] {
  const sentences = getSentences(lesson.body);
  const summaryAnswer = normalizeSentence(
    lesson.summary,
    `This lesson explains ${lesson.title.toLowerCase()}.`,
  );
  const firstBodyAnswer = normalizeSentence(
    sentences[0] ?? "",
    `This lesson shows how ${lesson.title.toLowerCase()} fits into Bitcoin.`,
  );
  const secondBodyAnswer = normalizeSentence(
    sentences[1] ?? "",
    `A beginner should understand ${lesson.title.toLowerCase()} before moving forward.`,
  );

  return [
    buildQuestion(
      lesson,
      `${lesson.slug}-q1`,
      `What is the main idea of “${lesson.title}”?`,
      summaryAnswer,
      `This is the core takeaway the lesson is trying to leave you with before you continue.`,
      0,
    ),
    buildQuestion(
      lesson,
      `${lesson.slug}-q2`,
      "Which statement best matches the lesson's explanation?",
      firstBodyAnswer,
      "This answer reflects the lesson's direct explanation rather than a common misconception.",
      1,
    ),
    buildQuestion(
      lesson,
      `${lesson.slug}-q3`,
      "What should a beginner understand before moving on?",
      secondBodyAnswer,
      "This captures the next important piece of understanding the lesson is trying to build.",
      2,
    ),
  ];
}
