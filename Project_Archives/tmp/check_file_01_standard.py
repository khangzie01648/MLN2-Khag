
import re
import os

file_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\01_Adam_Smith_Full_250_Prompts_FINAL.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Check for "TRANG"
trang_matches = re.findall(r'VIDEO \d+: TRANG \d+', content)
if trang_matches:
    print(f"Found TRANG in: {trang_matches}")
else:
    print("No TRANG found.")

# Check for "Nội dung" after each "VIDEO XX"
video_headers = re.findall(r'(VIDEO \d+:[^\n]+)', content)
missing_content = []
for header in video_headers:
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

# Check for bad indentation
lines = content.split('\n')
bad_indentation = []
for i, line in enumerate(lines):
    # Check for leading spaces in lines that should be flushed left
    if re.match(r'^\s+\d+\. Clip', line) or re.match(r'^\s+Prompt:', line) or re.match(r'^\s+Kỹ thuật:', line):
        bad_indentation.append((i+1, line))

if bad_indentation:
    print(f"Found bad indentation in {len(bad_indentation)} lines.")
    for lnum, ltxt in bad_indentation[:10]:
        print(f"Line {lnum}: '{ltxt}'")
else:
    print("No indentation issues found.")

# Check for number of videos
video_count = len(video_headers)
print(f"Total videos: {video_count}")
