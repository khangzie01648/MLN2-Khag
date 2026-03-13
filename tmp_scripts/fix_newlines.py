
import os

raw_file = r'D:\nietzsche-chronicle\adam_smith_content_raw.md'

with open(raw_file, 'r', encoding='utf-8', errors='replace') as f:
    text = f.read()

# Replace literal \n with actual newlines. 
# Note: I need to be careful not to break legitimate sequences.
# But for the bulk data I just added, this is the main issue.
new_text = text.replace('\\n', '\n')

with open(raw_file, 'w', encoding='utf-8', errors='replace') as f:
    f.write(new_text)

lines = open(raw_file, encoding='utf-8', errors='replace').readlines()
print(f'Fixed! Total lines: {len(lines)}')
