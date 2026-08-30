// Generates a 128px CARRGO bridge icon (amber radar glyph) as PNG — dependency-free.
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const width = 128, height = 128;
const pixels = Buffer.alloc(width * height * 4);

function setPx(x, y, r, g, b, a = 255) {
  const i = (y * width + x) * 4;
  pixels[i] = r; pixels[i + 1] = g; pixels[i + 2] = b; pixels[i + 3] = a;
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const m = 8, rad = 26;
    const dx = Math.max(m - x, 0, x - (width - 1 - m));
    const dy = Math.max(m - y, 0, y - (height - 1 - m));
    const cornerDist = Math.sqrt(dx * dx + dy * dy);
    const inside = cornerDist <= rad || dx === 0 || dy === 0;
    let r = 15, g = 20, b = 23, a = inside ? 255 : 0;
    const cx = 64, cy = 64;
    const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    const ring = Math.abs(dist - 40) < 2 || Math.abs(dist - 26) < 2 || Math.abs(dist - 12) < 2;
    const beam = Math.abs((y - cy) - 0.45 * (x - cx)) < 3 && x - cx > 0 && dist < 46;
    if (inside && (ring || beam || dist < 7)) { r = 251; g = 191; b = 36; }
    setPx(x, y, r, g, b, a);
  }
}

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8; ihdr[9] = 6;
const raw = Buffer.alloc(height * (1 + width * 4));
for (let y = 0; y < height; y++) {
  raw[y * (1 + width * 4)] = 0;
  pixels.copy(raw, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4);
}
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
]);
const out = path.join(__dirname, '..', 'extension-src', 'icons');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'icon128.png'), png);
console.log('icon written:', png.length, 'bytes');
