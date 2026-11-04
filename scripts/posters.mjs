// Crops the 5x3 Instagram grid screenshots (user-supplied theme refs) into poster tiles.
import sharp from "sharp";
const srcs = process.argv.slice(2);
let n = 0;
for (const src of srcs) {
  const img = sharp(src); const { width, height } = await img.metadata();
  const cols = 5, rows = 2; // third row is cut off in both screenshots
  const tw = width / cols, th = Math.min(height / 2.33, (height - 0) / 2.3);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    n++;
    await sharp(src).extract({ left: Math.round(c * tw) + 2, top: Math.round(r * th) + 2, width: Math.round(tw) - 4, height: Math.round(th) - 4 })
      .resize(600, null).webp({ quality: 82 }).toFile(`public/posters/p${String(n).padStart(2, "0")}.webp`);
  }
}
console.log("tiles:", n);
