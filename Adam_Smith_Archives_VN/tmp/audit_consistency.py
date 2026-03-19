
import re
import os

def audit_file(file_path):
    if not os.path.exists(file_path):
        return f"File {file_path} not found."
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    errors = []
    
    # 1. Check Header
    if "HOLLYWOOD x1000 PROMPTS" not in content:
        errors.append("Missing main Hollywood header.")
        
    # 2. Check Video Titles and Summaries
    videos = re.findall(r'VIDEO (\d+): (.*)', content)
    for num, title in videos:
        if "(ABSOLUTE MAXIMUM DATA EDITION)" not in title:
            errors.append(f"Video {num}: Missing suffix in title.")
            
    summaries = re.findall(r'Nội dung: (.*)', content)
    if len(summaries) != len(videos):
        errors.append(f"Summary count ({len(summaries)}) mismatch with Video count ({len(videos)}).")

    # 3. Check Clip structure (approximate)
    clips = re.findall(r'\d\. Clip \d', content)
    prompts = re.findall(r'Prompt:', content)
    techniques = re.findall(r'Kỹ thuật:', content)
    
    expected_clips = len(videos) * 5
    if len(clips) != expected_clips:
        errors.append(f"Clip count mismatch. Expected {expected_clips}, found {len(clips)}.")
    if len(prompts) != expected_clips:
        errors.append(f"Prompt line mismatch. Expected {expected_clips}, found {len(prompts)}.")
    if len(techniques) != expected_clips:
        errors.append(f"Technical line mismatch. Expected {expected_clips}, found {len(techniques)}.")

    return errors if errors else "PASSED"

base_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons'
files_to_check = [
    '01_Adam_Smith_Full_250_Prompts_FINAL.md',
    '03_Adam_Smith_Full_250_Prompts_FINAL.md',
    '05_Adam_Smith_Full_250_Prompts_FINAL.md',
    '07_Adam_Smith_Full_250_Prompts_FINAL.md'
]

for f in files_to_check:
    result = audit_file(os.path.join(base_path, f))
    print(f"Audit for {f}: {result}")
