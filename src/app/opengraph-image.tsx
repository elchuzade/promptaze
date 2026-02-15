import { ImageResponse } from "next/og";

export const alt = "Promptaze — Azərbaycan dilində AI prompt kitabxanası";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f8f8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 72 }}>⚡</span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#333333",
            }}
          >
            Promptaze
          </span>
        </div>
        <p
          style={{
            fontSize: 28,
            color: "#6b7280",
            margin: 0,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Azərbaycan dilində AI prompt kitabxanası
        </p>
        <p
          style={{
            fontSize: 22,
            color: "#208c6e",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Hazır promptları kopyalayın · Öyrənin · Paylaşın
        </p>
      </div>
    ),
    { ...size }
  );
}
