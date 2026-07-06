import Seo from '../components/Seo';
import { Plane } from 'lucide-react';

export default function AirCargo() {
  return (
    <main role="main" className="min-h-screen">
      <Seo
        title="Air Cargo UK | Express & Economy Air Freight | Carrgo"
        description="Air cargo UK — express and economy air freight services. Heathrow, Manchester & East Midlands airports. 3-5 days worldwide. Get air cargo quotes."
        keywords="air cargo uk, air freight, express air cargo, economy air freight, airport freight, heathrow cargo"
        ogUrl="https://carrgo.co.uk/services/air-cargo"
        canonical="https://carrgo.co.uk/services/air-cargo"
      />

      <section className="bg-gradient-to-br from-[#1A6DFF] to-[#1557CC] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">Air Cargo UK</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Express & economy air cargo services. Heathrow, Manchester & East Midlands.
            3-5 days worldwide delivery.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <Plane className="w-16 h-16 text-[#1A6DFF] mx-auto mb-6" />
        <p className="text-gray-600 text-lg">
          Full page coming soon. For air cargo quotes, please visit our 
          <a href="#/services/air-freight" className="text-[#1A6DFF] hover:underline">Air Freight page</a> or 
          <a href="#/get-a-quote" className="text-[#1A6DFF] hover:underline">get a quote</a>.
        </p>
      </section>
    </main>
  );
}
