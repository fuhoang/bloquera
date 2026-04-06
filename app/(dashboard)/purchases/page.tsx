import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

import { PurchasesFolderTabs } from "@/components/purchases/PurchasesFolderTabs";
import { moduleConfig } from "@/content/config";
import { getBillingContextForCurrentUser } from "@/lib/account-status";
import { getTutorRequestLimit } from "@/lib/billing";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Purchases",
  description: "View your Blockwise plan access, billing hub, and future purchase history.",
  pathname: "/purchases",
  noIndex: true,
});

export default async function PurchasesPage() {
  noStore();

  const { accountStatus, billingSnapshot, profile, priceMap } =
    await getBillingContextForCurrentUser();
  const purchaseCount = billingSnapshot.purchaseEvents.length;
  const premiumModules = moduleConfig.filter((module) => module.requiresPro);
  const tutorLimit = getTutorRequestLimit(billingSnapshot);
  const subscription = billingSnapshot.subscription;
  const latestInvoicePaid = billingSnapshot.purchaseEvents.find(
    (event) => event.event_type === "invoice.paid",
  );
  const renewalLabel = subscription?.current_period_end
    ? formatDate(subscription.current_period_end)
    : "Not available";
  const startedLabel = subscription?.current_period_start
    ? formatDate(subscription.current_period_start)
    : "Not available";
  const planCadenceLabel =
    subscription?.plan_slug === "pro_yearly"
      ? "Yearly billing"
      : subscription?.plan_slug === "pro_monthly"
        ? "Monthly billing"
        : "Free access";
  const invoiceSummary =
    latestInvoicePaid && latestInvoicePaid.amount_cents !== null && latestInvoicePaid.currency
      ? `${formatMoney(latestInvoicePaid.amount_cents, latestInvoicePaid.currency)} paid ${formatDate(latestInvoicePaid.created_at)}`
      : purchaseCount > 0
        ? "Billing activity recorded on this account"
        : "No invoice paid yet";
  const timelineSummary = subscription
    ? subscription.cancel_at_period_end
      ? `Cancellation is scheduled. Pro access remains active until ${renewalLabel}.`
      : `Your ${planCadenceLabel.toLowerCase()} renews on ${renewalLabel}.${latestInvoicePaid ? ` Latest paid invoice: ${invoiceSummary}.` : ""}`
    : null;
  const tutorAllowanceLabel = `${tutorLimit} AI tutor questions per day`;
  const subscriptionTimeline = subscription
    ? [
        {
          label: "Plan started",
          value: startedLabel,
          helper: subscription.current_period_start
            ? "Current subscription cycle start"
            : "Start date unavailable",
        },
        {
          label: subscription.cancel_at_period_end ? "Access ends" : "Next renewal",
          value: renewalLabel,
          helper: subscription.cancel_at_period_end
            ? "Your Pro access stays active until this date"
            : "Stripe will renew your subscription on this date",
        },
        {
          label: "Billing cadence",
          value: planCadenceLabel,
          helper:
            subscription.plan_slug === "pro_yearly"
              ? "One invoice per year"
              : "One invoice per month",
        },
        {
          label: "Latest invoice",
          value: invoiceSummary,
          helper:
            latestInvoicePaid?.status === "paid"
              ? "Most recent paid Stripe invoice"
              : "Invoice activity will appear after successful billing events",
        },
      ]
    : [
        {
          label: "Current access",
          value: "Free plan",
          helper: "No active recurring subscription yet",
        },
        {
          label: "Upgrade path",
          value: "Monthly or yearly Pro",
          helper: "Choose a plan below to unlock premium access",
        },
      ];

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <p className="text-sm text-zinc-500">Purchases</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Subscription and purchase history
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            This is the billing hub for your Blockwise account. It reflects your
            current access level, current subscription state, and recent Stripe
            purchase events.
          </p>
        </section>

        <PurchasesFolderTabs
          accountStatus={accountStatus}
          canCheckout={Boolean(priceMap)}
          canOpenPortal={Boolean(billingSnapshot.customerId)}
          premiumModules={premiumModules}
          profileLabel={profile.display_name || profile.email || "Profile"}
          purchaseCount={purchaseCount}
          purchaseEvents={billingSnapshot.purchaseEvents}
          subscriptionTimeline={subscriptionTimeline}
          timelineSummary={timelineSummary}
          tutorAllowanceLabel={tutorAllowanceLabel}
        />
      </div>
    </main>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatMoney(amountCents: number, currency: string) {
  return `${(amountCents / 100).toFixed(2)} ${currency.toUpperCase()}`;
}
