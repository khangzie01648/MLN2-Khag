
import urllib.request
import re
import ssl
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.capture = False
        # Limit to text bearing tags
        self.valid_tags = {'p', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'article'}

    def handle_starttag(self, tag, attrs):
        if tag in self.valid_tags:
            self.capture = True

    def handle_endtag(self, tag):
        if tag in self.valid_tags:
            self.capture = False
            self.text.append('\n\n')

    def handle_data(self, data):
        if self.capture:
            cleaned = data.strip()
            if cleaned:
                self.text.append(cleaned)

def extract_text_from_url(url):
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = urllib.request.urlopen(req, context=ctx, timeout=15).read().decode('utf-8')
        
        # Simple body extraction
        body_match = re.search(r'<body.*?>(.*?)</body>', html, re.DOTALL | re.IGNORECASE)
        if body_match:
            html = body_match.group(1)
        
        # Strip noisy elements
        html = re.sub(r'<script.*?>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
        html = re.sub(r'<style.*?>.*?</style>', '', html, flags=re.DOTALL | re.IGNORECASE)
        html = re.sub(r'<nav.*?>.*?</nav>', '', html, flags=re.DOTALL | re.IGNORECASE)
        html = re.sub(r'<header.*?>.*?</header>', '', html, flags=re.DOTALL | re.IGNORECASE)
        html = re.sub(r'<footer.*?>.*?</footer>', '', html, flags=re.DOTALL | re.IGNORECASE)

        parser = TextExtractor()
        parser.feed(html)
        return " ".join(parser.text).replace("  ", " ").replace("\\n", "\n")
    except Exception as e:
        return f"Fetch error/no valid content: {e}"

links_file = r'D:\nietzsche-chronicle\Adam_Smith_Links_Clean.md'
out_file = r'D:\nietzsche-chronicle\adam_smith_content_raw.md'

with open(links_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find adamsmithworks documents to avoid general category pages
urls = re.findall(r'(https://www\.adamsmithworks\.org/documents/[a-zA-Z0-9_-]+)', content)
urls = list(set(urls))

print(f"Found {len(urls)} AdamSmithWorks deep articles and documents. Starting crawl...")

with open(out_file, 'a', encoding='utf-8', errors='replace') as out:
    out.write('\n\n# --- MASS EXTRACT: ADAMSMITHWORKS.ORG ARTICLES ---\n\n')
    for i, url in enumerate(urls):
        print(f"Crawling {i+1}/{len(urls)}: {url}")
        try:
            text = extract_text_from_url(url)
            if len(text) > 150: # Only save if it's a substantive rip
                out.write(f"\n\n### SOURCE URL: {url}\n")
                out.write(text)
                out.write("\n\n" + "-"*40 + "\n\n")
        except Exception as e:
            print(f"Skipping {url} due to error.")

print("\n--- Crawl complete! Text appended to raw data file. ---")
# Count final lines
lines = open(out_file, encoding='utf-8', errors='replace').readlines()
print(f'Total lines now in raw file: {len(lines)}')

