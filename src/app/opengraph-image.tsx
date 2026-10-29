import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "12testeurs — 14 testeurs réels pour ton test fermé Google Play de 14 jours, 39 €";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const display = await readFile(join(process.cwd(), "src/fonts/archivo-display.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#3a3aff",
          color: "#ffffff",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4 }}>
          <span>N1 · PROTOCOLE TEST FERMÉ</span>
          <span>GOOGLE PLAY · ANDROID</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Archivo Display", fontSize: 112, lineHeight: 0.9, textTransform: "uppercase" }}>Google exige 12 testeurs.</div>
          <div style={{ fontFamily: "Archivo Display", fontSize: 112, lineHeight: 0.9, textTransform: "uppercase" }}>On t’en fournit 14.</div>
          <div style={{ fontSize: 40, marginTop: 28, color: "#dedeff" }}>
            Test fermé Google Play · 14 jours · retours QA en français
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                background: "#ffffff",
                color: "#3a3aff",
                fontSize: 36,
                fontWeight: 700,
              }}
            >
              12
            </div>
            <span style={{ fontSize: 30, letterSpacing: 6 }}>TESTEURS</span>
          </div>
          <div
            style={{
              display: "flex",
              background: "#0b0b0c",
              color: "#ffffff",
              fontSize: 34,
              padding: "14px 28px",
              boxShadow: "8px 8px 0 0 #ffffff",
            }}
          >
            39 € · remboursé si refusé
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo Display", data: display, weight: 800, style: "normal" }] },
  );
}
