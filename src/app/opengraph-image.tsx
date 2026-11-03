import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mann Clinic — Dr. Mohit Jain, Psychiatrist, Raebareli";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(135deg,#fff1f7 0%,#ffffff 55%,#dbe1f5 100%)", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", left: -120, top: -120, width: 520, height: 520, borderRadius: 999, background: "rgba(236,45,132,0.25)", filter: "blur(40px)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "#ec2d84", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 700 }}>म</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: "#121738" }}>Mann Clinic</div>
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, color: "#121738", lineHeight: 1.05, maxWidth: 900 }}>Mental health is health.</div>
          <div style={{ fontSize: 30, color: "#5b6283", maxWidth: 900 }}>Dr. Mohit Jain · MD Psychiatry (KGMU) · Confidential, evidence-based care in Raebareli</div>
        </div>
      </div>
    ),
    size,
  );
}
