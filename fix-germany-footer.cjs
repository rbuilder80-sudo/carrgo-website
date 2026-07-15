const fs = require('fs');
let c = fs.readFileSync('src/pages/routes/GermanyToUk.tsx', 'utf8');

// Add Last Updated footer before closing </main>
const lastUpdated = `        {/* ====== LAST UPDATED ====== */}
        <section className="py-6 bg-gray-100 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  <strong>Page verified and updated:</strong> <time dateTime="2026-07-15">15 July 2026</time>
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Transit times and customs information reviewed weekly. <a href="/resources/freight-faqs" className="text-[#1A6DFF] hover:underline">View FAQs</a> · <a href="/resources/shipping-guides" className="text-[#1A6DFF] hover:underline">Shipping guides</a>
              </p>
            </div>
          </div>
        </section>
`;

const mainClose = '      </main>';
const idx = c.lastIndexOf(mainClose);
if (idx === -1) {
  console.log('Could not find </main>');
  process.exit(1);
}

const newContent = c.substring(0, idx) + lastUpdated + c.substring(idx);
fs.writeFileSync('src/pages/routes/GermanyToUk.tsx', newContent);
console.log('Added Last Updated footer to GermanyToUk.tsx');
