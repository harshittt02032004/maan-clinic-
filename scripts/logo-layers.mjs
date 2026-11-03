// Splits the client logo (JPEG on white) into transparent PNG layers by colour so the
// Logo component can animate the figures, the wordmark and the tagline independently.
// Usage: node scripts/logo-layers.mjs <input.jpg>
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const src = process.argv[2];
const out = "public/brand";
await mkdir(out, { recursive: true });

const { data, info } = await sharp(src).trim({ threshold: 30 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// region guesses are relative so they survive the trim
const yTag = H * 0.74; // tagline starts below ~74% height
const xMarkOnly = W * 0.17; // left leg of the M
const xMarkEdge = W * 0.4; // right edge of the M
const yMarkRight = H * 0.5; // right leg of the M ends here

const layers = { mark: Buffer.alloc(W * H * 4), word: Buffer.alloc(W * H * 4), tag: Buffer.alloc(W * H * 4), full: Buffer.alloc(W * H * 4) };

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const min = Math.min(r, g, b);
    const alpha = Math.max(0, Math.min(255, Math.round((255 - min) * 1.35)));
    if (alpha < 8) continue;
    if (x > W - 12) continue; // JPEG edge artefact

    const blue = b > r + 40 && b > g + 10;
    const pink = r > g + 60 && r > b;
    let key;
    // faint pink JPEG bleed just under the M's right leg (letters are fully saturated, bleed is not)
    if (pink && r - g < 120 && x > W * 0.25 && x < xMarkEdge && y > H * 0.44 && y < H * 0.53) continue;
    if (blue) key = "mark";
    else if (pink) key = "word";
    else if (y >= yTag) key = "tag";
    else if (x < xMarkOnly || (x < xMarkEdge && y < yMarkRight)) key = "mark";
    else key = "word";

    // un-premultiply against white so edges stay the brand colour, not grey
    const a = alpha / 255;
    const px = (c) => Math.max(0, Math.min(255, Math.round((c - 255 * (1 - a)) / a)));
    for (const k of [key, "full"]) {
      const L = layers[k];
      L[i] = px(r); L[i + 1] = px(g); L[i + 2] = px(b); L[i + 3] = alpha;
    }
  }
}

for (const [k, buf] of Object.entries(layers)) {
  await sharp(buf, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9 }).toFile(`${out}/logo-${k}.png`);
}

// Square app icon from the figures only
const mark = sharp(layers.mark, { raw: { width: W, height: H, channels: 4 } }).png();
const trimmed = await mark.trim().toBuffer({ resolveWithObject: true });
const side = Math.max(trimmed.info.width, trimmed.info.height) + 40;
await sharp({ create: { width: side, height: side, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } } })
  .composite([{ input: trimmed.data, gravity: "centre" }])
  .resize(512, 512)
  .png()
  .toFile("src/app/icon.png");

console.log({ W, H, ratio: (W / H).toFixed(4) });
