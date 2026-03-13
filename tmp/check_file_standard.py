import re
import os

file_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\02_Adam_Smith_Full_250_Prompts_FINAL.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check for "TRANG"
trang_matches = re.findall(r'VIDEO \d+: TRANG \d+', content)
if trang_matches:
    print(f"Found TRANG in: {trang_matches}")
else:
    print("No TRANG found.")

# Check for leading spaces in lines starting with digit, Prompt, or Kỹ thuật
lines = content.split('\n')
bad_indentation = []
for i, line in enumerate(lines):
    if re.match(r'^\s+\d+\. Clip', line) or re.match(r'^\s+Prompt:', line) or re.match(r'^\s+Kỹ thuật:', line):
        bad_indentation.append((i+1, line))

if bad_indentation:
    print(f"Found bad indentation in {len(bad_indentation)} lines.")
    for lnum, ltxt in bad_indentation[:10]:
        print(f"Line {lnum}: '{ltxt}'")
else:
    print("No indentation issues found.")
