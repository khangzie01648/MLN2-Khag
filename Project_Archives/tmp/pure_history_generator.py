
import re
import os

def generate_pure_history_prompts(source_path, target_path, neuron_num, period):
    if not os.path.exists(source_path): return
    with open(source_path, 'r', encoding='utf-8') as f: content = f.read()

    # Tìm các trang và nội dung chi tiết của trang đó
    # Giả sử cấu trúc source có: #### Trang X: Tiêu đề và sau đó là nội dung mô tả
    pages = re.split(r'#### Trang ', content)[1:]
    
    video_blocks = []
    header = f"""# 🎬 HOLLYWOOD x1000 PROMPTS: THE ADAM SMITH ARCHIVES
## [BẢN LỊCH SỬ THUẦN TÚY — CINEMATIC REALISM]
### DỰ ÁN: TRỰC QUAN HÓA CUỘC ĐỜI ADAM SMITH (NEURON {neuron_num}) ({period})

---
"""

    for page_content in pages:
        lines = page_content.split('\n')
        header_line = lines[0] # "01: Tiêu đề..."
        match = re.match(r'(\d+): (.*)', header_line)
        if not match: continue
        
        num = match.group(1).zfill(2)
        title = match.group(2).upper()
        
        # Lấy một chút nội dung thực tế để làm giàu Prompt
        context = " ".join(lines[1:5]).strip()[:200] 

        block = f"""VIDEO {num}: {title} (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: Tái hiện chân thực bối cảnh {title} tại Scotland thế kỷ 18.
1. Clip 1 (00:00 - 06:00): Thiết lập bối cảnh lịch sử
Prompt: A wide cinematic establishing shot of 18th-century Scotland during the {title} period. Authentic stone architecture, period-accurate streets, and atmospheric weather. No digital effects, pure historical realism.
Kỹ thuật: Lens: 24mm Wide-angle. Lighting: Natural daylight, soft and diffused. Sound: Period-accurate environmental sounds.
2. Clip 2 (06:00 - 12:00): Chi tiết vật liệu và không gian
Prompt: A tight shot focusing on the tactile textures of the era - rough-hewn wood, handwritten parchment, or the cold stone of library walls. We see the dust motes in natural light beams.
Kỹ thuật: Lens: 35mm Prime. Lighting: Firelight or window light (Chiaroscuro). Sound: Tactile interaction sounds.
3. Clip 3 (12:00 - 18:00): Trọng tâm con người và cảm xúc
Prompt: A close-up of Adam Smith or key figures involved in {title}. Focus on the raw intellectual intensity and period-accurate clothing textures. Every skin pore and fabric fiber visible.
Kỹ thuật: Lens: 50mm Macro. Lighting: Soft side-lighting. Sound: Focused breathing or subtle ambient silence.
4. Clip 4 (18:00 - 24:00): Hành động và sự tương tác xã hội
Prompt: A medium shot showing the dynamic of the historical moment. People interacting in 18th-century attire. The movement is natural, capturing the essence of the era's social fabric.
Kỹ thuật: Lens: 35mm. Lighting: Natural atmosphere. Sound: Distant chatter or rhythmic movements.
5. Clip 5 (24:00 - 30:00): Biểu tượng khởi đầu và di sản
Prompt: A majestic closing shot. The morning sun breaking through the mist over the Scottish landscape. Symbols of knowledge like a stack of manuscripts catching the light. Fade to black.
Kỹ thuật: Camera: Cinematic slow pan. Lighting: Bright morning sun (5500K). Sound: Orchestral swell ending peacefully.

---
"""
        video_blocks.append(block)

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(header + "\n" + "\n".join(video_blocks))

# Thử nghiệm lại Neuron 03 với phong cách PURE HISTORY
generate_pure_history_prompts(
    r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\03_Cuoc_Cach_Mang_Tu_Tuong_tai_Edinburgh_1746_1751.md',
    r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\03_Adam_Smith_Full_250_Prompts_FINAL.md',
    "03",
    "1746-1751"
)
