
import re
import os

# Danh sách các từ tiếng Việt viết hoa hay bị nhầm là tên riêng
STOP_WORDS = {'Anh', 'Ông', 'Bà', 'Cô', 'Gia', 'Đình', 'Nhà', 'Người', 'Sự', 'Và', 'Tại', 'Trong', 'Những', 'Để', 'Từ', 'Với', 'Một', 'Khi', 'Nhưng', 'Đã', 'Đang', 'Sẽ', 'Thế', 'Kỷ', 'Thời', 'Đại'}

def refine_and_check(file_path):
    if not os.path.exists(file_path): return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Đảm bảo Adam Smith luôn được nhắc đến rõ ràng
    # Thay thế "individuals involved in" bằng "Adam Smith and individuals involved in" 
    # để AI luôn bám sát nhân vật chính.
    content = content.replace("individuals involved in", "Adam Smith and key figures involved in")
    
    # 2. Làm sạch các Keywords rác
    def clean_keywords(match):
        kws = match.group(1).split(', ')
        cleaned = [w for w in kws if w not in STOP_WORDS and len(w) > 2]
        # Luôn ưu tiên đưa Adam Smith vào đầu danh sách keywords nếu chưa có
        if "Adam Smith" not in cleaned:
            cleaned.insert(0, "Adam Smith")
        return f"Noticeable historical markers: {', '.join(cleaned[:5])}"

    content = re.sub(r'Noticeable historical markers: (.*)', clean_keywords, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

base_dir = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons'
for i in range(1, 8):
    fname = f"0{i}_Adam_Smith_Full_250_Prompts_FINAL.md"
    fpath = os.path.join(base_dir, fname)
    if os.path.exists(fpath):
        refine_and_check(fpath)
        print(f"Audited & Fixed: {fname}")
