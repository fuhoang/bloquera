import { ImageResponse } from "next/og";

export const alt = "Bloquera pricing";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function PricingOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(145deg, rgba(249,115,22,0.22), rgba(255,255,255,0.04)), #09090b",
          color: "white",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "10px 18px",
            fontSize: 20,
            color: "rgba(255,255,255,0.78)",
          }}
        >
          Bloquera pricing
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 70,
              lineHeight: 1.02,
              fontWeight: 800,
              maxWidth: 880,
              letterSpacing: "-0.05em",
            }}
          >
            Simple plans for serious crypto learners.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 860,
            }}
          >
            Guided lessons, quizzes, tutor support, and a live Bitcoin track,
            with room to grow into future crypto topics.
          </div>
        </div>

        <div style={{ display: "flex", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              padding: "20px 24px",
            }}
          >
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.65)" }}>Starter</div>
            <div style={{ marginTop: 8, fontSize: 42, fontWeight: 800 }}>$0</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 24,
              border: "1px solid rgba(249,115,22,0.4)",
              background: "rgba(249,115,22,0.12)",
              padding: "20px 24px",
            }}
          >
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.65)" }}>Pro</div>
            <div style={{ marginTop: 8, fontSize: 42, fontWeight: 800 }}>$19</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
