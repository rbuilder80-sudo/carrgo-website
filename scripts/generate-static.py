# Carrgo Static HTML Generator for GitHub Pages
# Fixes the broken 404.html and creates static HTML files for every route
# Each route gets: proper meta tags, H1, structured data, and React app hydration

import json, os, re, shutil
from datetime import date
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit


def normalize_page_url(url):
    """Use the canonical form GitHub Pages serves for directory-backed pages."""
    parsed = urlsplit(url)
    if (
        parsed.netloc == "www.carrgo.co.uk"
        and parsed.path != "/"
        and not parsed.path.endswith("/")
        and not re.search(r"\.[a-z0-9]+$", parsed.path, re.IGNORECASE)
    ):
        parsed = parsed._replace(path=parsed.path + "/")
    return urlunsplit(parsed)

# === Route metadata: pain-point-focused SEO for every page ===
ROUTES = {
    "/": {
        "title": "Cargo Services UK | Freight Forwarder Quotes in 2 Hours | Carrgo",
        "description": "Cargo services for UK importers and exporters. Carrgo handles sea, air, road, rail, customs and door-to-door delivery with quotes in 2 hours.",
        "keywords": "cargo services uk, freight forwarder uk, freight forwarding company uk, shipping and cargo services, cargo transportation, cargo logistics, cargo freight forwarding, cargo forwarder, cargo shippers, cargo shipping company, freight forwarder near me, shipping company uk, logistics company, freight company, customs clearance agents uk, import shipping uk, export shipping uk, freight quote uk, manchester freight",
        "canonical": "https://www.carrgo.co.uk/",
        "h1": "UK Cargo Services &amp; Freight Forwarding",
        "staticBody": """
<h2>Cargo services for UK importers and exporters</h2>
<p>Carrgo is a UK freight forwarder for businesses that need cargo services by sea, air, road or rail. We handle collection, freight booking, customs clearance, tracking and final delivery in one quote.</p>
<p>Use Carrgo when you are comparing cargo shippers, cargo freight forwarding, a cargo shipping company or a freight forwarder near you for UK imports and exports.</p>
""",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": ["Organization", "LocalBusiness"],
                "name": "Carrgo Freight Solutions",
                "legalName": "Carrgo Freight Solutions Ltd",
                "url": "https://www.carrgo.co.uk",
                "logo": "https://www.carrgo.co.uk/logo-192x192.png",
                "image": "https://www.carrgo.co.uk/og-image.png",
                "email": "support@carrgo.co.uk",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "support@carrgo.co.uk",
                    "contactType": "customer service",
                    "availableLanguage": "English"
                },
                "areaServed": ["GB", "IE", "Northern Ireland"],
                "serviceType": ["Freight Forwarding", "Sea Freight", "Air Freight", "Road Freight", "Rail Freight", "Customs Clearance", "Door-to-Door Logistics", "Amazon FBA Shipping", "UK Warehousing"],
                "memberOf": [],
                "sameAs": ["https://www.linkedin.com/company/carrgo-freight", "https://www.reddit.com/user/CarrgoFreight", "https://www.quora.com/profile/Carrgo-Freight", "https://medium.com/@carrgo-freight", "https://www.carrgo.co.uk"]
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {"@type": "Question", "name": "How much does sea freight from China to the UK cost?", "acceptedAnswer": {"@type": "Answer", "text": "LCL sea freight from China starts from GBP 300 per CBM. A 20ft FCL container costs GBP 1,200-2,800 and a 40ft FCL GBP 2,000-4,500 depending on origin port. Carrgo provides all-inclusive quotes within 2 hours."}},
                    {"@type": "Question", "name": "How long does sea freight from China to the UK take?", "acceptedAnswer": {"@type": "Answer", "text": "Sea freight from Shanghai or Shenzhen to Felixstowe takes 25-35 days. China-UK rail via the New Silk Road takes 14-20 days. Air freight takes 3-5 days door-to-door."}},
                    {"@type": "Question", "name": "Does Carrgo handle UK and Ireland customs clearance?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Carrgo handles UK and Ireland import customs declarations, duty calculations and port release at all major UK and Irish ports including Belfast and Dublin."}},
                    {"@type": "Question", "name": "Can Carrgo ship to Amazon FBA warehouses in the UK?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Carrgo supports FBA-compliant shipping, customs clearance, carton prep and final-mile delivery to Amazon fulfilment centres across the UK."}},
                    {"@type": "Question", "name": "Do I need an EORI number to import into the UK?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You need a UK EORI number starting with GB to import goods into Great Britain, and an XI EORI number for Northern Ireland. Carrgo can guide you through the registration process."}},
                    {"@type": "Question", "name": "What is the cheapest way to ship from China to the UK?", "acceptedAnswer": {"@type": "Answer", "text": "Sea freight (FCL or LCL) is the cheapest option for most China-to-UK shipments. A 20ft container costs GBP 1,200-2,800 and a 40ft container GBP 2,000-4,500. For smaller consignments under 15 CBM, LCL sharing starts from GBP 300 per CBM. Rail freight via the New Silk Road is faster than sea and cheaper than air."}},
                    {"@type": "Question", "name": "How quickly can I get a freight quote from Carrgo?", "acceptedAnswer": {"@type": "Answer", "text": "Carrgo provides all-inclusive freight quotes within 2 hours during UK business hours. Simply submit your origin, destination, cargo details and ready date through the online quote form or email support@carrgo.co.uk."}},
                    {"@type": "Question", "name": "Which freight forwarder is best for UK imports from China?", "acceptedAnswer": {"@type": "Answer", "text": "The best freight forwarder for UK imports from China offers clear all-inclusive pricing, proactive customs support, and reliable transit times. Carrgo specialises in China-to-UK sea, air and rail freight with customs clearance included, quotes in 2 hours, and tracking throughout."}},
                    {"@type": "Question", "name": "What documents do I need to import goods into the UK?", "acceptedAnswer": {"@type": "Answer", "text": "You need a commercial invoice, packing list, bill of lading or airway bill, and a UK EORI number starting with GB. Depending on the goods, you may also need certificates of origin, import licences or health certificates. Carrgo prepares all documentation for you."}},
                    {"@type": "Question", "name": "Does Carrgo offer door-to-door shipping from China to the UK?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Carrgo handles door-to-door freight from China to the UK, including supplier collection, freight booking, export customs, UK import customs clearance, duty and VAT calculation, and final delivery to your warehouse or Amazon FBA centre."}}
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Carrgo Freight Solutions",
                "url": "https://www.carrgo.co.uk",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.carrgo.co.uk/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            }
        ]
    },
    "/services/sea-freight": {
        "title": "Sea Freight UK | Container Shipping | Import & Export | Carrgo",
        "description": "Need affordable container shipping from China, Europe, or USA? Carrgo's sea freight UK service handles FCL, LCL, and bulk cargo with full customs clearance. Get your sea freight quote in 2 hours. Reliable, tracked, HMRC-compliant.",
        "keywords": "sea freight uk, fcl lcl shipping, container shipping uk, sea freight from china to uk, freight forwarder uk",
        "canonical": "https://www.carrgo.co.uk/services/sea-freight",
        "h1": "Sea Freight Services UK — FCL &amp; LCL Container Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Sea Freight Services UK — FCL &amp; LCL Container Shipping",
                "serviceType": "Sea Freight",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Need affordable container shipping from China, Europe, or USA? Carrgo's sea freight UK service handles FCL, LCL, and bulk cargo with full customs clearance. Get your sea freight quote in 2 hours. Reliable, tracked, HMRC-compliant.",
                "url": "https://www.carrgo.co.uk/services/sea-freight"
            }
        ]
    },
    "/services": {
        "title": "Cargo Services UK | Freight Forwarder Quote in 2 Hours | Carrgo",
        "description": "Cargo services for UK businesses: sea, air, road and rail freight with customs clearance, tracking and door-to-door delivery. Get a quote in 2 hours.",
        "keywords": "cargo services uk, shipping and cargo services, cargo transportation, cargo logistics, cargo freight forwarding, cargo forwarder, freight forwarding services uk, cargo shippers, cargo shipping company, freight forwarder near me, freight forwarding, logistics services, haulage company, transport company, shipping company, freight forwarder uk, cargo shipping services, uk freight services, international freight forwarding",
        "canonical": "https://www.carrgo.co.uk/services",
        "h1": "UK Cargo Services &amp; Freight Forwarding",
        "staticBody": """
<h2>Shipping and cargo services from one UK freight team</h2>
<p>Carrgo provides cargo services for sea freight, air freight, road freight, rail freight, customs clearance, Amazon FBA delivery and door-to-door logistics.</p>
<h2>Which cargo service should I use?</h2>
<p>Use sea freight for lower-cost pallets and containers, door-to-door air freight for urgent cargo, road freight for European loads, and customs-backed door-to-door shipping when you need one team to manage collection, paperwork and final delivery.</p>
<p>For UK businesses, that means one freight quote covering the movement, paperwork and final delivery instead of separate suppliers for shipping, customs and haulage.</p>
""",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Cargo Services UK",
                "serviceType": ["Cargo Services", "Freight Forwarding", "Sea Freight", "Air Freight", "Road Freight", "Rail Freight", "Customs Clearance", "Door-to-Door Delivery"],
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Cargo services for UK businesses including sea freight, air cargo, road freight, rail freight, customs clearance, warehousing and door-to-door delivery.",
                "url": "https://www.carrgo.co.uk/services"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What cargo services does Carrgo offer?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Carrgo offers sea freight, air freight, road freight, rail freight, customs clearance, door-to-door delivery, Amazon FBA freight and UK warehousing for commercial cargo."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can Carrgo handle customs and delivery as one service?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Carrgo can include supplier collection, freight booking, UK customs clearance, tracking and final delivery in one all-inclusive cargo quote."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How quickly can I get a cargo services quote?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Carrgo aims to send freight and cargo quotes within 2 business hours when the shipment details are complete."
                        }
                    }
                ]
            }
        ]
    },
    "/freight-forwarder-manchester": {
        "title": "Freight Forwarder Manchester | Cargo Quotes in 2 Hours | Carrgo",
        "description": "Freight forwarder for Manchester and North West businesses. Sea, air and road cargo with customs clearance, tracking and door-to-door delivery. Quote in 2 hours.",
        "keywords": "freight forwarder manchester, freight forwarder near me, manchester freight forwarder, cargo services manchester, shipping company manchester, customs clearance manchester, manchester air freight, north west freight forwarder",
        "canonical": "https://www.carrgo.co.uk/freight-forwarder-manchester",
        "h1": "Freight Forwarder Manchester",
        "staticBody": """
<h2>Freight forwarder near Manchester for commercial cargo</h2>
<p>Carrgo supports Manchester, Greater Manchester and North West businesses with sea freight, air freight, road freight, customs clearance, tracking and door-to-door delivery.</p>
<h2>What services are available?</h2>
<p>Manchester importers and exporters can use Carrgo for supplier collection, Manchester Airport air freight, sea freight through UK ports, European road freight, customs clearance and delivery to warehouses, shops, sites or fulfilment centres.</p>
<p>Use Carrgo when you want one freight forwarder to quote the full movement instead of managing separate carriers, customs brokers and delivery companies.</p>
""",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Freight Forwarder Manchester",
                "serviceType": ["Freight Forwarding", "Cargo Services", "Customs Clearance", "Air Freight", "Sea Freight", "Road Freight"],
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk",
                    "email": "support@carrgo.co.uk"
                },
                "areaServed": ["Manchester", "Greater Manchester", "North West England"],
                "description": "Freight forwarding and cargo services for Manchester and North West businesses, including sea freight, air freight, road freight, customs clearance and door-to-door delivery.",
                "url": "https://www.carrgo.co.uk/freight-forwarder-manchester"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Is Carrgo a freight forwarder near Manchester?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Carrgo supports importers and exporters across Manchester, Greater Manchester and the North West with sea freight, air freight, road freight, customs clearance and door-to-door delivery."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can Carrgo collect cargo from Manchester and the North West?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Carrgo can arrange collection from warehouses, suppliers, factories, shops and fulfilment centres across Manchester, Bolton, Salford, Trafford Park, Stockport and the wider North West."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How quickly can I get a Manchester freight quote?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Carrgo aims to send all-inclusive freight quotes within 2 business hours when shipment details are complete."
                        }
                    }
                ]
            }
        ]
    },
    "/cargo-shipping-company": {
        "title": "Cargo Shipping Company UK | Sea, Air & Road Cargo | Carrgo",
        "description": "UK cargo shipping company for importers and exporters. Sea freight, air cargo, road freight, customs clearance, tracking and door-to-door delivery. Quote in 2 hours.",
        "keywords": "cargo shipping company, cargo shippers, cargo services uk, cargo freight forwarding, shipping and cargo services, cargo forwarder, freight forwarding company uk, cargo shipping quote",
        "canonical": "https://www.carrgo.co.uk/cargo-shipping-company",
        "h1": "Cargo Shipping Company UK",
        "staticBody": """
<h2>Cargo shipping and freight forwarding from one UK team</h2>
<p>Carrgo arranges cargo shipping for UK importers and exporters by sea, air and road. One team handles carrier booking, supplier collection, customs clearance, tracking and final delivery.</p>
<h2>Cargo shippers vs freight forwarder</h2>
<p>Cargo shippers often move goods on one leg of the journey. A freight forwarder coordinates the full movement, including carrier booking, documents, customs clearance, tracking and final delivery.</p>
<p>Use Carrgo when you want one quote covering freight, paperwork and delivery instead of managing separate carriers, customs brokers and hauliers.</p>
""",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Cargo Shipping Company UK",
                "serviceType": ["Cargo Shipping", "Freight Forwarding", "Sea Freight", "Air Cargo", "Road Freight", "Customs Clearance"],
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk",
                    "email": "support@carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "UK cargo shipping company for sea freight, air cargo, road freight, customs clearance, tracking and door-to-door delivery.",
                "url": "https://www.carrgo.co.uk/cargo-shipping-company"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Is Carrgo a cargo shipping company?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Carrgo is a UK cargo shipping and freight forwarding company arranging sea freight, air cargo, road freight, customs clearance, tracking and final delivery for importers and exporters."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the difference between cargo shippers and a freight forwarder?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Cargo shippers often move goods on one leg of the journey. A freight forwarder coordinates the full movement, including carrier booking, documents, customs clearance, tracking and final delivery."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How quickly can I get a cargo shipping quote?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Carrgo aims to provide all-inclusive cargo shipping quotes within 2 business hours when shipment details are complete."
                        }
                    }
                ]
            }
        ]
    },
    "/routes": {
        "title": "International Freight Routes to the UK | Carrgo",
        "description": "Freight routes to the UK from China, Europe, USA, India, Turkey, UAE, Spain, Ireland and Northern Ireland. Compare sea, air, road and rail options and get a quote in 2 hours.",
        "keywords": "freight routes uk, shipping routes to uk, international freight routes, uk import routes, cargo routes uk",
        "canonical": "https://www.carrgo.co.uk/routes",
        "h1": "Freight Routes to the UK",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/air-freight": {
        "title": "Door-to-Door Air Freight UK | Air Cargo Quotes | Carrgo",
        "description": "Door-to-door air freight to the UK for urgent cargo. Express and economy air cargo with collection, customs clearance, tracking and final delivery. Quote in 2 hours.",
        "keywords": "door to door air freight, air freight uk, express cargo shipping, urgent air freight, air cargo quotes, time critical delivery",
        "canonical": "https://www.carrgo.co.uk/services/air-freight",
        "h1": "Door-to-Door Air Freight UK",
        "staticBody": """
<h2>Door-to-door air freight for urgent cargo</h2>
<p>Carrgo arranges air freight to the UK with collection, airline booking, customs clearance and delivery to your warehouse, office, site or fulfilment centre.</p>
<h2>What is included in door-to-door air freight?</h2>
<p>A door-to-door air freight quote can include supplier collection, airport handling, airway bill documentation, UK customs clearance, tracking and final delivery. It is best for urgent stock, samples, spare parts and high-value commercial cargo.</p>
<p>Choose door-to-door air freight when stock, samples, spare parts or high-value cargo need a faster option than sea or road freight.</p>
""",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Door-to-Door Air Freight UK",
                "serviceType": "Air Freight",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Door-to-door air freight to the UK for urgent cargo. Express and economy air cargo with collection, customs clearance, tracking and final delivery. Quote in 2 hours.",
                "url": "https://www.carrgo.co.uk/services/air-freight"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Do you offer door-to-door air freight?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Carrgo handles door-to-door air freight including supplier collection, airport handling, airway bill documentation, UK customs clearance, tracking and final delivery to your warehouse or fulfilment centre."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is included in door-to-door air freight?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A door-to-door air freight quote can include supplier collection, airport handling, airway bill documentation, UK customs clearance, tracking and final delivery."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How long does door-to-door air freight take?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Express door-to-door air freight usually takes 1-3 days, while economy air freight typically takes 3-5 days depending on origin, airline capacity, customs clearance and final delivery location."
                        }
                    }
                ]
            }
        ]
    },
    "/services/road-freight": {
        "title": "Road Freight Forwarder UK | European Haulage | Carrgo",
        "description": "Road freight forwarder for UK and European haulage. FTL and LTL transport from Germany, Netherlands, France, Spain, Ireland and Northern Ireland. Quote in 2 hours.",
        "keywords": "road freight forwarder, road freight uk, european haulage, pallet shipping, groupage freight, ftl ltl uk",
        "canonical": "https://www.carrgo.co.uk/services/road-freight",
        "h1": "Road Freight Forwarder for UK &amp; Europe",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Road Freight Forwarder for UK &amp; Europe",
                "serviceType": "Road Freight",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Road freight forwarder for UK and European haulage. FTL and LTL transport from Germany, Netherlands, France, Spain, Ireland and Northern Ireland. Quote in 2 hours.",
                "url": "https://www.carrgo.co.uk/services/road-freight"
            }
        ]
    },
    "/services/rail-freight-china-uk": {
        "title": "Rail Freight China to UK | New Silk Road Shipping | Carrgo",
        "description": "Need faster than sea, cheaper than air? Carrgo's rail freight China to UK service via the New Silk Road delivers in 14-20 days. Full customs clearance. Track your cargo. Get your quote.",
        "keywords": "rail freight china to uk, new silk road shipping, china rail freight, intermodal shipping",
        "canonical": "https://www.carrgo.co.uk/services/rail-freight-china-uk",
        "h1": "Rail Freight China to UK — New Silk Road Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Rail Freight China to UK — New Silk Road Shipping",
                "serviceType": "Rail Freight China Uk",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Need faster than sea, cheaper than air? Carrgo's rail freight China to UK service via the New Silk Road delivers in 14-20 days. Full customs clearance. Track your cargo. Get your quote.",
                "url": "https://www.carrgo.co.uk/services/rail-freight-china-uk"
            }
        ]
    },
    "/services/customs-clearance": {
        "title": "Customs Clearance UK | Import & Export Broker | HMRC Compliant | Carrgo",
        "description": "Brexit customs paperwork confusing you? Carrgo's customs clearance UK service handles all HMRC documentation, duty checks, and port release. 100% compliance. Don't let customs delay your shipment — get expert support now.",
        "keywords": "customs clearance uk, import broker, export broker, hmrc customs, uk customs agent",
        "canonical": "https://www.carrgo.co.uk/services/customs-clearance",
        "h1": "Customs Clearance UK — Import &amp; Export Broker Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Customs Clearance UK — Import &amp; Export Broker Services",
                "serviceType": "Customs Clearance",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Brexit customs paperwork confusing you? Carrgo's customs clearance UK service handles all HMRC documentation, duty checks, and port release. 100% compliance. Don't let customs delay your shipment — get expert support now.",
                "url": "https://www.carrgo.co.uk/services/customs-clearance"
            }
        ]
    },
    "/services/door-to-door": {
        "title": "Door-to-Door Freight & Cargo UK | Factory to Warehouse | Carrgo",
        "description": "Door-to-door cargo and freight for UK importers. Supplier collection, sea, air, road or rail freight, customs clearance and final delivery. Quote in 2 hours.",
        "keywords": "door to door freight, door to door cargo, door to door shipping uk, factory to warehouse shipping, complete logistics uk, cargo shippers uk",
        "canonical": "https://www.carrgo.co.uk/services/door-to-door",
        "h1": "Door-to-Door Freight — Factory to Warehouse Delivery",
        "staticBody": """
<h2>Door-to-door freight from collection to delivery</h2>
<p>Carrgo manages door-to-door cargo and freight for UK importers, from supplier collection through export, international freight, UK customs clearance and final delivery.</p>
<h2>What does door-to-door freight include?</h2>
<p>A door-to-door freight quote can include supplier pickup, export paperwork, sea, air, road or rail freight, UK customs clearance, shipment tracking and delivery to your warehouse, shop, site or fulfilment centre.</p>
<p>This is the right option when you want one freight forwarder to manage the whole shipment instead of coordinating a cargo shipper, customs broker and haulier separately.</p>
""",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Door-to-Door Freight — Factory to Warehouse Delivery",
                "serviceType": "Door To Door",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Door-to-door cargo and freight for UK importers. Supplier collection, sea, air, road or rail freight, customs clearance and final delivery. Quote in 2 hours.",
                "url": "https://www.carrgo.co.uk/services/door-to-door"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Do you offer door-to-door cargo services?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Carrgo offers door-to-door cargo services for UK importers, covering supplier collection, sea, air, road or rail freight, customs clearance, tracking and final delivery to your warehouse, shop, site or fulfilment centre."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is included in a door-to-door freight quote?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A door-to-door freight quote can include collection, export paperwork, international freight, UK customs clearance, duty and VAT guidance, cargo tracking and final delivery. Carrgo confirms exactly what is included before you book."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Which Incoterms work best with door-to-door freight?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "For true door-to-door service, DDP or DAP usually work best. With DDP, Carrgo can handle duties and VAT. With EXW, Carrgo can collect from your supplier's factory."
                        }
                    }
                ]
            }
        ]
    },
    "/guides/commodity-codes": {
        "title": "How to Find a Commodity Code for UK Imports | HS Code Guide | Carrgo",
        "description": "Find the right commodity code or HS code for UK imports. Learn how codes affect duty, VAT, licences and customs delays, with Carrgo support for freight quotes.",
        "keywords": "commodity code, HS code UK, trade tariff, import classification, customs commodity code, UK import duty code",
        "canonical": "https://www.carrgo.co.uk/guides/commodity-codes",
        "h1": "How to Find a Commodity Code for UK Imports",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "How to Find a Commodity Code for UK Imports",
                "description": "Find the right commodity code or HS code for UK imports and understand how it affects duty, VAT, licences and customs clearance.",
                "author": {"@type": "Organization", "name": "Carrgo Freight Solutions"},
                "publisher": {"@type": "Organization", "name": "Carrgo Freight Solutions", "url": "https://www.carrgo.co.uk"},
                "mainEntityOfPage": "https://www.carrgo.co.uk/guides/commodity-codes"
            }
        ]
    },
    "/services/amazon-fba-freight": {
        "title": "Amazon FBA Freight UK | FBA Prep & Delivery | Carrgo",
        "description": "Amazon FBA sellers — struggling with inbound logistics? Carrgo handles FBA prep, labelling, palletisation, and delivery to all UK fulfilment centres. BHX4, EMA1, LBA1. Get your FBA freight quote.",
        "keywords": "amazon fba freight uk, fba prep services, fba delivery, amazon fulfilment shipping",
        "canonical": "https://www.carrgo.co.uk/services/amazon-fba-freight",
        "h1": "Amazon FBA Freight UK — Prep &amp; Delivery to Fulfilment Centres",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Amazon FBA Freight UK — Prep &amp; Delivery to Fulfilment Centres",
                "serviceType": "Amazon Fba Freight",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Amazon FBA sellers — struggling with inbound logistics? Carrgo handles FBA prep, labelling, palletisation, and delivery to all UK fulfilment centres. BHX4, EMA1, LBA1. Get your FBA freight quote.",
                "url": "https://www.carrgo.co.uk/services/amazon-fba-freight"
            }
        ]
    },
    "/services/warehousing": {
        "title": "Warehousing UK | Midlands Storage | Pick & Pack | Carrgo",
        "description": "Need flexible UK storage with pick and pack? Carrgo's Midlands warehousing offers short and long-term storage, inventory management, and fulfilment services. Get your warehousing quote.",
        "keywords": "warehousing uk, midlands storage, pick and pack uk, fulfilment warehouse",
        "canonical": "https://www.carrgo.co.uk/services/warehousing",
        "h1": "Warehousing UK — Midlands Storage &amp; Pick &amp; Pack Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Warehousing UK — Midlands Storage &amp; Pick &amp; Pack Services",
                "serviceType": "Warehousing",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Need flexible UK storage with pick and pack? Carrgo's Midlands warehousing offers short and long-term storage, inventory management, and fulfilment services. Get your warehousing quote.",
                "url": "https://www.carrgo.co.uk/services/warehousing"
            }
        ]
    },
    "/services/container-shipping": {
        "title": "Container Shipping UK | FCL & LCL | 20ft & 40ft | Carrgo",
        "description": "Need container shipping for your imports? Carrgo handles 20ft, 40ft, and 40ft HC containers with FCL and LCL options. Full customs clearance. Get your container shipping quote in 2 hours.",
        "keywords": "container shipping uk, fcl lcl containers, 20ft container, 40ft container",
        "canonical": "https://www.carrgo.co.uk/services/container-shipping",
        "h1": "Container Shipping UK — FCL &amp; LCL Container Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Container Shipping UK — FCL &amp; LCL Container Services",
                "serviceType": "Container Shipping",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Need container shipping for your imports? Carrgo handles 20ft, 40ft, and 40ft HC containers with FCL and LCL options. Full customs clearance. Get your container shipping quote in 2 hours.",
                "url": "https://www.carrgo.co.uk/services/container-shipping"
            }
        ]
    },
    "/services/air-cargo": {
        "title": "Air Cargo UK | Express & Charter Freight | Carrgo",
        "description": "Time-sensitive cargo needs air freight. Carrgo's air cargo service handles express, charter, and standard air freight with customs clearance. Get your air cargo quote in 30 minutes.",
        "keywords": "air cargo uk, express air freight, charter freight, air cargo quotes",
        "canonical": "https://www.carrgo.co.uk/services/air-cargo",
        "h1": "Air Cargo UK — Express &amp; Charter Freight Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Air Cargo UK — Express &amp; Charter Freight Services",
                "serviceType": "Air Cargo",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Time-sensitive cargo needs air freight. Carrgo's air cargo service handles express, charter, and standard air freight with customs clearance. Get your air cargo quote in 30 minutes.",
                "url": "https://www.carrgo.co.uk/services/air-cargo"
            }
        ]
    },
    "/services/logistics": {
        "title": "Logistics UK | Supply Chain Solutions | Carrgo",
        "description": "Need end-to-end logistics management? Carrgo provides supply chain solutions, freight consolidation, and multi-modal transport. Reduce costs and improve delivery times. Get your logistics quote.",
        "keywords": "logistics uk, supply chain solutions, freight consolidation, multi modal transport",
        "canonical": "https://www.carrgo.co.uk/services/logistics",
        "h1": "Logistics UK — End-to-End Supply Chain Solutions",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Logistics UK — End-to-End Supply Chain Solutions",
                "serviceType": "Logistics",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Need end-to-end logistics management? Carrgo provides supply chain solutions, freight consolidation, and multi-modal transport. Reduce costs and improve delivery times. Get your logistics quote.",
                "url": "https://www.carrgo.co.uk/services/logistics"
            }
        ]
    },
    "/routes/china-to-uk": {
        "title": "Shipping from China to UK | Sea, Air & Rail Freight | Carrgo",
        "description": "Importing from China? Carrgo handles China to UK shipping with sea freight (25-35 days), air freight (3-7 days), and rail (14-22 days). Full customs clearance included. Avoid delays and hidden costs — get your China import quote today.",
        "keywords": "shipping from china to uk, china to uk freight, sea freight china to uk, import from china",
        "canonical": "https://www.carrgo.co.uk/routes/china-to-uk",
        "h1": "Shipping from China to UK — Sea, Air &amp; Rail Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Shipping from China to UK — Sea, Air &amp; Rail Freight",
                "serviceType": "China To Uk",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Importing from China? Carrgo handles China to UK shipping with sea freight (25-35 days), air freight (3-7 days), and rail (14-22 days). Full customs clearance included. Avoid delays and hidden costs — get your China import quote today.",
                "url": "https://www.carrgo.co.uk/routes/china-to-uk"
            }
        ]
    },
    "/routes/germany-to-uk": {
        "title": "Shipping from Germany to UK | Road & Sea Freight | Carrgo",
        "description": "Shipping from Germany to UK? Carrgo offers road freight (2-4 days) and sea freight (5-8 days) with full customs clearance. Get your Germany-UK freight quote in 2 hours.",
        "keywords": "shipping from germany to uk, germany to uk freight, road freight germany uk",
        "canonical": "https://www.carrgo.co.uk/routes/germany-to-uk",
        "h1": "Shipping from Germany to UK — Road &amp; Sea Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Shipping from Germany to UK — Road &amp; Sea Freight",
                "serviceType": "Germany To Uk",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Shipping from Germany to UK? Carrgo offers road freight (2-4 days) and sea freight (5-8 days) with full customs clearance. Get your Germany-UK freight quote in 2 hours.",
                "url": "https://www.carrgo.co.uk/routes/germany-to-uk"
            }
        ]
    },
    "/routes/netherlands-to-uk": {
        "title": "Shipping from Netherlands to UK | Road & Sea Freight | Carrgo",
        "description": "Shipping from Netherlands to UK? Carrgo offers road freight (1-3 days) and sea freight (3-5 days) with full customs clearance. Rotterdam to UK in 24 hours by road. Get your quote.",
        "keywords": "shipping from netherlands to uk, netherlands to uk freight, rotterdam to uk",
        "canonical": "https://www.carrgo.co.uk/routes/netherlands-to-uk",
        "h1": "Shipping from Netherlands to UK — Road &amp; Sea Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Shipping from Netherlands to UK — Road &amp; Sea Freight",
                "serviceType": "Netherlands To Uk",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Shipping from Netherlands to UK? Carrgo offers road freight (1-3 days) and sea freight (3-5 days) with full customs clearance. Rotterdam to UK in 24 hours by road. Get your quote.",
                "url": "https://www.carrgo.co.uk/routes/netherlands-to-uk"
            }
        ]
    },
    "/routes/india-to-uk": {
        "title": "Shipping from India to UK | Sea & Air Freight | Carrgo",
        "description": "Importing from India? Carrgo handles India to UK shipping with sea freight (20-28 days) and air freight (3-5 days). Mumbai, Chennai, Delhi to UK. Full customs clearance. Get your quote.",
        "keywords": "shipping from india to uk, india to uk freight, sea freight india to uk, import from india",
        "canonical": "https://www.carrgo.co.uk/routes/india-to-uk",
        "h1": "Shipping from India to UK — Sea &amp; Air Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Shipping from India to UK — Sea &amp; Air Freight",
                "serviceType": "India To Uk",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Importing from India? Carrgo handles India to UK shipping with sea freight (20-28 days) and air freight (3-5 days). Mumbai, Chennai, Delhi to UK. Full customs clearance. Get your quote.",
                "url": "https://www.carrgo.co.uk/routes/india-to-uk"
            }
        ]
    },
    "/routes/usa-to-uk": {
        "title": "USA to UK Freight Forwarder | Sea & Air Cargo Shipping | Carrgo",
        "description": "USA to UK freight forwarding for commercial cargo. Sea freight from New York, Savannah, Houston and LA, air freight in 1-3 days, customs and UK delivery included.",
        "keywords": "usa to uk freight forwarder, sea freight usa to uk, usa to uk shipping, shipping from usa to uk, cargo from usa to uk, air freight usa to uk, us freight forwarder uk, new york to felixstowe, los angeles to southampton, transatlantic freight",
        "canonical": "https://www.carrgo.co.uk/routes/usa-to-uk",
        "h1": "USA to UK Freight Forwarder for Sea &amp; Air Cargo",
        "staticBody": """
<h2>USA to UK freight forwarding with customs included</h2>
<p>For importers comparing USA to UK shipping options, the best route depends on coast, cargo size and urgency. East Coast sea freight is usually fastest by ocean, West Coast cargo normally takes longer via the Panama Canal, and air freight is the right option for urgent stock, samples and high-value goods.</p>
<p>Carrgo gives one quote covering freight, customs clearance and UK delivery, so you can compare sea freight USA to UK against air freight without chasing separate port, customs and haulage costs.</p>
<ul>
<li><strong>East Coast sea:</strong> 10-15 days to UK ports.</li>
<li><strong>West Coast sea:</strong> 25-30 days via Panama.</li>
<li><strong>Air freight:</strong> 1-3 days from major US airports.</li>
<li><strong>Included:</strong> US collection, UK customs and delivery.</li>
</ul>
""",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "USA to UK Freight Forwarding",
                "serviceType": "Usa To Uk",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Sea and air freight forwarding from the USA to the UK, including US collection, UK customs clearance and final delivery.",
                "url": "https://www.carrgo.co.uk/routes/usa-to-uk"
            }
        ]
    },
    "/routes/turkey-to-uk": {
        "title": "Turkey to UK Road Freight & Cargo Shipping | Istanbul to UK | Carrgo",
        "description": "Cargo from Turkey to UK by road, sea or air. Istanbul to UK collections, customs clearance, ATR support, delivery in 5-7 days by road and quotes in 2 hours.",
        "keywords": "turkey to uk freight, road freight from turkey to uk, best road freight from turkey to uk, cargo from turkey to uk, cargo from istanbul to uk, istanbul to uk shipping, shipping from turkey to uk, turkish freight forwarder, ambarli to felixstowe, turkey uk trade",
        "canonical": "https://www.carrgo.co.uk/routes/turkey-to-uk",
        "h1": "Turkey to UK Road Freight &amp; Cargo Shipping",
        "staticBody": """
<h2>Best road freight from Turkey to UK for commercial cargo</h2>
<p>For most palletised Turkish imports, road freight is the best balance of speed and cost. Carrgo arranges supplier collection, export paperwork, ATR movement certificate support, UK customs clearance and delivery to your warehouse or fulfilment centre.</p>
<h2>Air freight to Turkey and from Istanbul to the UK</h2>
<p>Carrgo handles air freight from Istanbul to the UK for urgent stock and samples, and can also arrange UK to Turkey air freight exports with collection, airline booking, export paperwork and delivery planning.</p>
<p>Use road freight for fast pallets, sea freight for larger container loads, and air freight when speed matters more than cost.</p>
""",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Turkey to UK Road Freight & Cargo Shipping",
                "serviceType": "Turkey To Uk",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Road, sea and air freight forwarding from Turkey to the UK, including Istanbul cargo collections, ATR documentation, customs clearance and final UK delivery.",
                "url": "https://www.carrgo.co.uk/routes/turkey-to-uk"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How long does shipping from Turkey to the UK take?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Sea freight from Turkey to the UK takes 14-20 days port-to-port, road freight takes 5-7 days door-to-door, and air freight from Istanbul to the UK takes 2-3 days."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the best road freight from Turkey to UK?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "For most palletised Turkish imports, road freight is the best balance of speed and cost. Carrgo arranges supplier collection, export paperwork, ATR support, UK customs clearance and final delivery."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can Carrgo arrange air freight to Turkey from the UK?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Carrgo can arrange UK to Turkey air freight for urgent exports, samples and commercial cargo, including UK collection, airline booking, export paperwork and delivery planning through Istanbul and other Turkish gateways."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How much does shipping from Turkey to UK cost?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Road freight from Turkey to the UK typically costs GBP 200-500 per pallet. Sea freight ranges from GBP 800-2,200 per container. Air freight is usually GBP 2.50-5 per kilogram."
                        }
                    }
                ]
            }
        ]
    },
    "/routes/uae-to-uk": {
        "title": "Shipping from UAE to UK | Dubai Freight | Sea & Air | Carrgo",
        "description": "Shipping from UAE to UK? Carrgo handles Dubai and Abu Dhabi freight with sea freight (18-24 days) and air freight (2-4 days). Full customs clearance. Get your UAE-UK freight quote.",
        "keywords": "shipping from uae to uk, dubai to uk freight, uae freight forwarding",
        "canonical": "https://www.carrgo.co.uk/routes/uae-to-uk",
        "h1": "Shipping from UAE to UK — Dubai Freight Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Shipping from UAE to UK — Dubai Freight Services",
                "serviceType": "Uae To Uk",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Shipping from UAE to UK? Carrgo handles Dubai and Abu Dhabi freight with sea freight (18-24 days) and air freight (2-4 days). Full customs clearance. Get your UAE-UK freight quote.",
                "url": "https://www.carrgo.co.uk/routes/uae-to-uk"
            }
        ]
    },
    "/routes/spain-to-uk": {
        "title": "Shipping from Spain to UK | Road & Sea Freight | Carrgo",
        "description": "Shipping from Spain to UK? Carrgo offers road freight (4-9 days) and sea freight (7-12 days) with full customs clearance. Barcelona, Madrid to UK. Get your Spain-UK freight quote.",
        "keywords": "shipping from spain to uk, spain to uk freight, road freight spain uk",
        "canonical": "https://www.carrgo.co.uk/routes/spain-to-uk",
        "h1": "Shipping from Spain to UK — Road &amp; Sea Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Shipping from Spain to UK — Road &amp; Sea Freight",
                "serviceType": "Spain To Uk",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Shipping from Spain to UK? Carrgo offers road freight (4-9 days) and sea freight (7-12 days) with full customs clearance. Barcelona, Madrid to UK. Get your Spain-UK freight quote.",
                "url": "https://www.carrgo.co.uk/routes/spain-to-uk"
            }
        ]
    },
    "/routes/belfast-northern-ireland": {
        "title": "Shipping to Belfast & Northern Ireland | Freight | Customs | Carrgo",
        "description": "Shipping to Northern Ireland? Carrgo handles Belfast, Larne, and Londonderry freight with full NI Protocol compliance. Sea, road, and air options. Windsor Framework documentation included.",
        "keywords": "shipping to northern ireland, belfast freight, ni protocol shipping, windsor framework",
        "canonical": "https://www.carrgo.co.uk/routes/belfast-northern-ireland",
        "h1": "Shipping to Belfast &amp; Northern Ireland — NI Protocol Compliant",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Shipping to Belfast &amp; Northern Ireland — NI Protocol Compliant",
                "serviceType": "Belfast Northern Ireland",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Shipping to Northern Ireland? Carrgo handles Belfast, Larne, and Londonderry freight with full NI Protocol compliance. Sea, road, and air options. Windsor Framework documentation included.",
                "url": "https://www.carrgo.co.uk/routes/belfast-northern-ireland"
            }
        ]
    },
    "/routes/dublin-ireland": {
        "title": "Shipping to Dublin & Ireland | Freight | Customs | Carrgo",
        "description": "Shipping to Ireland? Carrgo handles Dublin, Cork, Rosslare, and Shannon Foynes freight with full Irish customs clearance. Sea, road, and air options. Get your Ireland freight quote.",
        "keywords": "shipping to ireland, dublin freight, ireland customs clearance, cork shipping",
        "canonical": "https://www.carrgo.co.uk/routes/dublin-ireland",
        "h1": "Shipping to Dublin &amp; Ireland — Full Customs Clearance",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Shipping to Dublin &amp; Ireland — Full Customs Clearance",
                "serviceType": "Dublin Ireland",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                },
                "areaServed": "GB",
                "description": "Shipping to Ireland? Carrgo handles Dublin, Cork, Rosslare, and Shannon Foynes freight with full Irish customs clearance. Sea, road, and air options. Get your Ireland freight quote.",
                "url": "https://www.carrgo.co.uk/routes/dublin-ireland"
            }
        ]
    },
    "/resources/port-congestion-tracker": {
        "title": "Carrgo Port Intelligence | UK Port Congestion Tracker, Predictions & Health Scores",
        "description": "Live UK & Ireland port intelligence with Port Health Scores™, 24h/7d forecasts, congestion predictions, and importer risk assessments. Track Felixstowe, Southampton, Dublin, Belfast & all 18 major ports. Free, no subscription.",
        "keywords": "uk port intelligence, port congestion tracker, port health score, felixstowe delays, dublin port congestion, belfast port status, liverpool port status, uk container port delays, port predictions",
        "canonical": "https://www.carrgo.co.uk/resources/port-congestion-tracker",
        "h1": "Carrgo Port Intelligence — UK &amp; Ireland Port Congestion Tracker",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    ,
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Carrgo Port Intelligence",
                "applicationCategory": "FreightTool",
                "operatingSystem": "Any",
                "description": "Live UK & Ireland port intelligence with Port Health Scores, 24h/7d forecasts, congestion predictions, and importer risk assessments.",
                "url": "https://www.carrgo.co.uk/resources/port-congestion-tracker",
                "provider": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions",
                    "url": "https://www.carrgo.co.uk"
                }
            }
        ]
    },
    "/resources/shipping-guides": {
        "title": "Shipping Guides | UK Import & Export Documentation | Carrgo",
        "description": "Confused by shipping documentation? Carrgo's free shipping guides cover UK import/export paperwork, Incoterms, customs declarations, and compliance requirements. Download now.",
        "keywords": "shipping guides uk, import export documentation, shipping paperwork, freight documentation",
        "canonical": "https://www.carrgo.co.uk/resources/shipping-guides",
        "h1": "Shipping Guides — UK Import &amp; Export Documentation",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/resources/container-size-guide": {
        "title": "Container Size Guide | 20ft, 40ft, HC | FCL & LCL | Carrgo",
        "description": "Not sure what container size you need? Carrgo's container size guide explains 20ft, 40ft, and 40ft HC dimensions, capacities, and FCL vs LCL. Plan your shipment efficiently.",
        "keywords": "container size guide, 20ft container, 40ft container, fcl vs lcl, container dimensions",
        "canonical": "https://www.carrgo.co.uk/resources/container-size-guide",
        "h1": "Container Size Guide — 20ft, 40ft &amp; High Cube Containers",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/resources/incoterms-guide": {
        "title": "Incoterms Guide 2020 | EXW, FOB, CIF, DDP Explained | Carrgo",
        "description": "Confused by Incoterms? Carrgo's guide explains EXW, FOB, CIF, DDP, and all 2020 Incoterms with clear examples. Know exactly who pays for what in your international shipment.",
        "keywords": "incoterms guide, exw fob cif ddp, incoterms 2020 explained, shipping terms",
        "canonical": "https://www.carrgo.co.uk/resources/incoterms-guide",
        "h1": "Incoterms Guide 2020 — EXW, FOB, CIF, DDP Explained",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/resources/freight-faqs": {
        "title": "Freight FAQs | Common Shipping Questions Answered | Carrgo",
        "description": "Got questions about freight forwarding? Carrgo answers the most common questions about shipping costs, transit times, customs, documentation, and insurance. Get the answers you need.",
        "keywords": "freight faqs, shipping questions, common freight questions, freight forwarding faq",
        "canonical": "https://www.carrgo.co.uk/resources/freight-faqs",
        "h1": "Freight FAQs — Common Shipping Questions Answered",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/resources/case-studies": {
        "title": "Case Studies | UK Freight Success Stories | Carrgo",
        "description": "See how Carrgo helped UK businesses solve their shipping challenges. Real case studies of customs clearance, cost savings, and on-time delivery. Read our success stories.",
        "keywords": "freight case studies, shipping success stories, uk freight examples, carrgo clients",
        "canonical": "https://www.carrgo.co.uk/resources/case-studies",
        "h1": "Case Studies — UK Freight Success Stories",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/resources/industries": {
        "title": "Industries We Serve | Freight Solutions by Sector | Carrgo",
        "description": "Whatever your industry, Carrgo has freight solutions. We serve furniture, e-commerce, automotive, construction, electronics, and fashion sectors. Find your industry's shipping solution.",
        "keywords": "industries served freight, freight by sector, shipping solutions industry",
        "canonical": "https://www.carrgo.co.uk/resources/industries",
        "h1": "Industries We Serve — Freight Solutions by Sector",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/industries/ecommerce": {
        "title": "Ecommerce Freight UK | Amazon FBA Shipping | Online Retail | Carrgo",
        "description": "Ecommerce sellers — struggling with shipping to Amazon FBA or direct-to-consumer fulfilment? Carrgo handles ecommerce freight including FBA prep, labelling, and delivery to UK fulfilment centres. Fast quotes.",
        "keywords": "ecommerce freight uk, amazon fba shipping, online retail logistics, ecommerce delivery uk",
        "canonical": "https://www.carrgo.co.uk/industries/ecommerce",
        "h1": "Ecommerce Freight UK — Amazon FBA &amp; Online Retail Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/industries/manufacturing": {
        "title": "Manufacturing Freight UK | Raw Materials & Machinery Shipping | Carrgo",
        "description": "Manufacturers — need reliable shipping for raw materials, machinery, and components? Carrgo handles manufacturing freight with sea, air, and road options. Full customs clearance. Get your quote in 2 hours.",
        "keywords": "manufacturing freight uk, raw materials shipping, machinery freight, factory logistics",
        "canonical": "https://www.carrgo.co.uk/industries/manufacturing",
        "h1": "Manufacturing Freight UK — Raw Materials &amp; Machinery Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/industries/retail": {
        "title": "Retail Freight UK | Wholesale & Distribution Shipping | Carrgo",
        "description": "Retailers — struggling with stock replenishment and wholesale distribution? Carrgo handles retail freight with pallet shipping, container loads, and express delivery. Seasonal surges handled. Get your quote.",
        "keywords": "retail freight uk, wholesale shipping, distribution logistics, retail logistics",
        "canonical": "https://www.carrgo.co.uk/industries/retail",
        "h1": "Retail Freight UK — Wholesale &amp; Distribution Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/industries/automotive": {
        "title": "Automotive Freight UK | Car Parts & Vehicle Shipping | Carrgo",
        "description": "Automotive suppliers — need reliable parts shipping and vehicle logistics? Carrgo handles automotive freight including car parts, tyres, accessories, and vehicle components. Full customs clearance. Get your quote.",
        "keywords": "automotive freight uk, car parts shipping, vehicle logistics, automotive logistics",
        "canonical": "https://www.carrgo.co.uk/industries/automotive",
        "h1": "Automotive Freight UK — Car Parts &amp; Vehicle Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/industries/construction": {
        "title": "Construction Freight UK | Building Materials & Equipment | Carrgo",
        "description": "Construction companies — need heavy materials and equipment shipped to site? Carrgo handles construction freight including building materials, machinery, and tools. Flatbed and heavy haul available. Get your quote.",
        "keywords": "construction freight uk, building materials shipping, construction logistics, heavy haul",
        "canonical": "https://www.carrgo.co.uk/industries/construction",
        "h1": "Construction Freight UK — Building Materials &amp; Equipment Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/industries/electronics": {
        "title": "Electronics Freight UK | Tech & Gadget Shipping | Carrgo",
        "description": "Electronics importers — need safe shipping for fragile tech products? Carrgo handles electronics freight with anti-static packaging, shock protection, and climate-controlled options. Insurance included. Get your quote.",
        "keywords": "electronics freight uk, tech shipping, gadget logistics, electronics logistics",
        "canonical": "https://www.carrgo.co.uk/industries/electronics",
        "h1": "Electronics Freight UK — Tech &amp; Gadget Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/industries/medical": {
        "title": "Medical Freight UK | Pharma & Healthcare Shipping | Carrgo",
        "description": "Healthcare suppliers — need temperature-controlled shipping for medical and pharmaceutical products? Carrgo handles medical freight with cold chain, GDP compliance, and secure handling. Get your quote.",
        "keywords": "medical freight uk, pharmaceutical shipping, healthcare logistics, cold chain logistics",
        "canonical": "https://www.carrgo.co.uk/industries/medical",
        "h1": "Medical Freight UK — Pharmaceutical &amp; Healthcare Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/industries/furniture": {
        "title": "Furniture Freight UK | Flat-Pack & Upholstered Shipping | Carrgo",
        "description": "Furniture importers — worried about damage to flat-pack and upholstered goods? Carrgo handles furniture freight with custom crating, protective wrapping, and white-glove delivery. Get your quote.",
        "keywords": "furniture freight uk, flat pack shipping, upholstered furniture shipping, furniture logistics",
        "canonical": "https://www.carrgo.co.uk/industries/furniture",
        "h1": "Furniture Freight UK — Flat-Pack &amp; Upholstered Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/resources/our-process": {
        "title": "Our Process | How Carrgo Works | Step-by-Step | Carrgo",
        "description": "Wondering how freight forwarding works? Carrgo's 5-step process takes you from quote request to delivery. Transparent, tracked, and hassle-free. See how we work.",
        "keywords": "freight process, how freight forwarding works, shipping process steps, carrgo process",
        "canonical": "https://www.carrgo.co.uk/resources/our-process",
        "h1": "Our Process — How Carrgo Works Step-by-Step",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/resources/post-brexit-customs-guide": {
        "title": "Post-Brexit Customs Guide | UK Import Rules 2026 | Carrgo",
        "description": "Brexit changed UK customs rules. Carrgo's post-Brexit customs guide explains EORI numbers, customs declarations, rules of origin, and NI Protocol. Stay compliant. Download now.",
        "keywords": "post brexit customs guide, uk import rules 2026, eori number, customs declaration, ni protocol",
        "canonical": "https://www.carrgo.co.uk/resources/post-brexit-customs-guide",
        "h1": "Post-Brexit Customs Guide — UK Import Rules 2026",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/resources/testimonials": {
        "title": "Client Testimonials | Carrgo Freight Solutions Reviews",
        "description": "Read reviews from UK importers using Carrgo freight forwarding. 500+ businesses trust us with sea freight, customs clearance, and door-to-door logistics. 4.9/5 client satisfaction.",
        "keywords": "carrgo reviews, freight forwarder testimonials, shipping company reviews uk, carrgo feedback, importer testimonials",
        "canonical": "https://www.carrgo.co.uk/resources/testimonials",
        "h1": "What UK Importers Say About Carrgo",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/tools/cost-calculator": {
        "title": "Importer Cost Calculator | Port Delay Costs | Demurrage & Detention | Carrgo",
        "description": "Calculate the real cost of port delays — demurrage, detention, storage & lost sales. Free importer cost calculator for UK container ports. No subscription required.",
        "keywords": "importer cost calculator, demurrage calculator, port delay costs, detention costs, container storage costs",
        "canonical": "https://www.carrgo.co.uk/tools/cost-calculator",
        "h1": "Importer Cost Calculator — Port Delay Cost Estimator",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/tools/port-comparison": {
        "title": "Port Comparison Tool | UK & Ireland Port Health Scores | Carrgo",
        "description": "Compare health scores, wait times, forecasts and capacity across all 18 UK & Ireland ports. Free port comparison tool. No subscription required.",
        "keywords": "port comparison, uk port comparison, compare port health scores, port congestion comparison",
        "canonical": "https://www.carrgo.co.uk/tools/port-comparison",
        "h1": "Port Comparison Tool — UK &amp; Ireland Port Intelligence",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/felixstowe": {
        "title": "Felixstowe Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Felixstowe port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. UK's busiest container port — track congestion in real time.",
        "keywords": "felixstowe port intelligence, felixstowe port congestion, felixstowe delays, port health score felixstowe",
        "canonical": "https://www.carrgo.co.uk/ports/felixstowe",
        "h1": "Felixstowe Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/southampton": {
        "title": "Southampton Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Southampton port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Deep-water container port tracking.",
        "keywords": "southampton port intelligence, southampton port congestion, southampton delays, port health score southampton",
        "canonical": "https://www.carrgo.co.uk/ports/southampton",
        "h1": "Southampton Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/london-gateway": {
        "title": "London Gateway Port Intelligence | Health Score & Forecasts | Carrgo",
        "description": "Live London Gateway port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. DP World automated port tracking.",
        "keywords": "london gateway port intelligence, london gateway port congestion, london gateway delays",
        "canonical": "https://www.carrgo.co.uk/ports/london-gateway",
        "h1": "London Gateway Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/liverpool": {
        "title": "Liverpool Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Liverpool port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Mersey container port tracking.",
        "keywords": "liverpool port intelligence, liverpool port congestion, liverpool delays, port health score liverpool",
        "canonical": "https://www.carrgo.co.uk/ports/liverpool",
        "h1": "Liverpool Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/bristol": {
        "title": "Bristol Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Bristol port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Avonmouth port tracking.",
        "keywords": "bristol port intelligence, bristol port congestion, bristol delays, avonmouth port status",
        "canonical": "https://www.carrgo.co.uk/ports/bristol",
        "h1": "Bristol Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/tilbury": {
        "title": "Tilbury Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Tilbury port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Thames river port tracking.",
        "keywords": "tilbury port intelligence, tilbury port congestion, tilbury delays, thames port status",
        "canonical": "https://www.carrgo.co.uk/ports/tilbury",
        "h1": "Tilbury Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/immingham": {
        "title": "Immingham Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Immingham port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Humber estuary port tracking.",
        "keywords": "immingham port intelligence, immingham port congestion, humber port delays, port health score immingham",
        "canonical": "https://www.carrgo.co.uk/ports/immingham",
        "h1": "Immingham Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/grangemouth": {
        "title": "Grangemouth Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Grangemouth port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Scotland's largest container port tracking.",
        "keywords": "grangemouth port intelligence, grangemouth port congestion, scotland port delays, port health score grangemouth",
        "canonical": "https://www.carrgo.co.uk/ports/grangemouth",
        "h1": "Grangemouth Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/holyhead": {
        "title": "Holyhead Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Holyhead port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Irish Sea ferry & cargo port tracking.",
        "keywords": "holyhead port intelligence, holyhead port congestion, irish sea port delays, holyhead ferry status",
        "canonical": "https://www.carrgo.co.uk/ports/holyhead",
        "h1": "Holyhead Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/belfast": {
        "title": "Belfast Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Belfast port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Northern Ireland's largest port tracking.",
        "keywords": "belfast port intelligence, belfast port congestion, northern ireland port delays, port health score belfast",
        "canonical": "https://www.carrgo.co.uk/ports/belfast",
        "h1": "Belfast Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/larne": {
        "title": "Larne Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Larne port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Larne Harbour ferry port tracking.",
        "keywords": "larne port intelligence, larne port congestion, larne harbour status, northern ireland ferry delays",
        "canonical": "https://www.carrgo.co.uk/ports/larne",
        "h1": "Larne Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/londonderry": {
        "title": "Londonderry Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Londonderry port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Foyle Port, Derry tracking.",
        "keywords": "londonderry port intelligence, derry port congestion, foyle port status, northern ireland port delays",
        "canonical": "https://www.carrgo.co.uk/ports/londonderry",
        "h1": "Londonderry Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/dublin": {
        "title": "Dublin Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Dublin port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Ireland's largest port tracking.",
        "keywords": "dublin port intelligence, dublin port congestion, ireland port delays, port health score dublin",
        "canonical": "https://www.carrgo.co.uk/ports/dublin",
        "h1": "Dublin Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/cork": {
        "title": "Cork Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Cork port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Southern Ireland major port tracking.",
        "keywords": "cork port intelligence, cork port congestion, ireland port delays, ringaskiddy port status",
        "canonical": "https://www.carrgo.co.uk/ports/cork",
        "h1": "Cork Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/rosslare-europort": {
        "title": "Rosslare Europort Intelligence | Health Score & Forecasts | Carrgo",
        "description": "Live Rosslare Europort intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Wexford ferry & cargo port tracking.",
        "keywords": "rosslare europort intelligence, rosslare port congestion, ireland ferry delays, brexit bypass routes",
        "canonical": "https://www.carrgo.co.uk/ports/rosslare-europort",
        "h1": "Rosslare Europort Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/shannon-foynes": {
        "title": "Shannon Foynes Port Intelligence | Health Score & Forecasts | Carrgo",
        "description": "Live Shannon Foynes port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Limerick deepwater port tracking.",
        "keywords": "shannon foynes port intelligence, limerick port congestion, ireland port delays, foynes port status",
        "canonical": "https://www.carrgo.co.uk/ports/shannon-foynes",
        "h1": "Shannon Foynes Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/ports/waterford": {
        "title": "Waterford Port Intelligence | Health Score, Forecasts & Delays | Carrgo",
        "description": "Live Waterford port intelligence: health score, vessel queues, berth status, 24h/7d forecasts, and importer impact assessment. Southeast Ireland port tracking.",
        "keywords": "waterford port intelligence, waterford port congestion, ireland port delays, belview port status",
        "canonical": "https://www.carrgo.co.uk/ports/waterford",
        "h1": "Waterford Port Intelligence — Health Score &amp; Forecasts",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/about": {
        "title": "About Carrgo | UK Freight Forwarder | Carrgo",
        "description": "Learn about Carrgo Freight Solutions — a UK freight forwarder based in Bolton, Greater Manchester. 30+ years experience, BIFA & IATA accredited. Serving UK importers and exporters nationwide.",
        "keywords": "about carrgo, freight forwarder bolton, manchester logistics company, carrgo team",
        "canonical": "https://www.carrgo.co.uk/about",
        "h1": "About Carrgo — UK Freight Forwarder Based in Bolton",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/results": {
        "title": "Results & Testimonials | Carrgo Freight Success | Carrgo",
        "description": "See Carrgo's results — 500+ UK importers served, 99%+ customs clearance success, 2-hour quote response. Read testimonials from our clients. Trust Carrgo with your freight.",
        "keywords": "carrgo results, freight testimonials, client reviews carrgo, shipping success",
        "canonical": "https://www.carrgo.co.uk/results",
        "h1": "Results &amp; Testimonials — Carrgo Freight Success",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/contact": {
        "title": "Contact Carrgo | Freight Forwarding Support | Carrgo",
        "description": "Ready to ship? Get your all-inclusive freight quote in 2 hours. Carrgo handles UK import & export shipping, customs clearance, and door-to-door logistics. Call or email us today.",
        "keywords": "contact carrgo, freight quote uk, bolton freight contact, manchester shipping company",
        "canonical": "https://www.carrgo.co.uk/contact",
        "h1": "Contact Carrgo — Freight Forwarding Support",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/get-a-quote": {
        "title": "Get a Freight Quote UK | Import & Export Shipping | Carrgo",
        "description": "Ready to ship? Get your all-inclusive freight quote in 2 hours. Carrgo handles UK import & export shipping, customs clearance, and door-to-door logistics. No hidden fees. Start now.",
        "keywords": "freight quote uk, shipping quote, get a freight quote, import quote uk, export quote",
        "canonical": "https://www.carrgo.co.uk/get-a-quote",
        "h1": "Get a Freight Quote — UK Import &amp; Export Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/squarespace-import-duties-ddp-tariff-uk-sellers": {
        "title": "Squarespace Import Duties & DDP for UK Sellers | Carrgo",
        "description": "Squarespace doesn't clear UK customs for you. Learn how import duties, DDP/DDU choices and HS codes work for UK sellers — plus the practical workarounds.",
        "keywords": "squarespace import duties uk, squarespace ddp ddu, uk import duty squarespace, hs codes squarespace, uk customs ecommerce sellers",
        "canonical": "https://www.carrgo.co.uk/squarespace-import-duties-ddp-tariff-uk-sellers",
        "h1": "Squarespace Import Duties, DDP and Tariff Workarounds for UK Sellers",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Squarespace Import Duties, DDP and Tariff Workarounds for UK Sellers",
                "url": "https://www.carrgo.co.uk/squarespace-import-duties-ddp-tariff-uk-sellers",
                "description": "Squarespace handles your storefront — it doesn't clear UK customs for you. Guide to import duties, DDP/DDU choices and HS codes for UK Squarespace sellers.",
                "publisher": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions Ltd",
                    "url": "https://www.carrgo.co.uk"
                }
            }
        ]
    },
    "/shipstation-uk-customs-delay-check": {
        "title": "ShipStation UK Customs-Delay Check for Sellers | Carrgo",
        "description": "Shipping into the UK via ShipStation? One missing HS code can park your parcel at the border. Send Carrgo your export for a customs-delay risk check.",
        "keywords": "shipstation uk customs, shipstation customs delay, uk import hs code check, shipstation uk sellers, uk customs clearance check",
        "canonical": "https://www.carrgo.co.uk/shipstation-uk-customs-delay-check",
        "h1": "ShipStation sellers shipping to the UK: check customs-delay risk before you print the label",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "ShipStation sellers shipping to the UK: check customs-delay risk before you print the label",
                "url": "https://www.carrgo.co.uk/shipstation-uk-customs-delay-check",
                "description": "Shipping into the UK via ShipStation? Send Carrgo your ShipStation export and we check destination, HS codes, country of origin, declared values, weights and documents for UK customs-delay risk.",
                "publisher": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions Ltd",
                    "url": "https://www.carrgo.co.uk"
                }
            }
        ]
    },
    "/business-central-import-duty-landed-cost-readiness": {
        "title": "Import Duty & Landed Cost for Business Central | Carrgo",
        "description": "If purchase invoices live in Business Central but customs data doesn't, margins are guessing. Carrgo reviews the nine inputs behind your UK landed cost.",
        "keywords": "business central import duty, dynamics 365 landed cost, uk landed cost readiness, business central customs data, uk import duty review",
        "canonical": "https://www.carrgo.co.uk/business-central-import-duty-landed-cost-readiness",
        "h1": "Import Duty &amp; Landed Cost Readiness for Business Central Users",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Import Duty & Landed Cost Readiness for Business Central Users",
                "url": "https://www.carrgo.co.uk/business-central-import-duty-landed-cost-readiness",
                "description": "If your purchase invoices live in Dynamics 365 Business Central but your customs data doesn't, your margins are guessing. Carrgo reviews the nine inputs that decide your UK landed cost.",
                "publisher": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions Ltd",
                    "url": "https://www.carrgo.co.uk"
                }
            }
        ]
    },
    "/salesforce-freight-quote-readiness": {
        "title": "Freight Quote Readiness for Salesforce Teams | Carrgo",
        "description": "Half of freight enquiries can't be quoted on first touch. Carrgo scores each Salesforce enquiry on nine fields and hands reps a missing-data checklist.",
        "keywords": "salesforce freight quote, freight quote readiness, uk freight enquiries salesforce, customs risk check, freight forwarder uk",
        "canonical": "https://www.carrgo.co.uk/salesforce-freight-quote-readiness",
        "h1": "Freight Quote Readiness for Salesforce Teams",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Freight Quote Readiness for Salesforce Teams",
                "url": "https://www.carrgo.co.uk/salesforce-freight-quote-readiness",
                "description": "Half of freight enquiries can't be quoted on first touch. Carrgo's readiness review scores each enquiry on nine fields and hands your reps a missing-data checklist, a customs-risk flag and the next best action.",
                "publisher": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions Ltd",
                    "url": "https://www.carrgo.co.uk"
                }
            }
        ]
    },
    "/sap-business-one-import-duty-landed-cost-readiness": {
        "title": "Import Duty & Landed Cost for SAP Business One | Carrgo",
        "description": "SAP Business One runs your purchasing — but missing HS codes and Incoterms break landed cost. Carrgo reviews your import data readiness and flags gaps.",
        "keywords": "sap business one import duty, sap b1 landed cost, uk landed cost readiness, sap business one customs data, uk import duty review",
        "canonical": "https://www.carrgo.co.uk/sap-business-one-import-duty-landed-cost-readiness",
        "h1": "Import Duty &amp; Landed Cost Readiness for SAP Business One",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "structuredData": [
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Import Duty & Landed Cost Readiness for SAP Business One",
                "url": "https://www.carrgo.co.uk/sap-business-one-import-duty-landed-cost-readiness",
                "description": "SAP Business One runs your purchasing — but if HS codes, Incoterms and freight costs aren't captured cleanly, your landed cost is wrong. Carrgo reviews your import data readiness.",
                "publisher": {
                    "@type": "Organization",
                    "name": "Carrgo Freight Solutions Ltd",
                    "url": "https://www.carrgo.co.uk"
                }
            }
        ]
    },
    "/sitemap": {
        "title": "Sitemap | Carrgo Freight Solutions | All Pages",
        "description": "Full sitemap of Carrgo Freight Solutions website. Browse all services, routes, resources, and company pages. Find the freight forwarding information you need.",
        "keywords": "carrgo sitemap, freight forwarder pages, website map carrgo",
        "canonical": "https://www.carrgo.co.uk/sitemap",
        "h1": "Sitemap — Carrgo Freight Solutions",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/privacy": {
        "title": "Privacy Policy | Carrgo Freight Solutions | Data Protection",
        "description": "Carrgo Freight Solutions privacy policy. Learn how we collect, use, and protect your personal data. GDPR compliant. Your data is safe with us.",
        "keywords": "privacy policy carrgo, data protection, gdpr freight",
        "canonical": "https://www.carrgo.co.uk/privacy",
        "h1": "Privacy Policy — Carrgo Freight Solutions",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "noindex": True
    },
    "/terms": {
        "title": "Terms of Service | Carrgo Freight Solutions | Shipping Terms",
        "description": "Carrgo Freight Solutions terms of service. Read our shipping terms, conditions, and liability policies. Transparent freight forwarding terms.",
        "keywords": "terms of service carrgo, shipping terms, freight terms conditions",
        "canonical": "https://www.carrgo.co.uk/terms",
        "h1": "Terms of Service — Carrgo Freight Solutions",
        "ogImage": "https://www.carrgo.co.uk/og-image.png",
        "noindex": True
    }
}

STATIC_REDIRECTS = {
    "/port-intelligence": "/resources/port-congestion-tracker",
    "/port-comparison": "/tools/port-comparison",
    "/cost-calculator": "/tools/cost-calculator",
    "/freight-quote": "/get-a-quote",
    "/air-freight": "/services/air-freight",
    "/sea-freight": "/services/sea-freight",
    "/freight-forwarding": "/services",
    "/services/freight-forwarding": "/services",
    "/cargo-shippers": "/cargo-shipping-company",
    "/ports/bristolport.html": "/ports/bristol",
    "/ports/shenzhenport": "/routes/china-to-uk",
    "/routes/germanytolondon.html": "/routes/germany-to-uk",
    "/route-support/spainshippingtime.html": "/routes/spain-to-uk",
    "/ports/dublin-port": "/ports/dublin",
    "/ports/busan-port": "/routes/china-to-uk",
    "/route-support/turkey-shipping-cost.html": "/routes/turkey-to-uk",
    "/results.html": "/results",
    "/industries": "/resources/industries",
    "/industries/": "/resources/industries",
    "/assets/downloads/carrgo-uk-import-cost-tracker.xlsx/": "/tools/cost-calculator",
    "/routes/ireland-to-uk": "/routes/dublin-ireland",
    "/industries/startupimportlogistics.html": "/services/door-to-door",
    "/authors/adam-hayes": "/about",
    "/tools": "/tools/cost-calculator",
    "/tools/": "/tools/cost-calculator",
    "/leads/requestcallback": "/contact",
    "/problems/importdutyexplained.html": "/resources/post-brexit-customs-guide",
    "/resources/uk-import-customs-clearance-guide": "/resources/post-brexit-customs-guide",
    "/route-support/polandshippingtime.html": "/routes/germany-to-uk",
    "/services/expressfreight": "/services/air-freight",
    "/ports/hamburgport": "/routes/germany-to-uk",
    "/leads/palletquote": "/get-a-quote",
    "/route-support/uaeshippingtime.html": "/routes/uae-to-uk",
    "/services/seaandwarehousing.html": "/services/sea-freight",
    "/blog/china-uk-shipping-time-2026.html/": "/routes/china-to-uk",
    "/routes/northern-ireland-to-uk": "/routes/belfast-northern-ireland",
    "/ourprocess": "/resources/our-process",
    "/services/railandwarehousing.html": "/services/rail-freight-china-uk",
    "/leads/container-release": "/get-a-quote",
    "/ports/marseilleport": "/routes",
    "/route-support/polandshippingcost": "/routes/germany-to-uk",
    "/routes/polandtomanchester": "/routes/germany-to-uk",
    "/ports/dubaitolondon": "/routes/uae-to-uk",
    "/services/roadandcustoms": "/services/road-freight",
    "/services/doortodoor": "/services/door-to-door",
    "/leads/containerquote": "/get-a-quote",
    "/ports/bangkoktolondon": "/routes",
    "/ports/shanghaitofelixstowe": "/routes/china-to-uk",
    "/routes/chinatomanchester": "/routes/china-to-uk",
    "/ports/barcelonaport": "/routes/spain-to-uk",
    "/freightforwarderuk": "/services",
    "/keywords/cheapseafreight": "/services/sea-freight",
    "/guides/freightdocuments": "/resources/shipping-guides",
    "/trust/whyswitch": "/results",
    "/route-support/usacustomsclearance": "/routes/usa-to-uk",
    "/services/amazonfba": "/services/amazon-fba-freight",
    "/ports/jebelaliport": "/routes/uae-to-uk",
    "/routes/vietnamtomanchester": "/routes",
    "/route-support/netherlandsshippingcost": "/routes/netherlands-to-uk",
    "/ports/shenzhentolondon": "/routes/china-to-uk",
    "/ports/amsterdamport": "/routes/netherlands-to-uk",
    "/routes/netherlandstomanchester": "/routes/netherlands-to-uk",
    "/freightfaqs": "/resources/freight-faqs",
    "/services/seaandwarehousing": "/services/sea-freight",
    "/services/expressandcustoms": "/services/air-freight",
    "/routes/spaintolondon": "/routes/spain-to-uk",
    "/routes/chinatosouthampton": "/routes/china-to-uk",
    "/keywords/containershippingcost": "/services/sea-freight",
    "/ports/singaporeport": "/routes",
    "/ports/shanghaiport": "/routes/china-to-uk",
    "/ports/antwerpport": "/routes/netherlands-to-uk",
    "/services/seaandcustoms": "/services/sea-freight",
    "/ports/gdanskport": "/routes/germany-to-uk",
    "/leads/samedayquote": "/get-a-quote",
    "/route-support/turkeyshippingcost": "/routes/turkey-to-uk",
    "/routes/belgiumtomanchester": "/routes/netherlands-to-uk",
    "/industries/b2bbulkfreight": "/resources/industries",
    "/ports/veniceport": "/routes",
    "/routes/francetomanchester": "/routes",
    "/route-support/chinashippingtime": "/routes/china-to-uk",
    "/services/airandroad": "/services/road-freight",
    "/routes/polandtolondon": "/routes/germany-to-uk",
    "/routes/netherlandstolondon": "/routes/netherlands-to-uk",
    "/routes/uaetouk": "/routes/uae-to-uk",
    "/industries/automotivepartsshipping": "/resources/industries",
    "/industries/consumergoods": "/resources/industries",
    "/services/containerdevanning": "/services/warehousing",
    "/servicesoverview": "/services",
    "/ports/london-port": "/ports/london-gateway",
    "/ports/valenciaport": "/routes/spain-to-uk",
    "/routes/indiatouk": "/routes/india-to-uk",
    "/routes/belgiumtouk": "/routes/netherlands-to-uk",
    "/routes/turkeytolondon": "/routes/turkey-to-uk",
    "/route-support/usashippingcost": "/routes/usa-to-uk",
    "/route-support/belgiumshippingtime": "/routes/netherlands-to-uk",
    "/ports/southamptonport": "/ports/southampton",
    "/tasks": "/contact",
    "/routes/belgium-to-uk": "/routes/netherlands-to-uk",
    "/industries/packaging.html": "/resources/industries",
    "/ports/dublinport": "/ports/dublin",
    "/routes/chinatoliverpool.html": "/routes/china-to-uk",
    "/routes/chinatoliverpool": "/routes/china-to-uk",
    "/services/seaandhaulage": "/services/sea-freight",
    "/services/seafreight": "/services/sea-freight",
    "/ports/rotterdamtolondon": "/routes/netherlands-to-uk",
    "/keywords/fastairshipping": "/services/air-freight",
    "/services/airandwarehousing": "/services/air-freight",
    "/trust/freightsupport": "/results",
    "/ports/tilburyport.html": "/ports/tilbury",
    "/services/railfreight": "/services/rail-freight-china-uk",
    "/services/railandwarehousing": "/services/rail-freight-china-uk",
    "/ports/grimsbyport.html": "/ports/immingham",
    "/problems/lostcargo": "/contact",
    "/whyswitch": "/results",
    "/industries/textilesfabricshipping": "/resources/industries",
    "/ports/hongkongport": "/routes/china-to-uk",
    "/ports/istanbultolondon": "/routes/turkey-to-uk",
    "/routes/spaintomanchester": "/routes/spain-to-uk",
    "/routes/germanytobirmingham": "/routes/germany-to-uk",
    "/routes/chinatobirmingham": "/routes/china-to-uk",
    "/ports/imminghamport": "/ports/immingham",
    "/industries/fmcgdistribution": "/resources/industries",
    "/route-support/belgiumcustomsclearance": "/routes/netherlands-to-uk",
    "/services/roadandwarehousing": "/services/road-freight",
    "/ports/bangkokport": "/routes",
    "/guides/shippingcosts": "/tools/cost-calculator",
    "/route-support/germanyshippingcost": "/routes/germany-to-uk",
    "/route-support/chinashippingcost": "/routes/china-to-uk",
    "/routes/indiatolondon": "/routes/india-to-uk",
    "/keywords/expresscourieruk": "/services/air-freight",
    "/route-support/polandcustomsclearance": "/routes/germany-to-uk",
    "/route-support/indiashippingcost": "/routes/india-to-uk",
    "/industries/constructionmaterialsimport": "/resources/industries",
    "/route-support/spainshippingtime": "/routes/spain-to-uk",
    "/keywords/affordableroadfreight": "/services/road-freight",
    "/keywords/customsclearancecost": "/tools/cost-calculator",
    "/ports/hochiminhport": "/routes",
    "/routes/turkeytouk": "/routes/turkey-to-uk",
    "/casestudies": "/resources/case-studies",
    "/route-support/netherlandscustomsclearance": "/routes/netherlands-to-uk",
    "/services/railandcustoms": "/services/rail-freight-china-uk",
    "/ports/dubaitouk": "/routes/uae-to-uk",
    "/route-support/spaincustomsclearance": "/routes/spain-to-uk",
    "/leads/containerrelease": "/get-a-quote",
    "/problems/importdutyexplained": "/resources/post-brexit-customs-guide",
    "/industries/dropshippinglogistics": "/resources/industries",
    "/route-support/uaecustomsclearance": "/routes/uae-to-uk",
    "/industries/furnitureimportgermany": "/routes/germany-to-uk",
    "/routes/vietnamtouk": "/routes",
    "/routes/spaintouk": "/routes/spain-to-uk",
    "/portsoverview": "/resources/port-congestion-tracker",
}

def write_route_file(gh_pages_dir, route, html):
    """Write either /path/index.html or an exact .html file for GitHub Pages."""

    cleaned = route.lstrip("/")
    if route == "/":
        output = gh_pages_dir / "index.html"
    elif cleaned.endswith(".html"):
        output = gh_pages_dir / cleaned
        output.parent.mkdir(parents=True, exist_ok=True)
    else:
        output = gh_pages_dir / cleaned / "index.html"
        output.parent.mkdir(parents=True, exist_ok=True)

    output.write_text(html, encoding="utf-8")
    return output


def sync_app_asset_references(gh_pages_dir, base_html):
    """Refresh app shell asset references in preserved static HTML pages."""

    current_index_js = re.search(r'src="(/assets/index-[^"]+\.js)"', base_html)
    current_index_css = re.search(r'href="(/assets/index-[^"]+\.css)"', base_html)
    current_router_js = re.search(r'href="(/assets/vendor-router-[^"]+\.js)"', base_html)
    current_icons_js = re.search(r'href="(/assets/vendor-icons-[^"]+\.js)"', base_html)

    replacements = []
    if current_index_js:
        replacements.append((r'/assets/index-[A-Za-z0-9_-]+\.js', current_index_js.group(1)))
    if current_index_css:
        replacements.append((r'/assets/index-[A-Za-z0-9_-]+\.css', current_index_css.group(1)))
    if current_router_js:
        replacements.append((r'/assets/vendor-router-[A-Za-z0-9_-]+\.js', current_router_js.group(1)))
    if current_icons_js:
        replacements.append((r'/assets/vendor-icons-[A-Za-z0-9_-]+\.js', current_icons_js.group(1)))

    if not replacements:
        print("WARNING: could not detect current app asset references")
        return

    changed = 0
    for html_path in gh_pages_dir.rglob("*.html"):
        page = html_path.read_text(encoding="utf-8")
        updated = page
        for pattern, replacement in replacements:
            updated = re.sub(pattern, replacement, updated)
        if updated != page:
            html_path.write_text(updated, encoding="utf-8")
            changed += 1

    print(f"Updated app asset references in {changed} HTML files")


def published_path_to_url(html_path, gh_pages_dir):
    rel = html_path.relative_to(gh_pages_dir).as_posix()
    if rel == "index.html":
        return "https://www.carrgo.co.uk/"
    if rel.endswith("/index.html"):
        return f"https://www.carrgo.co.uk/{rel[:-11]}/"
    if rel.endswith(".html"):
        return f"https://www.carrgo.co.uk/{rel[:-5]}"
    return None


def update_sitemap_with_indexable_pages(gh_pages_dir):
    sitemap_path = gh_pages_dir / "sitemap.xml"
    if not sitemap_path.exists():
        return

    sitemap = sitemap_path.read_text(encoding="utf-8")
    sitemap = sitemap.replace("https://carrgo.co.uk/", "https://www.carrgo.co.uk/")
    existing_entries = {
        normalize_page_url(match.group(1)): match.group(0)
        for match in re.finditer(r"<url><loc>(https://www\.carrgo\.co\.uk[^<]+)</loc>.*?</url>", sitemap)
    }

    for html_path in gh_pages_dir.rglob("*.html"):
        if html_path.name == "404.html":
            continue

        html = html_path.read_text(encoding="utf-8")
        robots = re.search(r'<meta name="robots" content="([^"]*)"', html, re.IGNORECASE)
        if robots and "noindex" in robots.group(1).lower():
            continue
        if re.search(r'<meta http-equiv="refresh"|<h1>Redirecting</h1>', html, re.IGNORECASE):
            continue

        canonical = re.search(r'<link rel="canonical" href="([^"]+)"', html, re.IGNORECASE)
        loc = canonical.group(1) if canonical else published_path_to_url(html_path, gh_pages_dir)
        if not loc:
            continue

        loc = normalize_page_url(loc)
        if not loc.startswith("https://www.carrgo.co.uk/"):
            continue

        existing_entries.setdefault(
            loc,
            f"<url><loc>{loc}</loc><lastmod>{date.today().isoformat()}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>",
        )

    ordered = "\n  ".join(existing_entries[loc] for loc in sorted(existing_entries))
    sitemap_path.write_text(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  {ordered}\n</urlset>\n', encoding="utf-8")
    print(f"Updated sitemap with {len(existing_entries)} indexable URLs")


def build_redirect_html(source_route, target_route, target_meta):
    """Create a GitHub Pages-compatible redirect page for legacy URLs."""

    target_url = f"https://www.carrgo.co.uk{target_route}"
    title = f"Redirecting to {target_meta.get('h1', 'Carrgo Freight Solutions')}"
    description = target_meta.get("description", "Carrgo Freight Solutions")

    return f"""<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{description}" />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="{target_url}" />
  <meta http-equiv="refresh" content="0; url={target_url}" />
  <script>location.replace("{target_url}");</script>
</head>
<body>
  <main style="max-width:720px;margin:48px auto;padding:24px;font-family:system-ui,sans-serif;line-height:1.6">
    <h1>Redirecting</h1>
    <p>The page <code>{source_route}</code> has moved.</p>
    <p><a href="{target_url}">Continue to {target_url}</a></p>
  </main>
</body>
</html>
"""


def build_html(route, meta, base_html, is_404=False):
    """Build a static HTML page for a given route."""
    
    title = meta["title"]
    description = meta["description"]
    keywords = meta.get("keywords", "")
    canonical = normalize_page_url(meta["canonical"])
    h1 = meta.get("h1", title.split("|")[0].strip())
    static_body = meta.get("staticBody", "")
    og_image = meta.get("ogImage", "https://www.carrgo.co.uk/og-image.png")
    noindex = meta.get("noindex", False)
    structured_data = meta.get("structuredData", [])
    
    robots = "noindex, nofollow" if noindex else "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    
    # Build breadcrumb schema for all pages except homepage
    breadcrumb_sd = ""
    if route != "/":
        parts = route.strip("/").split("/")
        if len(parts) >= 1:
            item_list = []
            # Home
            item_list.append({
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.carrgo.co.uk/"
            })
            # Build cumulative path
            cumulative = ""
            for i, part in enumerate(parts, start=2):
                cumulative += "/" + part
                # Clean up name
                name = part.replace("-", " ").title()
                # Special name mappings
                if part == "sea-freight":
                    name = "Sea Freight"
                elif part == "air-freight":
                    name = "Air Freight"
                elif part == "road-freight":
                    name = "Road Freight"
                elif part == "rail-freight-china-uk":
                    name = "Rail Freight China to UK"
                elif part == "customs-clearance":
                    name = "Customs Clearance"
                elif part == "door-to-door":
                    name = "Door-to-Door"
                elif part == "amazon-fba-freight":
                    name = "Amazon FBA Freight"
                elif part == "container-shipping":
                    name = "Container Shipping"
                elif part == "air-cargo":
                    name = "Air Cargo"
                elif part == "china-to-uk":
                    name = "China to UK"
                elif part == "germany-to-uk":
                    name = "Germany to UK"
                elif part == "netherlands-to-uk":
                    name = "Netherlands to UK"
                elif part == "india-to-uk":
                    name = "India to UK"
                elif part == "usa-to-uk":
                    name = "USA to UK"
                elif part == "turkey-to-uk":
                    name = "Turkey to UK"
                elif part == "uae-to-uk":
                    name = "UAE to UK"
                elif part == "spain-to-uk":
                    name = "Spain to UK"
                elif part == "belfast-northern-ireland":
                    name = "Belfast & Northern Ireland"
                elif part == "dublin-ireland":
                    name = "Dublin & Ireland"
                elif part == "port-congestion-tracker":
                    name = "Port Congestion Tracker"
                elif part == "shipping-guides":
                    name = "Shipping Guides"
                elif part == "container-size-guide":
                    name = "Container Size Guide"
                elif part == "incoterms-guide":
                    name = "Incoterms Guide"
                elif part == "freight-faqs":
                    name = "Freight FAQs"
                elif part == "case-studies":
                    name = "Case Studies"
                elif part == "our-process":
                    name = "Our Process"
                elif part == "post-brexit-customs-guide":
                    name = "Post-Brexit Customs Guide"
                elif part == "testimonials":
                    name = "Testimonials"
                elif part == "cost-calculator":
                    name = "Cost Calculator"
                elif part == "port-comparison":
                    name = "Port Comparison"
                elif part == "ecommerce":
                    name = "Ecommerce"
                elif part == "manufacturing":
                    name = "Manufacturing"
                elif part == "retail":
                    name = "Retail"
                elif part == "automotive":
                    name = "Automotive"
                elif part == "construction":
                    name = "Construction"
                elif part == "electronics":
                    name = "Electronics"
                elif part == "medical":
                    name = "Medical"
                elif part == "furniture":
                    name = "Furniture"
                elif part == "felixstowe":
                    name = "Felixstowe Port"
                elif part == "southampton":
                    name = "Southampton Port"
                elif part == "london-gateway":
                    name = "London Gateway"
                elif part == "liverpool":
                    name = "Liverpool Port"
                elif part == "bristol":
                    name = "Bristol Port"
                elif part == "tilbury":
                    name = "Tilbury Port"
                elif part == "immingham":
                    name = "Immingham Port"
                elif part == "grangemouth":
                    name = "Grangemouth Port"
                elif part == "holyhead":
                    name = "Holyhead Port"
                elif part == "belfast":
                    name = "Belfast Port"
                elif part == "larne":
                    name = "Larne Port"
                elif part == "londonderry":
                    name = "Londonderry Port"
                elif part == "dublin":
                    name = "Dublin Port"
                elif part == "cork":
                    name = "Cork Port"
                elif part == "rosslare-europort":
                    name = "Rosslare Europort"
                elif part == "shannon-foynes":
                    name = "Shannon Foynes"
                elif part == "waterford":
                    name = "Waterford Port"
                
                item_list.append({
                    "@type": "ListItem",
                    "position": i,
                    "name": name,
                    "item": normalize_page_url(f"https://www.carrgo.co.uk{cumulative}")
                })
            
            breadcrumb_schema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": item_list
            }
            breadcrumb_sd = f'<script type="application/ld+json">{json.dumps(breadcrumb_schema, ensure_ascii=False)}</script>\n'
    
    # Build structured data scripts
    sd_scripts = ""
    for sd in structured_data:
        sd_scripts += f'<script type="application/ld+json">{json.dumps(sd, ensure_ascii=False)}</script>\n'
    sd_scripts += breadcrumb_sd
    
    # Build the <head> meta block
    meta_block = f"""<title>{title}</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="{description}" />
<meta name="keywords" content="{keywords}" />
<meta name="author" content="Carrgo Freight Solutions Ltd" />
<meta name="last-modified" content="2026-07-15" />
<meta name="date" content="2026-07-15" />
<meta name="robots" content="{robots}" />
<link rel="canonical" href="{canonical}" />
<link rel="alternate" hreflang="en-gb" href="{canonical}" />
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{canonical}" />
<meta property="og:image" content="{og_image}" />
<meta property="og:locale" content="en_GB" />
<meta property="og:site_name" content="Carrgo Freight Solutions" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{og_image}" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#1A6DFF" />
{sd_scripts}"""
    
    # Calculate relative asset path
    depth = route.count("/") - 1 if route != "/" else 0
    prefix = "../" * depth if depth > 0 else ""
    
    # Replace the entire <head> content from <title> to first <script type="module">
    pattern = re.compile(r'<title>.*?</title>.*?(?=<script type="module")', re.DOTALL)
    html = pattern.sub(meta_block + '\n', base_html, count=1)
    
    # Adjust relative paths for nested routes
    if depth > 0:
        html = html.replace('src="./assets/', f'src="{prefix}assets/')
        html = html.replace('href="./assets/', f'href="{prefix}assets/')
    
    # Add noscript static content for SEO
    noscript = f'''<noscript>
<div style="max-width:800px;margin:40px auto;padding:20px;font-family:system-ui,sans-serif;line-height:1.6">
<h1>{h1}</h1>
<p>{description}</p>
{static_body}
<p><strong>Carrgo Freight Solutions</strong> — UK freight forwarder handling sea freight, air cargo, road haulage, rail freight, and customs clearance for UK importers and exporters.</p>
<p><a href="https://www.carrgo.co.uk/get-a-quote">Get a free quote in 2 hours</a> | <a href="https://www.carrgo.co.uk/contact">Contact us</a></p>
<p><strong>Who we help:</strong> UK importers, exporters, procurement managers, logistics managers, manufacturers, ecommerce businesses, Amazon FBA sellers, wholesalers, retailers, and customs-clearance customers.</p>
<p><strong>Services:</strong> <a href="https://www.carrgo.co.uk/services/sea-freight">Sea Freight</a> | <a href="https://www.carrgo.co.uk/services/air-freight">Air Freight</a> | <a href="https://www.carrgo.co.uk/services/road-freight">Road Freight</a> | <a href="https://www.carrgo.co.uk/services/customs-clearance">Customs Clearance</a> | <a href="https://www.carrgo.co.uk/resources/port-congestion-tracker">Port Tracker</a></p>
</div>
</noscript>
'''
    
    html = html.replace('<div id="root"></div>', noscript + '<div id="root"></div>')
    
    return html


def main():
    """Generate all static files and push to gh-pages."""
    
    gh_pages_dir = Path(os.environ.get("CARRGO_GH_PAGES_DIR", r"C:\Users\44786\Documents\kimi\workspace\carrgo-gh-pages"))
    
    if not gh_pages_dir.exists():
        print(f"ERROR: {gh_pages_dir} not found.")
        return 1
    
    index_path = gh_pages_dir / "index.html"
    if not index_path.exists():
        print(f"ERROR: {index_path} not found.")
        return 1
    
    # Read the base HTML
    base_html = index_path.read_text(encoding="utf-8")

    # Make repeated generator runs idempotent when using an already-generated
    # GitHub Pages checkout as the base.
    base_html = re.sub(
        r'\s*<script>\s*\(function\(\)\{\s*var p = location\.pathname;.*?history\.replaceState\(null, \'\', \'/#\' \+ p\);.*?\}\)\(\);\s*</script>\s*',
        "\n",
        base_html,
        flags=re.DOTALL,
    )
    base_html = re.sub(
        r'\s*<noscript>\s*<div style="max-width:800px;margin:40px auto;padding:20px;font-family:system-ui,sans-serif;line-height:1\.6">.*?</div>\s*</noscript>\s*',
        "\n",
        base_html,
        flags=re.DOTALL,
    )

    canonical_index_script = """<script>
  if (window.location.pathname === '/index.html') {
    window.location.replace('/' + window.location.search + window.location.hash);
  }
</script>
"""
    if "window.location.pathname === '/index.html'" not in base_html:
        base_html = base_html.replace("<head>", "<head>\n" + canonical_index_script, 1)
    
    # Remove the www-stripping script
    base_html = base_html.replace(
        "<script>if(location.hostname.startsWith('www.')){location.href=location.href.replace('www.','')}</script>",
        ""
    )
    
    # Fix canonical URLs to use www
    base_html = base_html.replace('href="https://carrgo.co.uk/', 'href="https://www.carrgo.co.uk/')
    base_html = base_html.replace('content="https://carrgo.co.uk/', 'content="https://www.carrgo.co.uk/')
    base_html = base_html.replace('"url":"https://carrgo.co.uk', '"url":"https://www.carrgo.co.uk')
    
    generated = 0
    
    # Generate each route's static HTML
    for route, meta in ROUTES.items():
        html = build_html(route, meta, base_html)
        
        output = write_route_file(gh_pages_dir, route, html)
        output.write_text(html, encoding="utf-8")
        generated += 1
        print(f"Generated: {output}")

    # Generate GitHub Pages-compatible redirect files for legacy and shorthand URLs.
    # GitHub Pages does not support Netlify _redirects, so these prevent old URLs
    # from returning hard 404 responses while pointing crawlers to the canonical page.
    for source_route, target_route in STATIC_REDIRECTS.items():
        # Avoid overwriting real pages or Windows paths where a .html/.xlsx file and directory collide.
        if source_route.rstrip("/") == target_route.rstrip("/") or source_route.endswith(".html/") or source_route.endswith(".xlsx/"):
            continue

        target_meta = ROUTES.get(target_route)
        if not target_meta:
            print(f"WARNING: missing redirect target metadata for {source_route} -> {target_route}")
            continue

        redirect_html = build_redirect_html(source_route, target_route, target_meta)
        output = write_route_file(gh_pages_dir, source_route, redirect_html)
        generated += 1
        print(f"Generated redirect: {output} -> {target_route}")
    
    # Generate 404.html with a JavaScript redirect map for unmatched legacy paths.
    redirect_map_json = json.dumps(STATIC_REDIRECTS, indent=4)
    not_found_html = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Not Found | Carrgo</title>
  <meta name="robots" content="noindex, follow">
  <script>
    const redirects = {redirect_map_json};
    const path = window.location.pathname;
    const target = redirects[path] || redirects[path.replace(/\\/$/, '')] || redirects[path + '/'];
    if (target) window.location.replace(target + window.location.search + window.location.hash);
  </script>
</head>
<body>
  <main style="font-family: Arial, sans-serif; max-width: 680px; margin: 80px auto; padding: 0 20px; line-height: 1.5;">
    <h1>Page not found</h1>
    <p>The page you requested has moved. Use the links below to continue.</p>
    <p><a href="/get-a-quote">Get a quote</a> · <a href="/services">Services</a> · <a href="/contact">Contact Carrgo</a></p>
  </main>
</body>
</html>
'''

    (gh_pages_dir / "404.html").write_text(not_found_html, encoding="utf-8")
    print(f"Generated: {gh_pages_dir / '404.html'}")
    generated += 1
    
    # Update CNAME to www.carrgo.co.uk
    (gh_pages_dir / "CNAME").write_text("www.carrgo.co.uk\n", encoding="utf-8")
    print(f"Updated: {gh_pages_dir / 'CNAME'} -> www.carrgo.co.uk")
    
    update_sitemap_with_indexable_pages(gh_pages_dir)

    sync_app_asset_references(gh_pages_dir, base_html)

    # Fix crawl traps in preserved static pages that are not generated from the
    # React app. GitHub Pages cannot serve both a file and folder at the same
    # .xlsx path, so links must point to the actual file without a trailing slash.
    bad_download = "/assets/downloads/carrgo-uk-import-cost-tracker.xlsx/"
    good_download = "/assets/downloads/carrgo-uk-import-cost-tracker.xlsx"
    for html_path in gh_pages_dir.rglob("*.html"):
        page = html_path.read_text(encoding="utf-8")
        updated = page.replace(bad_download, good_download)
        if updated != page:
            html_path.write_text(updated, encoding="utf-8")
            print(f"Fixed download link: {html_path}")
    
    print(f"\n=== SUCCESS: Generated {generated} static HTML files ===")
    print(f"Every route now has proper SEO meta tags and static content.")
    print(f"Google can index all pages. Users can access any URL directly.")
    return 0


if __name__ == "__main__":
    exit(main())
