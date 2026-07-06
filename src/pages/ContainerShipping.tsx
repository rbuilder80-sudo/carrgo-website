import Seo from '../components/Seo';
import { Ship } from 'lucide-react';

export default function ContainerShipping() {
  return (
    <main role="main" className="min-h-screen">
      <Seo
        title="Container Shipping UK | FCL & LCL Sea Freight | Carrgo"
        description="Container shipping UK — FCL & LCL services from China, India, USA & Europe. 20ft, 40ft & 40ft HC containers. Competitive rates. Get quotes in 2 hours."
        keywords="container shipping uk, fcl shipping, lcl shipping, sea freight containers, shipping containers, 20ft container, 40ft container"
        ogUrl="https://carrgo.co.uk/services/container-shipping"
        canonical="https://carrgo.co.uk/services/container-shipping"
      />

      <section className="bg-gradient-to-br from-[#1A6DFF] to-[#1557CC] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">Container Shipping UK</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            FCL & LCL container shipping worldwide. 20ft, 40ft and 40ft HC containers.
            Competitive all-inclusive rates.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <Ship className="w-16 h-16 text-[#1A6DFF] mx-auto mb-6" />
        <p className="text-gray-600 text-lg">
          Full page coming soon. For container shipping quotes, please visit our 
          <a href="#/services/sea-freight" className="text-[#1A6DFF] hover:underline">Sea Freight page</a> or 
          <a href="#/get-a-quote" className="text-[#1A6DFF] hover:underline">get a quote</a>.
        </p>
      </section>
    </main>
  );
}
