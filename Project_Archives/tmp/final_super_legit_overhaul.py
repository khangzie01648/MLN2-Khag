
import re
import os

def generate_super_legit_edition(source_path, target_path, neuron_num, period):
    if not os.path.exists(source_path):
        print(f"Skipping: {source_path} not found")
        return
        
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Tách các trang dựa trên #### Trang XX
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
        # Tìm tiêu đề trang
        match = re.match(r'(\d+): (.*)', header_line)
        if not match: continue
        
        num = match.group(1).zfill(2)
        title = match.group(2).upper()
        
        # Phân tích nội dung trang để lấy dữ liệu thực
        body_text = " ".join(lines[1:]).strip()
        body_clean = re.sub(r'[^\w\s]', '', body_text)
        
        # Nhặt các từ khóa là tên riêng hoặc thuật ngữ quan trọng (viết hoa chữ cái đầu)
        entities = sorted(list(set(re.findall(r'\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b', body_text))))
        # Lọc bỏ các từ chung chung nếu cần, nhưng ở đây ta lấy top 5 để đưa vào Prompt
        keywords = ", ".join(entities[:6]) if entities else "Scotland, 18th Century"

        # Cắt snippet nội dung chính xác để đưa vào dòng "Nội dung"
        content_snippet = body_text[:250].replace('\n', ' ') + "..."

        block = f"""VIDEO {num}: {title} (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: [Dữ liệu gốc] {content_snippet}
1. Clip 1 (00:00 - 06:00): Bối cảnh địa danh lịch sử thực tế
Prompt: A breathtaking 8K cinematic wide shot of the historical location for {title}. Noticeable historical markers: {keywords}. Authentic stone architecture, heavy mist, and the atmospheric grey sky of 18th-century Scotland.
Kỹ thuật: Lens: 24mm Anamorphic. Lighting: Natural blue-hour light. Sound: Period-accurate environmental atmosphere.
2. Clip 2 (06:00 - 12:00): Không gian nội thất và vật dụng tư liệu
Prompt: Interior shot of a room related to {title}. Focus on specific period objects: quill pens, thick manuscripts, and heavy oak furniture. Dimly lit by beeswax candles and a dying fire.
Kỹ thuật: Lens: 35mm Prime. Lighting: Chiaroscuro (firelight & shadows). Sound: Crackling wood and floorboard creaks.
3. Clip 3 (12:00 - 18:00): Đặc tả nhân vật - Trọng tâm cảm xúc
Prompt: An extreme close-up of the individuals involved in {title}. Focus on the raw intellectual intensity in their eyes. We see every skin pore, fine hair, and the texture of simple linen clothing.
Kỹ thuật: Lens: 50mm Macro. Lighting: Soft candlelight hitting the side of the face. Sound: Focused, resonant ambient silence.
4. Clip 4 (18:00 - 24:00): Hành động tương tác xã hội thời đại
Prompt: A medium shot showing the human connection and interaction as described in the {title} records. Authentic 18th-century attire and natural movements. Pure historical realism without digital effects.
Kỹ thuật: Lens: 35mm. Lighting: Natural window light. Sound: Gentle rustle of fabric or soft whispers.
5. Clip 5 (24:00 - 30:00): Biểu tượng khởi đầu và di sản vĩnh cửu
Prompt: A majestic closing shot panning across the landscape or a desk filled with writings. The morning sun breaks through the mist, symbolizing the birth of a new idea. Fade to black with elegant archival text.
Kỹ thuật: Camera: Slow cinematic pan. Lighting: Bright morning sunlight (5500K). Sound: Peaceful orchestral swell.

---
"""
        video_blocks.append(block)

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(header + "\n" + "\n".join(video_blocks))
    print(f"Optimized: {target_path}")

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
    generate_super_legit_edition(os.path.join(base_dir, src), os.path.join(base_dir, tgt), n_num, period)
