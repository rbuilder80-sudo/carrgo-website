import { useEffect } from 'react';

interface PreloadResource {
  href: string;
  as: string;
  type?: string;
  crossorigin?: boolean;
}

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  preload?: PreloadResource[];
  gscVerification?: string;
}

export default function Seo({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = 'https://carrgo.co.uk/og-image.jpg',
  ogUrl,
  canonical,
  structuredData,
  noindex = false,
  preload = [],
  gscVerification,
}: SeoProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Meta keywords
    if (keywords) {
      let metaKw = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.setAttribute('name', 'keywords');
        document.head.appendChild(metaKw);
      }
      metaKw.setAttribute('content', keywords);
    }

    // Canonical
    let linkCan = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCan) {
      linkCan = document.createElement('link');
      linkCan.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCan);
    }
    linkCan.setAttribute('href', canonical || ogUrl || 'https://carrgo.co.uk/');

    // OG Tags
    const ogTags: Record<string, string> = {
      'og:title': ogTitle || title,
      'og:description': ogDescription || description,
      'og:type': 'website',
      'og:url': ogUrl || 'https://carrgo.co.uk/',
      'og:image': ogImage,
      'og:locale': 'en_GB',
      'og:site_name': 'Carrgo Freight Solutions',
    };
    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Twitter Cards
    const twTags: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': ogTitle || title,
      'twitter:description': ogDescription || description,
      'twitter:image': ogImage,
    };
    Object.entries(twTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Robots
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Google Search Console verification
    if (gscVerification) {
      let metaGsc = document.querySelector('meta[name="google-site-verification"]') as HTMLMetaElement | null;
      if (!metaGsc) {
        metaGsc = document.createElement('meta');
        metaGsc.setAttribute('name', 'google-site-verification');
        document.head.appendChild(metaGsc);
      }
      metaGsc.setAttribute('content', gscVerification);
    }

    // Structured Data
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

    // Hreflang
    let hreflang = document.querySelector('link[hreflang="en-gb"]') as HTMLLinkElement | null;
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.setAttribute('rel', 'alternate');
      hreflang.setAttribute('hreflang', 'en-gb');
      document.head.appendChild(hreflang);
    }
    hreflang.setAttribute('href', canonical || ogUrl || 'https://carrgo.co.uk/');

    // Preload critical route-specific resources
    const preloadLinks: HTMLLinkElement[] = [];
    preload.forEach((resource) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'preload');
      link.setAttribute('href', resource.href);
      link.setAttribute('as', resource.as);
      if (resource.type) link.setAttribute('type', resource.type);
      if (resource.crossorigin) link.setAttribute('crossorigin', '');
      document.head.appendChild(link);
      preloadLinks.push(link);
    });

    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
      // Clean up preload links on unmount
      preloadLinks.forEach(link => link.remove());
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical, structuredData, noindex, preload]);

  return null;
}
