
import re
import os

def generate_prompts_from_source(source_path, target_path, neuron_num, period):
    if not os.path.exists(source_path):
        return f"Source {source_path} not found"
        
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract Page titles
    pages = re.findall(r'#### Trang (\d+): (.*)', content)
    
    header = f"""# 🎬 HOLLYWOOD x1000 PROMPTS: THE ADAM SMITH ARCHIVES
## [BẢN LỊCH SỬ THUẦN TÚY — CINEMATIC REALISM]
### DỰ ÁN: TRỰC QUAN HÓA CUỘC ĐỜI ADAM SMITH (NEURON {neuron_num}) ({period})

---
"""
    
    video_blocks = []
    
    for num, title in pages:
        video_title = f"VIDEO {num.zfill(2)}: {title.upper()} (ABSOLUTE MAXIMUM DATA EDITION)"
        summary = f"Tái hiện bối cảnh '{title}' với độ chi tiết 8K và phong cách điện ảnh đỉnh cao, tập trung vào diễn tiến tâm lý và tri thức của Adam Smith."
        
        block = f"""{video_title}
Nội dung: {summary}
1. Clip 1 (00:00 - 06:00): Khởi đầu bối cảnh - {title}
Prompt: A breathtaking 8K cinematic establishing shot of {title}. High-contrast lighting highlights the textures of 18th-century architecture and environment. Volumetric fog and dust motes dance in the air.
Kỹ thuật: Lens: 24mm Anamorphic. Lighting: Golden hour natural light (3500K). Sound: Binaural environmental atmosphere with deep cello undertones.
2. Clip 2 (06:00 - 12:00): Cận cảnh chi tiết và sự tương tác
Prompt: An extreme macro shot of hands interacting with symbols of {title}—ink on parchment or cold stone textures. We see the microscopic grain and fibers in 8K resolution.
Kỹ thuật: Lens: 100mm Macro. Lighting: Dramatic side-lighting (Rembrandt shadows). Sound: Tactile sounds of movement and materials.
3. Clip 3 (12:00 - 18:00): Biểu cảm và nội tâm vĩ nhân
Prompt: A tight close-up of Adam Smith's face, showing intense intellectual focus. His eyes reflect the flickering candlelight and the burning fire of curiosity within. Every skin pore visible.
Kỹ thuật: Lens: 85mm Prime. Lighting: Low-key cinematic lighting. Sound: A single, rhythmic heartbeat and focused silence.
4. Clip 4 (18:00 - 24:00): Hành động và sự chuyển dịch tri thức
Prompt: A medium shot showing the dynamic movement involved in {title}. High kinetic energy captured in slow-motion. The environment reacts realistically to the historical action.
Kỹ thuật: Lens: 50mm. Lighting: Dynamic, shifting shadows. Sound: Symphonic swell with rising violin layers.
5. Clip 5 (24:00 - 30:00): Kết thúc biểu tượng và tầm nhìn tương lai
Prompt: A majestic wide shot panning away from the scene as the sun sets or rises. A silhouette of Adam Smith stands tall against the horizon, symbolizing his eternal legacy. Fade to black.
Kỹ thuật: Camera: Majestic crane move. Lighting: Spectacular sky colors (2500K flare). Sound: A grand, final orchestral chord of destiny.

---
"""
        video_blocks.append(block)

    full_content = header + "\n" + "\n".join(video_blocks)
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    return f"Created {target_path} with {len(pages)} videos."

# Execution for Neurons 05, 06, 07
tasks = [
    ('05_Chuyen_Du_Hanh_Chau_Au_va_Su_Mo_Mang_Tam_Nhin_1764_1766.md', '05_Adam_Smith_Full_250_Prompts_FINAL.md', "05", "1764-1766"),
    ('06_Thap_Ky_An_Tu_Kirkcaldy_Kien_Tao_Quoc_Phu_Luan_1766_1776.md', '06_Adam_Smith_Full_250_Prompts_FINAL.md', "06", "1766-1776"),
    ('07_Cuoi_Doi_Di_San_Vinh_Cuu_tai_Edinburgh_1778_1790.md', '07_Adam_Smith_Full_250_Prompts_FINAL.md', "07", "1778-1790")
]

base_dir = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons'

for source, target, n_num, period in tasks:
    result = generate_prompts_from_source(
        os.path.join(base_dir, source),
        os.path.join(base_dir, target),
        n_num,
        period
    )
    print(result)
