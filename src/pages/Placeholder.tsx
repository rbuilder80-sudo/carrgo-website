import Seo from '../components/Seo';

interface PlaceholderProps {
  title: string;
  description?: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <>
      <Seo title={`${title} | Carrgo Freight Solutions`} description={description || `${title} - Carrgo Freight Solutions, trusted UK freight forwarder.`} />
      <section aria-label={title} className="py-24 bg-gray-50">
        <div className="container-carrgo text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 max-w-xl mx-auto">{description || 'Page coming soon. Contact us at support@carrgo.co.uk for more information.'}</p>
        </div>
      </section>
    </>
  );
}
