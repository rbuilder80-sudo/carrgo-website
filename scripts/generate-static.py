# Carrgo Static HTML Generator for GitHub Pages
# Fixes the broken 404.html and creates static HTML files for every route
# Each route gets: proper meta tags, H1, structured data, and React app hydration

import json, os, re, shutil
from pathlib import Path

# === Route metadata: pain-point-focused SEO for every page ===
ROUTES = {
    "/": {
        "title": "UK Freight Forwarder | Import & Export Shipping | Customs Clearance Bolton | Carrgo",
        "description": "Struggling with customs delays, lost shipments, or high freight costs? Carrgo handles UK import & export shipping, customs clearance, and door-to-door logistics. Get your all-inclusive quote in 2 hours — no hidden fees. Sea, air, road & rail freight.",
        "keywords": "freight forwarder uk, freight forwarding company uk, shipping company uk, logistics company, freight company, customs clearance agents uk, import shipping uk, export shipping uk, freight quote uk, bolton freight forwarder, manchester freight",
        "canonical": "https://www.carrgo.co.uk/",
        "h1": "UK Freight Forwarder &amp; Logistics Company You Can Trust",
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
                "email": "info@carrgo.co.uk",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "info@carrgo.co.uk",
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
                    {"@type": "Question", "name": "Do I need an EORI number to import into the UK?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You need a UK EORI number starting with GB to import goods into Great Britain, and an XI EORI number for Northern Ireland. Carrgo can guide you through the registration process."}}
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
    },
    "/services/air-freight": {
        "title": "Air Freight UK | Express Cargo Shipping | Urgent Delivery | Carrgo",
        "description": "Urgent shipment stuck? Carrgo's air freight UK service delivers time-critical cargo in 3-7 days worldwide. Express air freight with customs clearance included. Get your quote in 30 minutes. Same-day pickup available.",
        "keywords": "air freight uk, express cargo shipping, urgent air freight, air cargo quotes, time critical delivery",
        "canonical": "https://www.carrgo.co.uk/services/air-freight",
        "h1": "Air Freight UK — Express &amp; Economy Cargo Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/road-freight": {
        "title": "Road Freight UK to Europe | Pallet & Groupage Shipping | Carrgo",
        "description": "Shipping pallets to Germany, France, Netherlands, or Spain? Carrgo's road freight UK service handles groupage, full loads, and express European delivery. Door-to-door with tracking. Quote in 2 hours.",
        "keywords": "road freight uk, european haulage, pallet shipping, groupage freight, ftl ltl uk",
        "canonical": "https://www.carrgo.co.uk/services/road-freight",
        "h1": "Road Freight UK to Europe — FTL, LTL &amp; Pallet Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/rail-freight-china-uk": {
        "title": "Rail Freight China to UK | New Silk Road Shipping | Carrgo",
        "description": "Need faster than sea, cheaper than air? Carrgo's rail freight China to UK service via the New Silk Road delivers in 14-20 days. Full customs clearance. Track your cargo. Get your quote.",
        "keywords": "rail freight china to uk, new silk road shipping, china rail freight, intermodal shipping",
        "canonical": "https://www.carrgo.co.uk/services/rail-freight-china-uk",
        "h1": "Rail Freight China to UK — New Silk Road Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/customs-clearance": {
        "title": "Customs Clearance UK | Import & Export Broker | HMRC Compliant | Carrgo",
        "description": "Brexit customs paperwork confusing you? Carrgo's customs clearance UK service handles all HMRC documentation, duty checks, and port release. 100% compliance. Don't let customs delay your shipment — get expert support now.",
        "keywords": "customs clearance uk, import broker, export broker, hmrc customs, uk customs agent",
        "canonical": "https://www.carrgo.co.uk/services/customs-clearance",
        "h1": "Customs Clearance UK — Import &amp; Export Broker Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/door-to-door": {
        "title": "Door-to-Door Freight UK | Factory to Warehouse | Carrgo",
        "description": "Tired of coordinating multiple logistics providers? Carrgo's door-to-door freight service handles everything from factory pickup to warehouse delivery. One quote, one contact, zero hassle.",
        "keywords": "door to door freight, factory to warehouse shipping, complete logistics uk",
        "canonical": "https://www.carrgo.co.uk/services/door-to-door",
        "h1": "Door-to-Door Freight — Factory to Warehouse Delivery",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/amazon-fba-freight": {
        "title": "Amazon FBA Freight UK | FBA Prep & Delivery | Carrgo",
        "description": "Amazon FBA sellers — struggling with inbound logistics? Carrgo handles FBA prep, labelling, palletisation, and delivery to all UK fulfilment centres. BHX4, EMA1, LBA1. Get your FBA freight quote.",
        "keywords": "amazon fba freight uk, fba prep services, fba delivery, amazon fulfilment shipping",
        "canonical": "https://www.carrgo.co.uk/services/amazon-fba-freight",
        "h1": "Amazon FBA Freight UK — Prep &amp; Delivery to Fulfilment Centres",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/warehousing": {
        "title": "Warehousing UK | Midlands Storage | Pick & Pack | Carrgo",
        "description": "Need flexible UK storage with pick and pack? Carrgo's Midlands warehousing offers short and long-term storage, inventory management, and fulfilment services. Get your warehousing quote.",
        "keywords": "warehousing uk, midlands storage, pick and pack uk, fulfilment warehouse",
        "canonical": "https://www.carrgo.co.uk/services/warehousing",
        "h1": "Warehousing UK — Midlands Storage &amp; Pick &amp; Pack Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/container-shipping": {
        "title": "Container Shipping UK | FCL & LCL | 20ft & 40ft | Carrgo",
        "description": "Need container shipping for your imports? Carrgo handles 20ft, 40ft, and 40ft HC containers with FCL and LCL options. Full customs clearance. Get your container shipping quote in 2 hours.",
        "keywords": "container shipping uk, fcl lcl containers, 20ft container, 40ft container",
        "canonical": "https://www.carrgo.co.uk/services/container-shipping",
        "h1": "Container Shipping UK — FCL &amp; LCL Container Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/air-cargo": {
        "title": "Air Cargo UK | Express & Charter Freight | Carrgo",
        "description": "Time-sensitive cargo needs air freight. Carrgo's air cargo service handles express, charter, and standard air freight with customs clearance. Get your air cargo quote in 30 minutes.",
        "keywords": "air cargo uk, express air freight, charter freight, air cargo quotes",
        "canonical": "https://www.carrgo.co.uk/services/air-cargo",
        "h1": "Air Cargo UK — Express &amp; Charter Freight Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/services/logistics": {
        "title": "Logistics UK | Supply Chain Solutions | Carrgo",
        "description": "Need end-to-end logistics management? Carrgo provides supply chain solutions, freight consolidation, and multi-modal transport. Reduce costs and improve delivery times. Get your logistics quote.",
        "keywords": "logistics uk, supply chain solutions, freight consolidation, multi modal transport",
        "canonical": "https://www.carrgo.co.uk/services/logistics",
        "h1": "Logistics UK — End-to-End Supply Chain Solutions",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/china-to-uk": {
        "title": "Shipping from China to UK | Sea, Air & Rail Freight | Carrgo",
        "description": "Importing from China? Carrgo handles China to UK shipping with sea freight (25-35 days), air freight (3-7 days), and rail (14-22 days). Full customs clearance included. Avoid delays and hidden costs — get your China import quote today.",
        "keywords": "shipping from china to uk, china to uk freight, sea freight china to uk, import from china",
        "canonical": "https://www.carrgo.co.uk/routes/china-to-uk",
        "h1": "Shipping from China to UK — Sea, Air &amp; Rail Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/germany-to-uk": {
        "title": "Shipping from Germany to UK | Road & Sea Freight | Carrgo",
        "description": "Shipping from Germany to UK? Carrgo offers road freight (2-4 days) and sea freight (5-8 days) with full customs clearance. Get your Germany-UK freight quote in 2 hours.",
        "keywords": "shipping from germany to uk, germany to uk freight, road freight germany uk",
        "canonical": "https://www.carrgo.co.uk/routes/germany-to-uk",
        "h1": "Shipping from Germany to UK — Road &amp; Sea Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/netherlands-to-uk": {
        "title": "Shipping from Netherlands to UK | Road & Sea Freight | Carrgo",
        "description": "Shipping from Netherlands to UK? Carrgo offers road freight (1-3 days) and sea freight (3-5 days) with full customs clearance. Rotterdam to UK in 24 hours by road. Get your quote.",
        "keywords": "shipping from netherlands to uk, netherlands to uk freight, rotterdam to uk",
        "canonical": "https://www.carrgo.co.uk/routes/netherlands-to-uk",
        "h1": "Shipping from Netherlands to UK — Road &amp; Sea Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/india-to-uk": {
        "title": "Shipping from India to UK | Sea & Air Freight | Carrgo",
        "description": "Importing from India? Carrgo handles India to UK shipping with sea freight (20-28 days) and air freight (3-5 days). Mumbai, Chennai, Delhi to UK. Full customs clearance. Get your quote.",
        "keywords": "shipping from india to uk, india to uk freight, sea freight india to uk, import from india",
        "canonical": "https://www.carrgo.co.uk/routes/india-to-uk",
        "h1": "Shipping from India to UK — Sea &amp; Air Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/usa-to-uk": {
        "title": "Shipping from USA to UK | Freight Forwarder | Sea & Air | Carrgo",
        "description": "Importing from USA? Carrgo handles USA to UK shipping with sea freight (14-21 days) and air freight (3-7 days). Full customs clearance, FDA checks, and HMRC compliance. Get your transatlantic freight quote.",
        "keywords": "shipping from usa to uk, usa to uk freight, transatlantic shipping, import from usa",
        "canonical": "https://www.carrgo.co.uk/routes/usa-to-uk",
        "h1": "Shipping from USA to UK — Sea &amp; Air Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/turkey-to-uk": {
        "title": "Shipping from Turkey to UK | Freight Forwarder | Customs | Carrgo",
        "description": "Turkish suppliers unreliable on delivery? Carrgo's Turkey to UK shipping service handles sea, air, and road freight with full Turkish and UK customs clearance. Track your cargo. Quote in 2 hours.",
        "keywords": "shipping from turkey to uk, turkey to uk freight, turkish customs clearance",
        "canonical": "https://www.carrgo.co.uk/routes/turkey-to-uk",
        "h1": "Shipping from Turkey to UK — Sea, Air &amp; Road Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/uae-to-uk": {
        "title": "Shipping from UAE to UK | Dubai Freight | Sea & Air | Carrgo",
        "description": "Shipping from UAE to UK? Carrgo handles Dubai and Abu Dhabi freight with sea freight (18-24 days) and air freight (2-4 days). Full customs clearance. Get your UAE-UK freight quote.",
        "keywords": "shipping from uae to uk, dubai to uk freight, uae freight forwarding",
        "canonical": "https://www.carrgo.co.uk/routes/uae-to-uk",
        "h1": "Shipping from UAE to UK — Dubai Freight Services",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/spain-to-uk": {
        "title": "Shipping from Spain to UK | Road & Sea Freight | Carrgo",
        "description": "Shipping from Spain to UK? Carrgo offers road freight (4-9 days) and sea freight (7-12 days) with full customs clearance. Barcelona, Madrid to UK. Get your Spain-UK freight quote.",
        "keywords": "shipping from spain to uk, spain to uk freight, road freight spain uk",
        "canonical": "https://www.carrgo.co.uk/routes/spain-to-uk",
        "h1": "Shipping from Spain to UK — Road &amp; Sea Freight",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/belfast-northern-ireland": {
        "title": "Shipping to Belfast & Northern Ireland | Freight | Customs | Carrgo",
        "description": "Shipping to Northern Ireland? Carrgo handles Belfast, Larne, and Londonderry freight with full NI Protocol compliance. Sea, road, and air options. Windsor Framework documentation included.",
        "keywords": "shipping to northern ireland, belfast freight, ni protocol shipping, windsor framework",
        "canonical": "https://www.carrgo.co.uk/routes/belfast-northern-ireland",
        "h1": "Shipping to Belfast &amp; Northern Ireland — NI Protocol Compliant",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/routes/dublin-ireland": {
        "title": "Shipping to Dublin & Ireland | Freight | Customs | Carrgo",
        "description": "Shipping to Ireland? Carrgo handles Dublin, Cork, Rosslare, and Shannon Foynes freight with full Irish customs clearance. Sea, road, and air options. Get your Ireland freight quote.",
        "keywords": "shipping to ireland, dublin freight, ireland customs clearance, cork shipping",
        "canonical": "https://www.carrgo.co.uk/routes/dublin-ireland",
        "h1": "Shipping to Dublin &amp; Ireland — Full Customs Clearance",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/resources/port-congestion-tracker": {
        "title": "Carrgo Port Intelligence | UK Port Congestion Tracker, Predictions & Health Scores",
        "description": "Live UK & Ireland port intelligence with Port Health Scores™, 24h/7d forecasts, congestion predictions, and importer risk assessments. Track Felixstowe, Southampton, Dublin, Belfast & all 18 major ports. Free, no subscription.",
        "keywords": "uk port intelligence, port congestion tracker, port health score, felixstowe delays, dublin port congestion, belfast port status, liverpool port status, uk container port delays, port predictions",
        "canonical": "https://www.carrgo.co.uk/resources/port-congestion-tracker",
        "h1": "Carrgo Port Intelligence — UK &amp; Ireland Port Congestion Tracker",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
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
        "title": "About Carrgo | UK Freight Forwarder | Bolton, Manchester | Carrgo",
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
        "title": "Contact Carrgo | Freight Forwarding Support | Bolton, Manchester | Carrgo",
        "description": "Ready to ship? Get your all-inclusive freight quote in 2 hours. Carrgo handles UK import & export shipping, customs clearance, and door-to-door logistics. Call or email us today.",
        "keywords": "contact carrgo, freight quote uk, bolton freight contact, manchester shipping company",
        "canonical": "https://www.carrgo.co.uk/contact",
        "h1": "Contact Carrgo — Freight Forwarding Support",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
    },
    "/get-a-quote": {
        "title": "Get a Freight Quote UK | Import & Export Shipping | Carrgo Bolton",
        "description": "Ready to ship? Get your all-inclusive freight quote in 2 hours. Carrgo handles UK import & export shipping, customs clearance, and door-to-door logistics. No hidden fees. Start now.",
        "keywords": "freight quote uk, shipping quote, get a freight quote, import quote uk, export quote",
        "canonical": "https://www.carrgo.co.uk/get-a-quote",
        "h1": "Get a Freight Quote — UK Import &amp; Export Shipping",
        "ogImage": "https://www.carrgo.co.uk/og-image.png"
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


def build_html(route, meta, base_html, is_404=False):
    """Build a static HTML page for a given route."""
    
    title = meta["title"]
    description = meta["description"]
    keywords = meta.get("keywords", "")
    canonical = meta["canonical"]
    h1 = meta.get("h1", title.split("|")[0].strip())
    og_image = meta.get("ogImage", "https://www.carrgo.co.uk/og-image.png")
    noindex = meta.get("noindex", False)
    structured_data = meta.get("structuredData", [])
    
    robots = "noindex, nofollow" if noindex else "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    
    # Build structured data scripts
    sd_scripts = ""
    for sd in structured_data:
        sd_scripts += f'<script type="application/ld+json">{json.dumps(sd, ensure_ascii=False)}</script>\n'
    
    # Build the <head> meta block
    meta_block = f"""<title>{title}</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="{description}" />
<meta name="keywords" content="{keywords}" />
<meta name="author" content="Carrgo Freight Solutions Ltd" />
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
    
    # Add the hash-router redirect script BEFORE the first script tag
    # This silently converts /path to /#/path for HashRouter compatibility
    redirect_script = '''<script>
(function(){
  var p = location.pathname;
  if (!location.hash && p !== '/' && p !== '/index.html') {
    history.replaceState(null, '', '/#' + p);
  }
})();
</script>
'''
    
    # Insert redirect script before the first <script type="module">
    html = html.replace('<script type="module"', redirect_script + '<script type="module"', 1)
    
    # Add noscript static content for SEO
    noscript = f'''<noscript>
<div style="max-width:800px;margin:40px auto;padding:20px;font-family:system-ui,sans-serif;line-height:1.6">
<h1>{h1}</h1>
<p>{description}</p>
<p><strong>Carrgo Freight Solutions</strong> — UK freight forwarder handling sea freight, air cargo, road haulage, rail freight, and customs clearance for UK importers and exporters.</p>
<p><a href="https://www.carrgo.co.uk/get-a-quote">Get a free quote in 2 hours</a> | <a href="https://www.carrgo.co.uk/contact">Contact us</a></p>
</div>
</noscript>
'''
    
    html = html.replace('<div id="root"></div>', noscript + '<div id="root"></div>')
    
    return html


def main():
    """Generate all static files and push to gh-pages."""
    
    gh_pages_dir = Path(r"C:\Users\44786\Documents\kimi\workspace\carrgo-gh-pages")
    
    if not gh_pages_dir.exists():
        print(f"ERROR: {gh_pages_dir} not found.")
        return 1
    
    index_path = gh_pages_dir / "index.html"
    if not index_path.exists():
        print(f"ERROR: {index_path} not found.")
        return 1
    
    # Read the base HTML
    base_html = index_path.read_text(encoding="utf-8")
    
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
        
        if route == "/":
            output = gh_pages_dir / "index.html"
        else:
            route_dir = gh_pages_dir / route.lstrip("/")
            route_dir.mkdir(parents=True, exist_ok=True)
            output = route_dir / "index.html"
        
        output.write_text(html, encoding="utf-8")
        generated += 1
        print(f"Generated: {output}")
    
    # Generate 404.html (copy of index.html with redirect for any unmatched path)
    not_found_html = base_html.replace(
        '<title>Freight Forwarder UK | Shipping &amp; Logistics Company | Carrgo</title>',
        '<title>Page Not Found | Carrgo Freight Solutions</title>'
    )
    not_found_html = not_found_html.replace(
        '<meta name="description" content="Trusted UK freight forwarder &amp; logistics company. Sea, air, road &amp; rail freight + customs clearance. All-inclusive shipping quotes in 2 hours. BIFA &amp; IATA accredited." />',
        '<meta name="description" content="Page not found. Carrgo Freight Solutions — UK freight forwarder for sea, air, road &amp; rail freight + customs clearance." />'
    )
    not_found_html = not_found_html.replace(
        '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
        '<meta name="robots" content="noindex, follow" />'
    )
    
    (gh_pages_dir / "404.html").write_text(not_found_html, encoding="utf-8")
    print(f"Generated: {gh_pages_dir / '404.html'}")
    generated += 1
    
    # Update CNAME to www.carrgo.co.uk
    (gh_pages_dir / "CNAME").write_text("www.carrgo.co.uk\n", encoding="utf-8")
    print(f"Updated: {gh_pages_dir / 'CNAME'} -> www.carrgo.co.uk")
    
    # Update sitemap.xml to use www
    sitemap_path = gh_pages_dir / "sitemap.xml"
    if sitemap_path.exists():
        sitemap = sitemap_path.read_text(encoding="utf-8")
        sitemap = sitemap.replace('https://carrgo.co.uk/', 'https://www.carrgo.co.uk/')
        sitemap_path.write_text(sitemap, encoding="utf-8")
        print(f"Updated: {sitemap_path}")
    
    print(f"\n=== SUCCESS: Generated {generated} static HTML files ===")
    print(f"Every route now has proper SEO meta tags and static content.")
    print(f"Google can index all pages. Users can access any URL directly.")
    return 0


if __name__ == "__main__":
    exit(main())
