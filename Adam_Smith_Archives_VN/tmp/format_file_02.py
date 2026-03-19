
import re

file_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\02_Adam_Smith_Full_250_Prompts_FINAL.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Standardize Header
# Looking at File 01:
# # 🎬 HOLLYWOOD x1000 PROMPTS: THE ADAM SMITH ARCHIVES
# ## [BẢN LỊCH SỬ THUẦN TÚY — CINEMATIC REALISM]
# ### DỰ ÁN: TRỰC QUAN HÓA CUỘC ĐỜI ADAM SMITH - NEURON 02 (1737-1746)

header = """# 🎬 HOLLYWOOD x1000 PROMPTS: THE ADAM SMITH ARCHIVES
## [BẢN LỊCH SỬ THUẦN TÚY — CINEMATIC REALISM]
### DỰ ÁN: TRỰC QUAN HÓA CUỘC ĐỜI ADAM SMITH - NEURON 02 (1737-1746)

---
"""

# Find the first VIDEO or separator to replace the top
content_no_header = content.split('VIDEO 01:')[1]
new_content = header + "\nVIDEO 01:" + content_no_header

# 2. Change suffix in titles
# Replace (BẢN LỊCH SỬ THUẦN TÚY) with (ABSOLUTE MAXIMUM DATA EDITION) in VIDEO lines
new_content = re.sub(r'(VIDEO \d+:.*?)\(BẢN LỊCH SỬ THUẦN TÚY\)', r'\1(ABSOLUTE MAXIMUM DATA EDITION)', new_content)

# 3. Add (ABSOLUTE MAXIMUM DATA EDITION) if missing from VIDEO titles
def add_suffix(match):
    title = match.group(0)
    if '(ABSOLUTE MAXIMUM DATA EDITION)' not in title:
        return title.strip() + ' (ABSOLUTE MAXIMUM DATA EDITION)'
    return title

new_content = re.sub(r'VIDEO \d+:.*', add_suffix, new_content)

# 4. Fix indentation (removing leading spaces from Prompt and Kỹ thuật)
new_content = re.sub(r'^[ \t]+Prompt:', 'Prompt:', new_content, flags=re.MULTILINE)
new_content = re.sub(r'^[ \t]+Kỹ thuật:', 'Kỹ thuật:', new_content, flags=re.MULTILINE)

# 5. Fix Video 20 duplication (detected in previous view_file)
# Video 20 started around line 390.
# I will look for the specific duplicated block.
# Actually, it's safer to just clean any triple/quadruple clips if they exist.
# But let's look at the specific lines 401-412 of current File 02.
# 401: 4. Clip 4 (18:00 - 24:00): Bước ra khỏi gông xiềng của thi cử
# 407: 4. Clip 4 (18:00 - 24:00): Sự trả tự do
# 411: 5. Clip 5 (24:00 - 30:00): Tự do trí tuệ (wait there were two Clip 5s too?)
# 404: 5. Clip 5 (24:00 - 30:00): Sự tự do thực sự của trí tuệ độc lập

