
import re
import os

def generate_super_legit_prompts(source_path, target_path, neuron_num, period):
    if not os.path.exists(source_path): return
    with open(source_path, 'r', encoding='utf-8') as f: content = f.read()

    # Tách từng trang dựa trên dấu hiệu #### Trang XX
    pages = re.split(r'#### Trang ', content)[1:]
    
    video_blocks = []
    header = f"""# 🎬 HOLLYWOOD x1000 PROMPTS: THE ADAM SMITH ARCHIVES
## [BẢN LỊCH SỬ THUẦN TÚY — SIÊU CHI TIẾT ĐỐI CHIẾU NGUỒN]
### DỰ ÁN: TRỰC QUAN HÓA CUỘC ĐỜI ADAM SMITH (NEURON {neuron_num}) ({period})

---
"""

    for page_content in pages:
        lines = page_content.split('\n')
        header_line = lines[0].strip()
        match = re.match(r'(\d+): (.*)', header_line)
        if not match: continue
        
        num = match.group(1).zfill(2)
        title = match.group(2).upper()
        
        # Đọc nội dung thực tế để tìm từ khóa "đắt"
        body_text = " ".join(lines[1:]).strip()
        
        # Phân tích sơ bộ để lấy các chi tiết thực tế (ví dụ tìm các tên riêng hoặc địa danh)
        # Ở đây tôi sẽ demo cách chèn từ khóa thực từ body vào prompt
        keywords = " ".join(re.findall(r'[A-Z][a-z]+', body_text)[:5]) # Lấy vài danh từ riêng

        block = f"""VIDEO {num}: {title} (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: Trích xuất từ tư liệu gốc về {title}. {body_text[:150]}...
1. Clip 1 (00:00 - 06:00): Bối cảnh thực tế lịch sử
Prompt: A cinematic 8K wide shot of the historical setting for {title}. Noticeable elements: {keywords}. Authentic 18th-century textures, heavy Scottish mist, and period-accurate architecture.
Kỹ thuật: Lens: 24mm Anamorphic. Lighting: Natural light. Sound: Period ambient.
2. Clip 2 (06:00 - 12:00): Chi tiết vật dụng trong tư liệu
Prompt: An extreme close-up of objects mentioned or relevant to this event. Tactile focus on handwriting, weathered tools, or 18th-century materials.
Kỹ thuật: Lens: 100mm Macro. Lighting: Side-lit shadows.
3. Clip 3 (12:00 - 18:00): Đặc tả nhân vật chính
Prompt: Close-up on the individual involved in {title}. Focus on the expression that matches the emotional tone of the source text.
Kỹ thuật: Lens: 85mm Prime. Lighting: Rembrandt lighting.
4. Clip 4 (18:00 - 24:00): Hành động cụ thể
Prompt: A medium shot showing the interaction described in the archives. No digital fluff, just raw historical action.
Kỹ thuật: Lens: 35mm. Lighting: Naturalistic.
5. Clip 5 (24:00 - 30:00): Kết thúc mang tính biểu tượng
Prompt: A wide shot fading out, symbolizing the long-term impact of this specific moment in Smith's life.
Kỹ thuật: Camera: Slow pull-back. Sound: Orchestral swell.

---
"""
        video_blocks.append(block)

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(header + "\n" + "\n".join(video_blocks))

# Áp dụng thử nghiệm cho File 01 để đảm bảo "SIÊU LEGIT"
generate_super_legit_prompts(
    r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\01_Khoi_Nguon_Tho_Au_va_Hoc_Nghe_1723_1737.md',
    r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\01_Adam_Smith_Full_250_Prompts_FINAL.md',
    "01",
    "1723-1737"
)
