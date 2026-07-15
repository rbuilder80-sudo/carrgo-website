const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// The broken area: after </p> on line 243, we have the who-we-help comment directly
// We need to insert the hero's right side (quote form) and closing tags before the who-we-help section

const insertBefore = '      /* ====== WHO WE HELP (buyer personas) ====== */';
const idx = c.indexOf(insertBefore);

if (idx === -1) {
  console.log('Could not find insert point');
  process.exit(1);
}

const heroRightSide = `
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-2">Get Your Quote</h2>
                <p className="text-brand-100 mb-6 text-sm">Fill in your details and we will respond within 2 hours.</p>
                {heroSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Quote Request Sent!</h3>
                    <p className="text-brand-100 text-sm">We will respond within 2 hours.</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleHeroSubmit}>
                    <div>
                      <label htmlFor="hero-name" className="block text-sm font-medium mb-1">Full Name</label>
                      <input id="hero-name" name="name" type="text" required className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white" aria-required="true" />
                    </div>
                    <div>
                      <label htmlFor="hero-email" className="block text-sm font-medium mb-1">Email</label>
                      <input id="hero-email" name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white" aria-required="true" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="hero-origin" className="block text-sm font-medium mb-1">Origin</label>
                        <input id="hero-origin" name="origin" type="text" placeholder="e.g. Shanghai" className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white" />
                      </div>
                      <div>
                        <label htmlFor="hero-mode" className="block text-sm font-medium mb-1">Mode</label>
                        <select id="hero-mode" name="mode" className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white">
                          <option value="">Select...</option>
                          <option value="sea">Sea</option>
                          <option value="air">Air</option>
                          <option value="road">Road</option>
                          <option value="rail">Rail</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" disabled={heroLoading} className="w-full bg-white text-brand-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed">
                      {heroLoading ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-brand-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Get My Quote'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

`;

const newContent = c.substring(0, idx) + heroRightSide + c.substring(idx);
fs.writeFileSync('src/pages/Home.tsx', newContent);
console.log('Fixed hero section. File now ' + newContent.length + ' chars');
