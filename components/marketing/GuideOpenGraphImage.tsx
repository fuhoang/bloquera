import { ImageResponse } from "next/og";

import type { PublicGuide } from "@/lib/public-guides";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export function renderGuideOpenGraphImage(guide: PublicGuide) {
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
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700 }}>Blockwise</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.65)" }}>
                {guide.eyebrow}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 66,
              lineHeight: 1.04,
              fontWeight: 800,
              maxWidth: 980,
              letterSpacing: "-0.04em",
            }}
          >
            {guide.ogTitle}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 900,
            }}
          >
            {guide.ogSubtitle}
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
          <div>Beginner friendly</div>
          <div>•</div>
          <div>Guided learning</div>
          <div>•</div>
          <div>Live Bitcoin track</div>
        </div>
      </div>
    ),
    size,
  );
}
