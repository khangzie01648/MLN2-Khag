import re
import os

file_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\02_Adam_Smith_Full_250_Prompts_FINAL.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check for "Nội dung" after each "VIDEO XX"
video_headers = re.findall(r'(VIDEO \d+:[^\n]+)', content)
missing_content = []
for header in video_headers:
    # Find the block for this video
    # Simplified check: check if next line (skipping empty) starts with "Nội dung:"
    start_pos = content.find(header)
    end_pos = content.find('---', start_pos)
    if end_pos == -1: end_pos = len(content)
    
    video_block = content[start_pos:end_pos]
    if "Nội dung:" not in video_block:
        missing_content.append(header)

if missing_content:
    print(f"Missing 'Nội dung:' in: {missing_content}")
else:
    print("All videos have 'Nội dung:'.")

# Check for bad indentation again but more thoroughly
lines = content.split('\n')
bad_indentation = []
for i, line in enumerate(lines):
    if re.match(r'^\s+\d+\. Clip', line) or re.match(r'^\s+Prompt:', line) or re.match(r'^\s+Kỹ thuật:', line):
        bad_indentation.append((i+1, line))

if bad_indentation:
    print(f"Found bad indentation in {len(bad_indentation)} lines.")
    for lnum, ltxt in bad_indentation:
        print(f"Line {lnum}: '{ltxt}'")
else:
    print("No indentation issues found.")
