
import re

def analyze_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    videos = [l for l in lines if l.startswith('VIDEO ')]
    summaries = [l for l in lines if l.startswith('Nội dung:')]
    clips = [l for l in lines if re.match(r'^\d+\. Clip \d+', l.strip())]
    prompts = [l for l in lines if l.startswith('Prompt:')]
    techs = [l for l in lines if l.startswith('Kỹ thuật:')]
    separators = [l for l in lines if l.strip() == '---']
    
    return {
        'video_count': len(videos),
        'summary_count': len(summaries),
        'clip_count': len(clips),
        'prompt_count': len(prompts),
        'tech_count': len(techs),
        'separators': len(separators),
        'titles_sample': videos[:3],
        'first_video_title': videos[0] if videos else None
    }

f1 = analyze_file(r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\01_Adam_Smith_Full_250_Prompts_FINAL.md')
f2 = analyze_file(r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\02_Adam_Smith_Full_250_Prompts_FINAL.md')

print(f"File 01 Analysis: {f1}")
print(f"File 02 Analysis: {f2}")

# Check for suffix consistency
f1_suffixes = [l for l in f1['titles_sample'] if '(ABSOLUTE MAXIMUM DATA EDITION)' in l]
f2_suffixes = [l for l in f2['titles_sample'] if '(ABSOLUTE MAXIMUM DATA EDITION)' in l]

print(f"File 01 titles with suffix: {len(f1_suffixes)}/{len(f1['titles_sample'])}")
print(f"File 02 titles with suffix: {len(f2_suffixes)}/{len(f2['titles_sample'])}")
