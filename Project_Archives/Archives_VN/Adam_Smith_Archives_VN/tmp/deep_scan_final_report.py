
import re
import os

def deep_scan_report(file_path):
    if not os.path.exists(file_path):
        return {"Status": "MISSING"}
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    report = {}
    
    # Check Header
    report['Header Correct'] = "YES" if "[BẢN LỊCH SỬ THUẦN TÚY" in content else "NO"
    
    # Extract Videos
    video_matches = re.findall(r'VIDEO (\d+): (.*?)(?=\n|$)', content)
    report['Total Videos'] = len(video_matches)
    
    # Check "Adam Smith" presence
    adam_count = content.lower().count("adam smith")
    report['Adam Smith Mentions'] = adam_count
    
    # Check Suffix and Title Correctness
    titles = [v[1] for v in video_matches]
    missing_suffix = [v[0] for v in video_matches if "(BẢN LỊCH SỬ THUẦN TÚY)" not in v[1]]
    report['Videos Missing Suffix'] = missing_suffix if missing_suffix else "NONE"
    
    # Check Clips
    clips = re.findall(r'\d\. Clip \d', content)
    prompts = re.findall(r'Prompt:', content)
    techniques = re.findall(r'Kỹ thuật:', content)
    
    report['Total Clips'] = len(clips)
    report['Prompts'] = len(prompts)
    report['Technical Lines'] = len(techniques)
    
    # Check for generic/template artifacts
    generic_check = "YES" if "Noticeable markers: , " in content or "Noticeable historical markers: Adam Smith, ," in content else "NO"
    report['Generic Artifacts Found'] = generic_check

    # Deduplication Check
    unique_titles = set(titles)
    report['Duplicate Titles'] = len(titles) - len(unique_titles)

    # Decision
    if (len(video_matches) == 50 and 
        len(clips) == 250 and 
        report['Videos Missing Suffix'] == "NONE" and 
        report['Duplicate Titles'] == 0):
        report['Final Status'] = "PASSED (PERFECT)"
    else:
        report['Final Status'] = "FAILED / NEEDS REVIEW"
        
    return report

base_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons'
files = [f"0{i}_Adam_Smith_Full_250_Prompts_FINAL.md" for i in range(1, 8)]

print(f"{'FILE':<42} | {'VIDS':<5} | {'CLIPS':<5} | {'ADAM':<6} | {'STATUS'}")
print("-" * 85)
for f in files:
    res = deep_scan_report(os.path.join(base_path, f))
    print(f"{f:<42} | {res.get('Total Videos', 0):<5} | {res.get('Total Clips',0):<5} | {res.get('Adam Smith Mentions', 0):<6} | {res.get('Final Status', 'ERROR')}")
