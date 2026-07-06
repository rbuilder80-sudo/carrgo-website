import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Ship, Plane, Truck, TrainFront, FileCheck, Package, Warehouse, ArrowRight } from 'lucide-react';

export default function ServicesHub() {
  return (
    <main role="main" className="min-h-screen">
      <Seo
        title="Freight Services UK | Sea, Air, Road & Rail | Carrgo"
        description="Full range of UK freight services — sea freight, air cargo, road haulage, rail freight, customs clearance & more. Get all-inclusive quotes in 2 hours."
        keywords="freight services uk, sea freight, air cargo, road freight, rail freight, customs clearance, freight forwarding services"
        ogUrl="https://carrgo.co.uk/services"
        canonical="https://carrgo.co.uk/services"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A6DFF] to-[#1557CC] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">All Freight Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Sea, air, road & rail freight plus customs clearance — all under one roof. 
            All-inclusive quotes in 2 hours.
          </p>
          <Link 
            to="/get-a-quote"
            className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Get a Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Ship, title: 'Sea Freight', desc: 'FCL & LCL container shipping worldwide', to: '/services/sea-freight' },
            { icon: Plane, title: 'Air Freight', desc: 'Express & economy air cargo', to: '/services/air-freight' },
            { icon: Truck, title: 'Road Freight', desc: 'European FTL & LTL haulage', to: '/services/road-freight' },
            { icon: TrainFront, title: 'Rail Freight', desc: 'China to UK via New Silk Road', to: '/services/rail-freight-china-uk' },
            { icon: FileCheck, title: 'Customs Clearance', desc: 'Import & export declarations', to: '/services/customs-clearance' },
            { icon: Package, title: 'Door-to-Door', desc: 'End-to-end shipping solutions', to: '/services/door-to-door' },
            { icon: Warehouse, title: 'Warehousing', desc: 'Storage & distribution', to: '/services/warehousing' },
          ].map(s => (
            <Link 
              key={s.to}
              to={s.to}
              className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
            >
              <s.icon className="w-10 h-10 text-[#1A6DFF] mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1A6DFF] transition-colors">{s.title}</h2>
              <p className="text-gray-600">{s.desc}</p>
              <span className="inline-flex items-center gap-1 text-[#1A6DFF] font-medium mt-4 text-sm">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
