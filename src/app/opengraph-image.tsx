import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mann Clinic — Dr. Mohit Jain, Psychiatrist, Raebareli";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", fontFamily: "sans-serif", position: "relative", border: "16px solid #14213D" }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 360, background: "#E5147E" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: 840 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#1B5FAE", fontWeight: 700 }}>PSYCHIATRY · RAEBARELI</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 76, fontWeight: 800, color: "#14213D", lineHeight: 1.0 }}>Mental health is health.</div>
            <div style={{ fontSize: 28, color: "#3B4663" }}>Dr. Mohit Jain · MD Psychiatry (KGMU) · Mann Clinic</div>
          </div>
          <div style={{ fontSize: 22, color: "#14213D", fontWeight: 700 }}>Mann Clinic — We care about your feelings..</div>
        </div>
      </div>
    ),
    size,
  );
}
