"""Stage a tested build over the existing published tree without deleting assets."""
import html
import json
from pathlib import Path
import re
import shutil
import sys

source, published, baseline = map(Path, sys.argv[1:])
dist = source / 'dist'
ledger = json.loads((dist / 'data/port-evidence/latest.json').read_text())

def entry(page, extension):
    matches = re.findall(r'/assets/index-[\w-]+\.' + extension, page)
    assert len(set(matches)) == 1, matches
    return matches[0]

old = (baseline / 'index.html').read_text()
new = (dist / 'index.html').read_text()
replacements = [(entry(old, kind), entry(new, kind)) for kind in ('js', 'css')]
for asset in (dist / 'assets').iterdir():
    target = published / 'assets' / asset.name
    if target.exists():
        assert target.read_bytes() == asset.read_bytes(), f'Would overwrite an unrelated asset: {asset.name}'
    else:
        shutil.copy2(asset, target)
for path in published.rglob('*.html'):
    text = path.read_text()
    modified = text
    for before, after in replacements:
        modified = modified.replace(before, after)
    if modified != text:
        path.write_text(modified)
shutil.copytree(dist / 'data/port-evidence', published / 'data/port-evidence', dirs_exist_ok=True)

tracker = published / 'resources/port-congestion-tracker/index.html'
page = tracker.read_text()
title = 'UK &amp; Ireland Port Congestion Evidence | Carrgo'
description = 'Evidence status for 17 UK and Ireland ports. Waiting times, scores and forecasts are unverified; dated operating notices are linked separately.'
page = re.sub(r'<title>.*?</title>', '<title>' + title + '</title>', page)
for attribute, name in [('name', 'description'), ('property', 'og:description'), ('name', 'twitter:description')]:
    page = re.sub(r'<meta ' + attribute + '="' + name + r'"[^>]*>', '<meta ' + attribute + '="' + name + '" content="' + description + '" />', page)
for attribute, name in [('property', 'og:title'), ('name', 'twitter:title')]:
    page = re.sub(r'<meta ' + attribute + '="' + name + r'"[^>]*>', '<meta ' + attribute + '="' + name + '" content="' + title + '" />', page)
page = re.sub(r'<meta name="(?:date|last-modified)"[^>]*>', '', page)

def tracker_schema(match):
    data = json.loads(match.group(1))
    if data.get('@type') == 'WebApplication':
        data['description'] = description
        data['url'] = 'https://www.carrgo.co.uk/resources/port-congestion-tracker/'
    return '<script type="application/ld+json">' + json.dumps(data) + '</script>'

page = re.sub(r'<script type="application/ld\+json">(.*?)</script>', tracker_schema, page, flags=re.S)
rows = ''.join('<tr><th scope="row">' + html.escape(p['port']) + '</th><td>Unknown</td><td>' + html.escape(p['review']) + '</td></tr>' for p in ledger['ports'])
notices = ''.join('<p>' + html.escape(s['claim']) + ' <a href="' + html.escape(s['url'], quote=True) + '">Original notice, ' + html.escape(s['publishedOn']) + '</a></p>' for s in ledger['sources'] if s['claim'])
checked_on = html.escape(ledger['checkedOn'])
coverage = str(ledger['coverage'])
fallback = '<noscript><main style="max-width:1000px;margin:40px auto;padding:20px;font:16px/1.6 system-ui"><h1>UK &amp; Ireland Port Congestion Tracker</h1><h2>Current congestion measurements are unverified</h2><p>Previous scores, waits, forecasts and generated history are not validated observations. Unknown does not mean normal. Evidence review: ' + checked_on + '; last verified measurement: unknown. Coverage: ' + coverage + ' ports.</p><h2>Dated operating notices</h2>' + notices + '<p>Confirm current applicability with the operator. Notices do not establish port-wide congestion.</p><table><caption>Port evidence coverage</caption><thead><tr><th>Port</th><th>Metrics</th><th>Review</th></tr></thead><tbody>' + rows + '</tbody></table><h2>Methodology</h2><p>' + html.escape(ledger['methodology']) + '</p><p><a href="/data/port-evidence/' + checked_on + '.json">Dated evidence JSON</a> | <a href="/resources/uk-port-congestion-report/">Weekly report data warning</a> | <a href="/get-a-quote/">Discuss your shipment</a></p></main></noscript>'
page, count = re.subn(r'<noscript>.*?</noscript>', lambda _: fallback, page, count=1, flags=re.S)
assert count == 1, 'Expected tracker fallback not found'
tracker.write_text(page)

warning = '<aside role="note" style="border-left:4px solid #b45309;background:#fffbeb;padding:20px;margin:20px 0"><h2>Data warning added 7 September 2026</h2><p>The figures below are an unverified legacy snapshot, not measured live congestion. Source code contains hard-coded metrics and randomly generated history. The original report date and figures are retained for transparency, but must not be used for routing, cost estimates or port comparisons. No verified measurement date is available.</p><p><a href="/resources/port-congestion-tracker/">View current evidence status and dated operating notices</a>.</p></aside>'
for report in (published / 'resources/uk-port-congestion-report').rglob('*.html'):
    text = report.read_text()
    if 'Data warning added 7 September 2026' in text:
        continue
    text = text.replace('Live Weekly Data', 'Unverified Snapshot')
    text = re.sub(r'<meta (name="description"|property="og:description") content="[^"]*"\s*/?>', r'<meta \1 content="Unverified historical Carrgo port snapshot. Numerical claims are not validated operational measurements; see the current evidence tracker." />', text)
    def remove_unsupported_schema(match):
        data = json.loads(match.group(1))
        return '' if data.get('@type') in ('Dataset', 'FAQPage') else match.group(0)
    text = re.sub(r'<script type="application/ld\+json">(.*?)</script>', remove_unsupported_schema, text, flags=re.S)
    text, count = re.subn(r'(</h1>)', lambda m: m[0] + warning, text, count=1)
    assert count == 1, report
    report.write_text('\n'.join(line.rstrip() for line in text.splitlines()) + '\n')
print('Staged evidence tracker, preserved legacy reports with warnings, and copied versioned assets.')