# Let's just do a string replacement for that specific mess in Video 20.
v20_bad = """1. Clip 1 (00:00 - 06:00): Phòng thi nghẹt thở và bầu không khí của sự áp bức
Prompt: A wide cinematic shot of hundreds of students bent over desks in the Great Hall. The air is thick with the scent of old ink and fear. Professors watch like guards.
Kỹ thuật: Lens: 24mm Wide. Lighting: Dusty, harsh and clinical hall light (5000K). Sound: The sound of hundreds of pens scratching at once in a frantic rhythm.
2. Clip 2 (06:00 - 12:00): Những câu hỏi giáo điều và sự vô nghĩa của tri thức
Prompt: A close-up shot on a test paper with an obscure, useless theological question in Latin. Adam’s hand hovers over it, then writes a extremely short, dismissive answer.
Kỹ thuật: Lens: 50mm. Lighting: High-contrast, moody shadows. Sound: Bored, rhythmic and persistent pen taps on wood.
3. Clip 3 (12:00 - 18:00): Ánh mắt thoát tục khỏi thực tại gò bó
Prompt: A close-up on Adam’s face as he waits for the pointless exam to end. He is looking at a fly on the window, his mind miles away in his own secret theories.
Kỹ thuật: Lens: 85mm. Lighting: Soft, diffused window flare (5500K). Sound: The faint buzzing of a fly and distant, slow clock ticks.
4. Clip 4 (18:00 - 24:00): Bước ra khỏi gông xiềng của thi cử
Prompt: Adam is the first to leave the hall. He drops his pen with a final sound. He looks at the massive stone walls of the hall as if they were a cage.
Kỹ thuật: Lens: 35mm. Lighting: Stark, direct afternoon sun flares. Sound: The sharp "clack" of a pen hitting a wooden desk.
5. Clip 5 (24:00 - 30:00): Sự tự do thực sự của trí tuệ độc lập
Prompt: Adam walking rapidly away from the exam hall towards the library. His face shows a renewed dedication to his own path. Fade to black.
Kỹ thuật: Lens: 50mm. Lighting: Radiant, hopeful golden hour light (3000K). Sound: A resonant, building and final orchestral drum beat.
4. Clip 4 (18:00 - 24:00): Sự trả tự do
Prompt: Macro shot of Adam handing his finished paper to a cold, expressionless proctor. He walks away before the man can even look at him.
Kỹ thuật: Lens: 50mm. Lighting: Blinding exit light. Sound: Sound of a heavy door slamming shut.
5. Clip 5 (24:00 - 30:00): Tự do trí tuệ
Prompt: Adam running down the Oxford streets, a look of pure joy. He has survived the last meaningless formality. He is now truly free to think.
Kỹ thuật: Lens: 35mm Tracking shot. Lighting: Golden afternoon. Sound: Triumphant orchestral swell."""

v20_good = """1. Clip 1 (00:00 - 06:00): Phòng thi nghẹt thở và bầu không khí của sự áp bức
Prompt: A wide cinematic shot of hundreds of students bent over desks in the Great Hall. The air is thick with the scent of old ink and fear. Professors watch like guards in 8K.
Kỹ thuật: Lens: 24mm Wide. Lighting: Dusty, harsh and clinical hall light (5000K). Sound: The sound of hundreds of pens scratching at once in a frantic rhythm.
2. Clip 2 (06:00 - 12:00): Những câu hỏi giáo điều và sự vô nghĩa của tri thức
Prompt: A close-up shot on a test paper with an obscure, useless theological question in Latin. Adam’s hand hovers over it, then writes a extremely short, dismissive answer.
Kỹ thuật: Lens: 50mm. Lighting: High-contrast, moody shadows. Sound: Bored, rhythmic and persistent pen taps on wood.
3. Clip 3 (12:00 - 18:00): Ánh mắt thoát tục khỏi thực tại gò bó
Prompt: A close-up on Adam’s face as he waits for the pointless exam to end. He is looking at a fly on the window, his mind miles away in his own secret theories.
Kỹ thuật: Lens: 85mm. Lighting: Soft, diffused window flare (5500K). Sound: The faint buzzing of a fly and distant, slow clock ticks.
4. Clip 4 (18:00 - 24:00): Bước ra khỏi gông xiềng của thi cử và sự trả tự do
Prompt: Adam is the first to leave the hall. He drops his pen with a final sound. He looks at the massive stone walls as a cage. Macro shot of handing paper to proctor.
Kỹ thuật: Lens: 50mm. Lighting: Stark, direct afternoon sun flares. Sound: The sharp "clack" of a pen hitting wood and a heavy door slam.
5. Clip 5 (24:00 - 30:00): Tự do trí tuệ rực rỡ
Prompt: Adam running down the Oxford streets, a look of pure joy. He has survived the last meaningless formality. He is now truly free to think and create. Fade to black.
Kỹ thuật: Lens: 35mm Tracking shot. Lighting: Radiant, hopeful golden hour light (3000K). Sound: Triumphant orchestral swell with heavy drum beat."""

new_content = new_content.replace(v20_bad, v20_good)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
