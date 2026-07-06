import Seo from '../components/Seo';
import { Warehouse } from 'lucide-react';

export default function Logistics() {
  return (
    <main role="main" className="min-h-screen">
      <Seo
        title="Logistics Company UK | Freight & Supply Chain | Carrgo"
        description="UK logistics company — freight forwarding, warehousing & supply chain solutions. Sea, air, road & rail. BIFA & IATA accredited. Get logistics quotes."
        keywords="logistics company uk, freight logistics, supply chain uk, warehousing, freight forwarding, logistics services"
        ogUrl="https://carrgo.co.uk/services/logistics"
        canonical="https://carrgo.co.uk/services/logistics"
      />

      <section className="bg-gradient-to-br from-[#1A6DFF] to-[#1557CC] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">Logistics Company UK</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            End-to-end logistics solutions — freight forwarding, warehousing & supply chain management.
            BIFA & IATA accredited.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <Warehouse className="w-16 h-16 text-[#1A6DFF] mx-auto mb-6" />
        <p className="text-gray-600 text-lg">
          Full page coming soon. For logistics quotes, please 
          <a href="#/get-a-quote" className="text-[#1A6DFF] hover:underline">get a quote</a> or 
          <a href="#/contact" className="text-[#1A6DFF] hover:underline">contact us</a>.
        </p>
      </section>
    </main>
  );
}
