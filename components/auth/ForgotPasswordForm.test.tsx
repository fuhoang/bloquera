import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const resetPasswordForEmail = vi.fn();
const createBrowserSupabaseClient = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createBrowserSupabaseClient: () => createBrowserSupabaseClient(),
}));

describe("ForgotPasswordForm", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    resetPasswordForEmail.mockReset();
    createBrowserSupabaseClient.mockReset();
    Object.defineProperty(window, "location", {
      value: {
        ...originalLocation,
        origin: "http://localhost:3000",
      },
      writable: true,
    });
    createBrowserSupabaseClient.mockReturnValue({
      auth: {
        resetPasswordForEmail,
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });
  });

  it("requests a password reset email", async () => {
    resetPasswordForEmail.mockResolvedValue({ error: null });

    render(<ForgotPasswordForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send reset link" }));

    await waitFor(() => {
      expect(resetPasswordForEmail).toHaveBeenCalledWith("user@example.com", {
        redirectTo: "http://localhost:3000/auth/callback?next=%2Fauth%2Freset-password",
      });
    });

    expect(
      await screen.findByText("Password reset email sent. Check your inbox for the secure link."),
    ).toBeInTheDocument();
  });

  it("renders an initial auth error from the page", () => {
    render(<ForgotPasswordForm initialError="Recovery link expired." />);

    expect(screen.getByText("Recovery link expired.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return to login" })).toHaveAttribute(
      "href",
      "/auth/login",
    );
  });
});
