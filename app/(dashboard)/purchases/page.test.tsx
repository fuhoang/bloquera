import { render, screen } from "@testing-library/react";

import PurchasesPage from "@/app/(dashboard)/purchases/page";

const getProfileSummary = vi.fn();

vi.mock("@/lib/profile", () => ({
  getProfileSummary: () => getProfileSummary(),
}));

describe("purchases page route", () => {
  it("renders the billing hub with account status", async () => {
    getProfileSummary.mockResolvedValue({
      label: "Satoshi",
      profile: null,
    });

    const page = await PurchasesPage();

    render(page);

    expect(
      screen.getByText("Subscription and purchase history"),
    ).toBeInTheDocument();
    expect(screen.getByText("Free plan")).toBeInTheDocument();
    expect(
      screen.getByText("No purchases are linked to this account yet."),
    ).toBeInTheDocument();
    expect(screen.getByText("Billing roadmap")).toBeInTheDocument();
    expect(screen.getByText("Satoshi")).toBeInTheDocument();
  });
});
