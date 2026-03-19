
import re
import os

def check_structural_uniformity(file_path):
    if not os.path.exists(file_path):
        return None
        
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    metrics = {
        'header_lines': 0,
        'video_count': 0,
        'clips_per_video': [],
        'lines_per_clip': [],
        'separators': 0,
        'suffix_consistency': True
    }

    current_clip_count = 0
    current_lines_in_clip = 0
    
    for i, line in enumerate(lines[:10]): # Check first 10 lines for header structure
        if line.strip().startswith('#'): 
            metrics['header_lines'] += 1

    for line in lines:
        line_clean = line.strip()
        
        # Check Video Headers
        if line_clean.startswith("VIDEO"):
            metrics['video_count'] += 1
            if "(BẢN LỊCH SỬ THUẦN TÚY)" not in line_clean:
                metrics['suffix_consistency'] = False
            if current_clip_count > 0:
                metrics['clips_per_video'].append(current_clip_count)
            current_clip_count = 0
            
        # Check Clips
        if re.match(r'^\d\. Clip \d', line_clean):
            current_clip_count += 1
            if current_lines_in_clip > 0:
                metrics['lines_per_clip'].append(current_lines_in_clip)
            current_lines_in_clip = 0
            
        # Check Lines within Clips (Prompt and Tech)
        if line_clean.startswith("Prompt:") or line_clean.startswith("Kỹ thuật:"):
            current_lines_in_clip += 1
            
        # Check Separators
        if line_clean == "---":
            metrics['separators'] += 1

    # Add last clip/video
    if current_clip_count > 0:
        metrics['clips_per_video'].append(current_clip_count)
    if current_lines_in_clip > 0:
        metrics['lines_per_clip'].append(current_lines_in_clip)

    return metrics

base_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons'
files = [f"0{i}_Adam_Smith_Full_250_Prompts_FINAL.md" for i in range(1, 8)]

all_metrics = {}
for f in files:
    all_metrics[f] = check_structural_uniformity(os.path.join(base_path, f))

# Compare and Report
reference = all_metrics[files[0]]
print(f"STRUCTURAL AUDIT REPORT (UNIFORMITY CHECK)")
print("-" * 100)
print(f"{'FILE NAME':<42} | {'VIDS':<5} | {'CLIPS':<5} | {'HDR':<3} | {'SEP':<3} | {'UNIFORM'}")
print("-" * 100)

for f, m in all_metrics.items():
    if not m: continue
    
    # Logic to check if it matches reference structure
    is_uniform = (
        m['video_count'] == 50 and 
        all(c == 5 for c in m['clips_per_video']) and 
        all(l == 2 for l in m['lines_per_clip']) and
        m['suffix_consistency'] == True
    )
    
    uniform_status = "✅ YES" if is_uniform else "❌ NO"
    print(f"{f:<42} | {m['video_count']:<5} | {len(m['clips_per_video'])*5:<5} | {m['header_lines']:<3} | {m['separators']:<3} | {uniform_status}")

