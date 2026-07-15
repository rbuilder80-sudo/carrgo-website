const fs = require('fs');
let c = fs.readFileSync('src/pages/routes/GermanyToUk.tsx', 'utf8');

// Add links to port pages in the UK Destination Ports section
// Replace plain text port names with Link components where appropriate

// 1. Link Felixstowe to port page
// The port names are in a list with MapPin/Anchor icons - we can't easily add React Link components there
// because they're inside a map() function with plain text. 
// Instead, let's add a paragraph with links after the UK Destination Ports list

const ukPortsSectionEnd = `              </div>
            </div>
          </div>
        </section>

        {/* ====== SHIPPING OPTIONS ====== */}`;

const idx = c.indexOf(ukPortsSectionEnd);
if (idx === -1) {
  console.log('Could not find UK ports section end');
  process.exit(1);
}

const portLinks = `
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Learn more about UK ports: <a href="/ports/felixstowe" className="text-[#1A6DFF] hover:underline">Felixstowe</a> · <a href="/ports/southampton" className="text-[#1A6DFF] hover:underline">Southampton</a> · <a href="/ports/london-gateway" className="text-[#1A6DFF] hover:underline">London Gateway</a> · <a href="/ports/liverpool" className="text-[#1A6DFF] hover:underline">Liverpool</a> · <a href="/ports/immingham" className="text-[#1A6DFF] hover:underline">Immingham</a>
              </p>
            </div>`;

// Insert before the closing </div> of the grid
const insertBefore = `            </div>
          </div>
        </section>

        {/* ====== SHIPPING OPTIONS ====== */}`;
const insertIdx = c.indexOf(insertBefore);
if (insertIdx === -1) {
  console.log('Could not find insert point');
  process.exit(1);
}

const newContent = c.substring(0, insertIdx) + portLinks + '\n' + c.substring(insertIdx);
fs.writeFileSync('src/pages/routes/GermanyToUk.tsx', newContent);
console.log('Added port links to GermanyToUk.tsx');
