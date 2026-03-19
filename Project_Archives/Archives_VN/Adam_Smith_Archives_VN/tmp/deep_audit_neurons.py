
import re
import os

def full_audit_report(file_path):
    if not os.path.exists(file_path):
        return "MISSING"
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    report = {}
    
    # Check Header
    report['Pure History Header'] = "YES" if "[BẢN LỊCH SỬ THUẦN TÚY" in content else "NO"
    
    # Check Videos
    video_titles = re.findall(r'VIDEO (\d+): (.*)', content)
    report['Total Videos'] = len(video_titles)
    
    # Check Suffix in Video Titles
    missing_suffix = [v[0] for v in video_titles if "(BẢN LỊCH SỬ THUẦN TÚY)" not in v[1]]
    report['Videos Missing Suffix'] = missing_suffix if missing_suffix else "NONE"
    
    # Check Clips and Prompts
    clips = re.findall(r'\d\. Clip \d', content)
    prompts = re.findall(r'Prompt:', content)
    techniques = re.findall(r'Kỹ thuật:', content)
    
    report['Total Clips'] = len(clips)
    report['Total Prompts'] = len(prompts)
    report['Total Technical Lines'] = len(techniques)
    
    # Expected vs Actual
    expected_videos = 50
    expected_clips = expected_videos * 5
    
    status = "SUCCESS"
    if len(video_titles) != expected_videos: status = "VIDEO COUNT MISMATCH"
    if len(clips) != expected_clips: status = "CLIP COUNT MISMATCH"
    if report['Pure History Header'] == "NO": status = "WRONG HEADER"
    
    report['Overall Status'] = status
    return report

base_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons'
results = {}

for i in range(1, 8):
    fname = f"0{i}_Adam_Smith_Full_250_Prompts_FINAL.md"
    fpath = os.path.join(base_path, fname)
    results[fname] = full_audit_report(fpath)

# In kết quả ra màn hình một cách đẹp mắt
print(f"{'FILE NAME':<45} | {'STATUS':<15} | {'VIDS':<5} | {'CLIPS':<5}")
print("-" * 75)
for fname, rep in results.items():
    if rep == "MISSING":
        print(f"{fname:<45} | {'MISSING':<15} | {'-':<5} | {'-':<5}")
    else:
        print(f"{fname:<45} | {rep['Overall Status']:<15} | {rep['Total Videos']:<5} | {rep['Total Clips']:<5}")
