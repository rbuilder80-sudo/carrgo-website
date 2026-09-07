"""Inject the compact quote form into generated static pages."""
from pathlib import Path
import html
import re
import sys

ROUTES = {
    "/routes/china-to-uk": ("Get a China-UK shipping quote", "China", "United Kingdom"),
    "/routes/germany-to-uk": ("Get a Germany-UK shipping quote", "Germany", "United Kingdom"),
    "/routes/netherlands-to-uk": ("Get a Netherlands-UK shipping quote", "Netherlands", "United Kingdom"),
    "/routes/india-to-uk": ("Get an India-UK shipping quote", "India", "United Kingdom"),
    "/routes/usa-to-uk": ("Get a USA-UK shipping quote", "United States", "United Kingdom"),
    "/routes/turkey-to-uk": ("Get a Turkey-UK shipping quote", "Turkey", "United Kingdom"),
    "/routes/uae-to-uk": ("Get a UAE-UK shipping quote", "United Arab Emirates", "United Kingdom"),
    "/routes/spain-to-uk": ("Get a Spain-UK shipping quote", "Spain", "United Kingdom"),
    "/routes/dublin-ireland": ("Get a Dublin-UK shipping quote", "Dublin, Ireland", "United Kingdom"),
    "/routes/belfast-northern-ireland": ("Get a Belfast-UK shipping quote", "Belfast, Northern Ireland", "Great Britain"),
}

SERVICES = {
    "/services/sea-freight": "Get a sea freight quote",
    "/services/air-freight": "Get an air freight quote",
    "/services/road-freight": "Get a road freight quote",
    "/services/rail-freight-china-uk": "Get a rail freight quote",
    "/services/customs-clearance": "Ask about customs clearance",
    "/services/door-to-door": "Get a door-to-door freight quote",
    "/services/amazon-fba-freight": "Get an Amazon FBA freight quote",
    "/services/warehousing": "Ask about warehousing and delivery",
    "/services/container-shipping": "Get a container shipping quote",
    "/services/logistics": "Get a logistics quote",
}

INDUSTRIES = {
    "/industries/ecommerce": "Get an ecommerce shipping quote",
    "/industries/manufacturing": "Get a manufacturing freight quote",
    "/industries/retail": "Get a retail freight quote",
    "/industries/automotive": "Get an automotive freight quote",
    "/industries/construction": "Get a construction freight quote",
    "/industries/electronics": "Get an electronics freight quote",
    "/industries/medical": "Get a medical freight quote",
    "/industries/furniture": "Get a furniture shipping quote",
}

PORTS = {
    "felixstowe": "Felixstowe",
    "southampton": "Southampton",
    "london-gateway": "London Gateway",
    "liverpool": "Liverpool",
    "bristol": "Bristol",
    "tilbury": "Tilbury",
    "immingham": "Immingham",
    "grangemouth": "Grangemouth",
    "holyhead": "Holyhead",
    "belfast": "Belfast",
    "larne": "Larne",
    "londonderry": "Londonderry",
    "dublin": "Dublin",
    "cork": "Cork",
    "rosslare-europort": "Rosslare Europort",
    "shannon-foynes": "Shannon Foynes",
    "waterford": "Waterford",
}


def route_for_file(root: Path, file: Path) -> str:
    rel = file.relative_to(root)
    if rel.name != "index.html":
        return ""
    parent = rel.parent.as_posix()
    return "/" if parent == "." else "/" + parent


def context(route: str):
    if route in ROUTES:
        return ROUTES[route]
    match = re.match(r"^/ports/([^/]+)$", route)
    if match and match.group(1) in PORTS:
        port = PORTS[match.group(1)]
        return f"Ask about your shipment through {port}", "", f"{port} / UK delivery"
    if route.startswith("/resources/port-congestion-tracker") or route.startswith("/resources/uk-port-congestion-report"):
        return "Ask about your shipment through this port", "", "UK or Ireland port"
    if route in SERVICES:
        return SERVICES[route], "", "United Kingdom"
    if route in INDUSTRIES:
        return INDUSTRIES[route], "", "United Kingdom"
    return "Get a quick freight quote", "", ""


