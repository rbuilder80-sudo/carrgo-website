const fs = require('fs');
let c = fs.readFileSync('src/pages/routes/GermanyToUk.tsx', 'utf8');

// Insert direct answer block after the H1 closing tag
const insertAfter = `                </h1>`;
const idx = c.indexOf(insertAfter);

// Find the specific H1 for Germany
const h1Pattern = 'Germany to UK Freight — Road, Sea & Air Shipping';
const h1Idx = c.indexOf(h1Pattern);

if (h1Idx === -1) {
  console.log('Could not find H1 pattern');
  process.exit(1);
}

// Find the closing </h1> after this H1
const afterH1 = c.indexOf('</h1>', h1Idx);
if (afterH1 === -1) {
  console.log('Could not find </h1>');
  process.exit(1);
}

const insertPoint = afterH1 + 5; // after '</h1>'

const directAnswer = `
                {/* Direct answer block for AI search readiness */}
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-6 border border-white/20" itemScope itemType="https://schema.org/Answer">
                  <p className="text-lg text-white leading-relaxed" itemProp="text">
                    <strong className="text-green-300">Carrgo ships freight from Germany to the UK</strong> by road (2–4 days), sea (5–8 days), and air (1–2 days). Daily road departures from Hamburg, Frankfurt, Munich, and all major German cities. Full post-Brexit customs clearance included with every shipment.
                  </p>
                </div>`;

const newContent = c.substring(0, insertPoint) + directAnswer + c.substring(insertPoint);
fs.writeFileSync('src/pages/routes/GermanyToUk.tsx', newContent);
console.log('Added direct answer block to GermanyToUk.tsx');
