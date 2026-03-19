
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

# Execution for Neuron 03
result = generate_prompts_from_source(
    r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\03_Cuoc_Cach_Mang_Tu_Tuong_tai_Edinburgh_1746_1751.md',
    r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\03_Adam_Smith_Full_250_Prompts_FINAL.md',
    "03",
    "1746-1751"
)
print(result)

# Execution for Neuron 04
result = generate_prompts_from_source(
    r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\04_Thanh_Tuu_Ruc_Ro_tai_Dai_hoc_Glasgow_1751_1764.md',
    r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\04_Adam_Smith_Full_250_Prompts_FINAL.md',
    "04",
    "1751-1764"
)
print(result)
