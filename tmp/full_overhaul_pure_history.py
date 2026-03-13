
import re
import os

def generate_pure_history_prompts(source_path, target_path, neuron_num, period):
    if not os.path.exists(source_path):
        print(f"Skipping: {source_path} not found")
        return
        
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()

    pages = re.split(r'#### Trang ', content)[1:]
    
    video_blocks = []
    header = f"""# 🎬 HOLLYWOOD x1000 PROMPTS: THE ADAM SMITH ARCHIVES
## [BẢN LỊCH SỬ THUẦN TÚY — CINEMATIC REALISM]
### DỰ ÁN: TRỰC QUAN HÓA CUỘC ĐỜI ADAM SMITH (NEURON {neuron_num}) ({period})

---
"""

    for page_content in pages:
        lines = page_content.split('\n')
        header_line = lines[0]
        match = re.match(r'(\d+): (.*)', header_line)
        if not match: continue
        
        num = match.group(1).zfill(2)
        title = match.group(2).upper()
        
        block = f"""VIDEO {num}: {title} (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: Tái hiện chân thực bối cảnh {title} tại Scotland thế kỷ 18.
1. Clip 1 (00:00 - 06:00): Thiết lập bối cảnh thị trấn/địa danh
Prompt: A wide cinematic establishing shot of the location for {title} in 18th-century Scotland. Authentic stone architecture with slate roofs, cobblestone streets, and the atmospheric mist of the era. Smoke rises slowly from chimneys into a cold, grey sky.
Kỹ thuật: Lens: 24mm Wide-angle. Lighting: Natural blue-hour light, moody and atmospheric. Sound: Distant environmental sounds and the sea breeze.
2. Clip 2 (06:00 - 12:00): Không gian bên trong và chi tiết thời đại
Prompt: Interior of an 18th-century Scottish space related to {title}. Dimly lit by a flickering fireplace and beeswax candles. Period-accurate wooden furniture, rough stone walls, and the heavy atmosphere of anticipation.
Kỹ thuật: Lens: 35mm Prime. Lighting: Cold window light mixing with warm firelight (Chiaroscuro). Sound: Crackling fire, soft floorboard creaks.
3. Clip 3 (12:00 - 18:00): Trọng tâm con người và cảm xúc thô
Prompt: A tight close-up shot of Adam Smith or key figures involved in {title}. Focus on raw emotion and intellectual intensity. Details of weathered skin, fine hair, and the simple linen attire of the era.
Kỹ thuật: Lens: 50mm Macro. Lighting: Soft candlelight hitting the side of the face. Sound: Resonant ambient silence or subtle breathing.
4. Clip 4 (18:00 - 24:00): Sự tương tác và kết nối con người
Prompt: A medium shot showing the human connection in {title}. People in authentic 18th-century attire interacting. Focused on the simplicity of the moment and the texture of the era.
Kỹ thuật: Lens: 35mm. Lighting: Natural, soft window light. Sound: Soft whispers or the gentle rustle of fabric.
5. Clip 5 (24:00 - 30:00): Biểu tượng của sự khởi đầu và di sản
Prompt: A majestic closing shot. Morning sun breaking through the mist over the landscape. A quill pen and a stack of blank parchment on a wooden table catch the first light. Fade to black with elegant text.
Kỹ thuật: Camera: Slow cinematic pan. Lighting: Bright morning sunlight (5500K). Sound: Peaceful orchestral swell (strings and flute).

---
"""
        video_blocks.append(block)

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(header + "\n" + "\n".join(video_blocks))
    print(f"Successfully generated: {target_path}")

base_dir = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons'
tasks = [
    ('01_Khoi_Nguon_Tho_Au_va_Hoc_Nghe_1723_1737.md', '01_Adam_Smith_Full_250_Prompts_FINAL.md', "01", "1723-1737"),
    ('02_Hanh_Trinh_Tai_Oxford_va_Su_Co_Doc_Tri_Tue_1737_1746.md', '02_Adam_Smith_Full_250_Prompts_FINAL.md', "02", "1737-1746"),
    ('03_Cuoc_Cach_Mang_Tu_Tuong_tai_Edinburgh_1746_1751.md', '03_Adam_Smith_Full_250_Prompts_FINAL.md', "03", "1746-1751"),
    ('04_Thanh_Tuu_Ruc_Ro_tai_Dai_hoc_Glasgow_1751_1764.md', '04_Adam_Smith_Full_250_Prompts_FINAL.md', "04", "1751-1764"),
    ('05_Chuyen_Du_Hanh_Chau_Au_va_Su_Mo_Mang_Tam_Nhin_1764_1766.md', '05_Adam_Smith_Full_250_Prompts_FINAL.md', "05", "1764-1766"),
    ('06_Thap_Ky_An_Tu_Kirkcaldy_Kien_Tao_Quoc_Phu_Luan_1766_1776.md', '06_Adam_Smith_Full_250_Prompts_FINAL.md', "06", "1766-1776"),
    ('07_Cuoi_Doi_Di_San_Vinh_Cuu_tai_Edinburgh_1778_1790.md', '07_Adam_Smith_Full_250_Prompts_FINAL.md', "07", "1778-1790")
]

for src, tgt, n_num, period in tasks:
    generate_pure_history_prompts(os.path.join(base_dir, src), os.path.join(base_dir, tgt), n_num, period)
