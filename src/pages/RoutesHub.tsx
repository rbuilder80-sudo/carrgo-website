import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Globe, ArrowRight } from 'lucide-react';

export default function RoutesHub() {
  const routes = [
    { label: 'China to UK', to: '/routes/china-to-uk' },
    { label: 'Germany to UK', to: '/routes/germany-to-uk' },
    { label: 'Netherlands to UK', to: '/routes/netherlands-to-uk' },
    { label: 'India to UK', to: '/routes/india-to-uk' },
    { label: 'USA to UK', to: '/routes/usa-to-uk' },
    { label: 'Turkey to UK', to: '/routes/turkey-to-uk' },
    { label: 'UAE to UK', to: '/routes/uae-to-uk' },
    { label: 'Spain to UK', to: '/routes/spain-to-uk' },
    { label: 'Ireland (Dublin)', to: '/routes/dublin-ireland' },
    { label: 'Northern Ireland (Belfast)', to: '/routes/belfast-northern-ireland' },
  ];

  return (
    <main role="main" className="min-h-screen">
      <Seo
        title="Freight Routes | China, EU, USA, India to UK | Carrgo"
        description="Freight shipping routes to UK — China, Germany, Netherlands, India, USA, UAE, Spain, Turkey, Ireland & Northern Ireland. Sea, air, road & rail."
        keywords="freight routes uk, shipping routes, china to uk, germany to uk, india to uk, usa to uk, freight from europe"
        ogUrl="https://carrgo.co.uk/routes"
        canonical="https://carrgo.co.uk/routes"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A6DFF] to-[#1557CC] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">Freight Routes to UK</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Global freight shipping routes — sea, air, road & rail from major trade corridors to the UK.
          </p>
          <Link 
            to="/get-a-quote"
            className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Get a Route Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Routes Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map(r => (
            <Link 
              key={r.to}
              to={r.to}
              className="group flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <Globe className="w-8 h-8 text-[#1A6DFF] shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#1A6DFF] transition-colors">{r.label}</h2>
                <span className="inline-flex items-center gap-1 text-[#1A6DFF] font-medium text-sm mt-1">
                  View route <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
