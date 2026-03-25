export type AccountStatus = {
  billingSummary: string;
  billingStatus: string;
  ctaHref: "/purchases";
  ctaLabel: string;
  headline: string;
  includedFeatures: string[];
  upcomingFeatures: string[];
  nextStep: string;
  planLabel: string;
  planSummary: string;
};

const FREE_ACCOUNT_STATUS: AccountStatus = {
  billingSummary: "Free access is active for your account.",
  billingStatus: "No active subscription",
  ctaHref: "/purchases",
  ctaLabel: "Open billing hub",
  headline: "Free plan",
  includedFeatures: [
    "Bitcoin curriculum access",
    "Quiz progress and dashboard history",
    "Authenticated profile and account recovery",
  ],
  upcomingFeatures: [
    "Priority learning tracks and future premium modules",
    "Billing history, invoices, and plan management",
    "Expanded tutor access and premium account insights",
  ],
  nextStep: "Billing and purchase history will appear here once subscriptions go live.",
  planLabel: "Free",
  planSummary: "You can access the full live Bitcoin curriculum, quizzes, dashboard history, and account tools on the free plan today.",
};

export function getAccountStatus(): AccountStatus {
  return FREE_ACCOUNT_STATUS;
}
