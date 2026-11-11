// Prepares the doctor's photo: full desk shot + a 4:5 portrait crop centred on him.
// Usage: node scripts/doctor-photo.mjs <input>
import sharp from "sharp";
const src = process.argv[2];
const meta = await sharp(src).metadata();
console.log("input", meta.width, meta.height);
await sharp(src).resize(1600, null, { withoutEnlargement: true }).webp({ quality: 84 }).toFile("public/images/dr-mohit-jain-desk.webp");
// portrait: 4:5 window around the doctor (he sits in the right ~45% of the frame)
const h = meta.height, w = Math.round(h * 0.8);
const left = Math.min(meta.width - w, Math.round(meta.width * 0.66 - w / 2));
await sharp(src).extract({ left, top: 0, width: w, height: h }).resize(800, 1000).webp({ quality: 86 }).toFile("public/images/dr-mohit-jain.webp");
console.log("portrait crop left", left, "w", w);