def form_html(route: str) -> str:
    heading, origin, destination = context(route)
    esc = lambda value: html.escape(value, quote=True)
    fields = f'''
      <input type="hidden" name="_subject" value="New Quick Quote Enquiry - Carrgo Website">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="quote_invitation" value="{esc(heading)}">
      <input type="hidden" name="source_page" value="{esc(route)}">
      <input type="hidden" name="follow_up_note" value="Initial quick quote enquiry. Ask for shipment dates, Incoterms, HS code, packing list and customs details after this enquiry arrives.">
      <label class="carrgo-qq-label">Origin<input name="origin" required value="{esc(origin)}" placeholder="City, country or supplier"></label>
      <label class="carrgo-qq-label">Destination<input name="destination" required value="{esc(destination)}" placeholder="UK address, city or port"></label>
      <label class="carrgo-qq-label">Goods<input name="goods" required placeholder="Furniture, cartons, machinery"></label>
      <label class="carrgo-qq-label">Approx weight / volume<input name="weight_volume" required placeholder="600 kg / 4 CBM"></label>
      <label class="carrgo-qq-label">Dimensions<input name="dimensions" placeholder="Pallet/carton size or I'm not sure"></label>
      <label class="carrgo-qq-label">Name<input name="name" required autocomplete="name" placeholder="Your name"></label>
      <label class="carrgo-qq-label">Email<input name="email" type="email" required autocomplete="email" placeholder="you@example.com"></label>
      <label class="carrgo-qq-label">Phone / WhatsApp<input name="phone" type="tel" autocomplete="tel" placeholder="Best number to contact you"></label>
      <button type="submit" class="carrgo-qq-submit">Get instant quote</button>'''
    return f'''<!-- carrgo-quick-quote-start -->
<style id="carrgo-quick-quote-style">
  @media (min-width:1280px){{main,footer{{padding-right:360px!important}}}}
  .carrgo-qq-card{{box-sizing:border-box;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827}}
  .carrgo-qq-card *{{box-sizing:border-box}}
  .carrgo-qq-kicker{{margin:0 0 4px;color:#1A6DFF;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}}
  .carrgo-qq-title{{margin:0;color:#111827;font-size:20px;line-height:1.15;font-weight:800}}
  .carrgo-qq-copy{{margin:8px 0 14px;color:#4b5563;font-size:12px;line-height:1.45}}
  .carrgo-qq-form{{display:grid;gap:10px}}
  .carrgo-qq-label{{display:grid;gap:4px;font-size:12px;font-weight:700;color:#1f2937}}
  .carrgo-qq-label input{{min-height:42px;width:100%;border:1px solid #d1d5db;border-radius:7px;padding:9px 10px;font:16px system-ui;background:#fff;color:#111827}}
  .carrgo-qq-submit{{min-height:46px;border:0;border-radius:9px;background:#1A6DFF;color:#fff;padding:11px 14px;font:800 16px system-ui;cursor:pointer}}
  #quick-quote-static{{position:fixed;right:16px;top:96px;z-index:40;width:320px;max-height:calc(100vh - 112px);overflow:auto;background:#fff;border:1px solid #e5e7eb;border-radius:18px;box-shadow:0 24px 60px rgba(15,23,42,.20);padding:16px}}
  #quick-quote-mobile-static{{display:none}}
  @media (max-width:1279px){{
    main,footer{{padding-right:0!important}}
    #quick-quote-static{{display:none}}
    #quick-quote-mobile-static{{display:block;position:fixed;left:12px;right:12px;bottom:12px;z-index:40;background:#fff;border:1px solid #e5e7eb;border-radius:18px;box-shadow:0 20px 55px rgba(15,23,42,.24);max-height:82vh;overflow:auto}}
    #quick-quote-mobile-static summary{{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:56px;padding:12px 14px;background:#1A6DFF;color:#fff;border-radius:18px;cursor:pointer}}
    #quick-quote-mobile-static summary::-webkit-details-marker{{display:none}}
    .carrgo-qq-mobile-open{{background:#fff;color:#1A6DFF;border-radius:9px;padding:8px 12px;font-size:13px;font-weight:800}}
    .carrgo-qq-mobile-body{{padding:14px}}
  }}
</style>
<aside id="quick-quote-static" class="carrgo-qq-card" data-static-quick-quote data-quick-quote-placement="sticky-sidebar" aria-labelledby="quick-quote-static-heading">
  <p class="carrgo-qq-kicker">2-minute quote</p>
  <h2 id="quick-quote-static-heading" class="carrgo-qq-title">{esc(heading)}</h2>
  <p class="carrgo-qq-copy">Send the basics now. Carrgo will ask for extra shipment details after your enquiry arrives.</p>
  <form class="carrgo-qq-form" action="https://formsubmit.co/support@carrgo.co.uk" method="POST">{fields}
  </form>
</aside>
<details id="quick-quote-mobile-static" class="carrgo-qq-card" data-static-quick-quote data-quick-quote-placement="mobile-sticky">
  <summary><span><span class="carrgo-qq-kicker" style="color:rgba(255,255,255,.8)">Quick enquiry</span><strong>{esc(heading)}</strong></span><span class="carrgo-qq-mobile-open">Open</span></summary>
  <div class="carrgo-qq-mobile-body">
    <p class="carrgo-qq-copy">Send origin, destination, goods and contact details now. Extra shipment details can come later.</p>
    <form class="carrgo-qq-form" action="https://formsubmit.co/support@carrgo.co.uk" method="POST">{fields}
    </form>
  </div>
</details>
<script>(function(){{setTimeout(function(){{if(document.getElementById('quick-quote')){{document.querySelectorAll('[data-static-quick-quote],#carrgo-quick-quote-style').forEach(function(el){{el.remove();}});}}}},1200);}})();</script>
<!-- carrgo-quick-quote-end -->'''


def main() -> int:
    root = Path(sys.argv[1])
    changed = 0
    for file in root.rglob("*.html"):
        route = route_for_file(root, file)
        if not route or route in {"/404"}:
            continue
        text = file.read_text()
        text = re.sub(r'<!-- carrgo-quick-quote-start -->[\s\S]*?<!-- carrgo-quick-quote-end -->\s*', "", text, count=1)
        text = re.sub(r'<section id="quick-quote-static"[\s\S]*?</section>\s*', "", text, count=1)
        marker = "<div id=\"root\""
        if marker in text:
            text = text.replace(marker, form_html(route) + "\n" + marker, 1)
        elif "</body>" in text:
            text = text.replace("</body>", form_html(route) + "\n</body>", 1)
        else:
            text = text + "\n" + form_html(route) + "\n"
        file.write_text(text)
        changed += 1
    print(f"Injected static quick quote forms into {changed} pages.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
