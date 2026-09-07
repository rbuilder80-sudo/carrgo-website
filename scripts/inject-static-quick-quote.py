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
    return f'''<section id="quick-quote-static" aria-labelledby="quick-quote-static-heading" style="background:#fff;border-top:1px solid #e5e7eb;padding:36px 16px">
  <div style="max-width:1100px;margin:0 auto;display:grid;gap:20px">
    <div>
      <p style="margin:0 0 8px;color:#1A6DFF;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Quick enquiry</p>
      <h2 id="quick-quote-static-heading" style="margin:0;color:#111827;font-size:28px;line-height:1.15">{esc(heading)}</h2>
      <p style="margin:12px 0 0;color:#4b5563">Send the basics now. Carrgo will ask for extra shipment details after your enquiry arrives.</p>
    </div>
    <form action="https://formsubmit.co/support@carrgo.co.uk" method="POST" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px">
      <input type="hidden" name="_subject" value="New Quick Quote Enquiry - Carrgo Website">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="quote_invitation" value="{esc(heading)}">
      <input type="hidden" name="source_page" value="{esc(route)}">
      <input type="hidden" name="follow_up_note" value="Initial quick quote enquiry. Ask for shipment dates, Incoterms, HS code, packing list and customs details after this enquiry arrives.">
      <label style="display:grid;gap:5px;font-weight:600;color:#1f2937">Origin<input name="origin" required value="{esc(origin)}" placeholder="City, country or supplier location" style="min-height:46px;border:1px solid #d1d5db;border-radius:8px;padding:10px;font:16px system-ui;background:white"></label>
      <label style="display:grid;gap:5px;font-weight:600;color:#1f2937">Destination<input name="destination" required value="{esc(destination)}" placeholder="UK address, city or port" style="min-height:46px;border:1px solid #d1d5db;border-radius:8px;padding:10px;font:16px system-ui;background:white"></label>
      <label style="display:grid;gap:5px;font-weight:600;color:#1f2937">Goods<input name="goods" required placeholder="Furniture, cartons, machinery" style="min-height:46px;border:1px solid #d1d5db;border-radius:8px;padding:10px;font:16px system-ui;background:white"></label>
      <label style="display:grid;gap:5px;font-weight:600;color:#1f2937">Approx weight / volume<input name="weight_volume" required placeholder="600 kg / 4 CBM" style="min-height:46px;border:1px solid #d1d5db;border-radius:8px;padding:10px;font:16px system-ui;background:white"></label>
      <label style="display:grid;gap:5px;font-weight:600;color:#1f2937">Dimensions<input name="dimensions" placeholder="Pallet/carton size or I'm not sure" style="min-height:46px;border:1px solid #d1d5db;border-radius:8px;padding:10px;font:16px system-ui;background:white"></label>
      <label style="display:grid;gap:5px;font-weight:600;color:#1f2937">Name<input name="name" required autocomplete="name" placeholder="Your name" style="min-height:46px;border:1px solid #d1d5db;border-radius:8px;padding:10px;font:16px system-ui;background:white"></label>
      <label style="display:grid;gap:5px;font-weight:600;color:#1f2937">Email<input name="email" type="email" required autocomplete="email" placeholder="you@example.com" style="min-height:46px;border:1px solid #d1d5db;border-radius:8px;padding:10px;font:16px system-ui;background:white"></label>
      <label style="display:grid;gap:5px;font-weight:600;color:#1f2937">Phone / WhatsApp<input name="phone" type="tel" autocomplete="tel" placeholder="Best number to contact you" style="min-height:46px;border:1px solid #d1d5db;border-radius:8px;padding:10px;font:16px system-ui;background:white"></label>
      <button type="submit" style="min-height:48px;border:0;border-radius:8px;background:#1A6DFF;color:white;padding:12px 18px;font:700 16px system-ui;cursor:pointer">Send quick quote enquiry</button>
    </form>
  </div>
</section>'''


def main() -> int:
    root = Path(sys.argv[1])
    changed = 0
    for file in root.rglob("*.html"):
        route = route_for_file(root, file)
        if not route or route in {"/404"}:
            continue
        text = file.read_text()
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
