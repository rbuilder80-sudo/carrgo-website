import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export default function Seo({ title, description, structuredData }: SeoProps) {
  useEffect(() => {
    document.title = title;
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
    if (structuredData) {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
      const schemas = Array.isArray(structuredData) ? structuredData : [structuredData];
      schemas.forEach(data => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    };
  }, [title, description, structuredData]);

  return null;
}
