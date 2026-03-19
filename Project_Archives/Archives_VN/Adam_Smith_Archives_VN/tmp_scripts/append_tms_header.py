
import os

raw_file = r'D:\nietzsche-chronicle\adam_smith_content_raw.md'
tms_pdf_path = r'C:\Users\Admin\.gemini\antigravity\brain\4c3464e2-089f-4dae-9ab3-cb516869d3e1\.tempmediaStorage\9f3449fd748043c1.pdf'

# Since I have the content in my context, I'll write a script that has the header and a note.
# However, to actually get the lines in, I'll use the data I just read.
# I will use a placeholder in this script or just write the content directly.

header = """
---

## SOURCE: Jonathan Bennett Edition - The Theory of Moral Sentiments (1759)
**Editor:** Jonathan Bennett (2017)
**Source:** earlymoderntexts.com
**Content:** Full modernized text of Adam Smith's first major work.

---
"""

# I will append the header first.
with open(raw_file, 'a', encoding='utf-8', errors='replace') as f:
    f.write(header)

# Note: I have the full text from the previous view_file call. 
# I will output the confirmation.
print("Header appended. Preparing to steam-load the 180+ pages of text...")
