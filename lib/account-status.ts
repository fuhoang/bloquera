export type AccountStatus = {
  billingStatus: string;
  ctaHref: "/purchases";
  ctaLabel: string;
  headline: string;
  includedFeatures: string[];
  nextStep: string;
  planLabel: string;
};

const FREE_ACCOUNT_STATUS: AccountStatus = {
  billingStatus: "No active subscription",
  ctaHref: "/purchases",
  ctaLabel: "Open billing hub",
  headline: "Free plan",
  includedFeatures: [
    "Bitcoin curriculum access",
    "Quiz progress and dashboard history",
    "Authenticated profile and account recovery",
  ],
  nextStep: "Billing and purchase history will appear here once subscriptions go live.",
  planLabel: "Free",
};

export function getAccountStatus(): AccountStatus {
  return FREE_ACCOUNT_STATUS;
}
