import { ImageResponse } from "next/og";

export const alt = "Blockwise crypto learning";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
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
            "radial-gradient(circle at top left, rgba(249,115,22,0.35), transparent 40%), #09090b",
          color: "white",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f97316",
              color: "#09090b",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            BW
          </div>
          <div>Blockwise</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 66,
              lineHeight: 1.04,
              fontWeight: 800,
              maxWidth: 900,
              letterSpacing: "-0.04em",
            }}
          >
            Learn crypto with a clear path, starting with Bitcoin.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 860,
            }}
          >
            Structured lessons, quizzes, progress tracking, and an AI tutor for
            beginners who want clarity over noise.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            fontSize: 22,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <div>Crypto basics</div>
          <div>•</div>
          <div>Wallets</div>
          <div>•</div>
          <div>Guided learning</div>
        </div>
      </div>
    ),
    size,
  );
}
