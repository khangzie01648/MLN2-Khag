import os
import re

base_dir = r'd:\nietzsche-chronicle'
folders = [
    ("01", "Biographical Neurons (Tiểu sử)", "01_Biography_Neurons"),
    ("02", "Economic Neurons (Kinh tế)", "02_Kinh_Te_Thinh_Vuong_Neurons"),
    ("03", "Ethics Neurons (Đạo đức)", "03_Dao_Duc_Triet_Hoc_Neurons"),
    ("04", "Political Neurons (Pháp lý)", "04_Phap_Ly_Chinh_Tri_Neurons"),
    ("05", "Science & Art Neurons (Khoa học & Văn chương)", "05_Khoa_Hoc_Van_Chuong_Neurons"),
    ("06", "Moral Systems Neurons (Đạo đức hệ thống)", "06_Dao_Duc_He_Thong_Neurons"),
    ("07", "Legacy Neurons (Nghệ thuật & Di sản)", "07_Nghe_Thuat_Di_San_Neurons")
]

report = "# 🌌 DANH MỤC TỔNG LỰC DỮ LIỆU: 7 CHỦ ĐỀ & 49 VIÊN NGỌC RỒNG\n\n"
report += ("Báo cáo này liệt kê toàn bộ 7 Trụ cột (Pillars), mỗi trụ cột gồm 7 Viên Ngọc Rồng (Stars) "
           "và danh sách 50 Chủ đề Neuron (Icon) tương ứng cho từng viên ngọc.\n\n")

for id_str, name, folder in folders:
    folder_path = os.path.join(base_dir, folder)
    report += f"## 🏛️ CHỦ ĐỀ {id_str}: {name}\n\n"
    
    if not os.path.exists(folder_path):
        report += "⚠️ Thư mục không tồn tại.\n\n---\n\n"
        continue
    
    files = sorted([f for f in os.listdir(folder_path) if f.endswith('.md') and 'Prompts' not in f])
    
    # Filter only 01 to 07 files
    valid_files = [f for f in files if any(f.startswith(f"0{i}") for i in range(1, 8))]
    
    for idx, f_name in enumerate(valid_files[:7]):
        star_count = idx + 1
        f_path = os.path.join(folder_path, f_name)
        
        with open(f_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Get overall title (H1)
        title_match = re.search(r'^#\s+(.*)', content, re.MULTILINE)
        file_title = title_match.group(1) if title_match else f_name
        
        # Get pages
        pages = re.findall(r'#### Trang (\d+):\s+(.*)', content)
        
        report += f"### {star_count} ⭐ Viên Ngọc {star_count} Sao (nr{star_count}sao)\n"
        report += f"- **📂 File:** `{f_name}`\n"
        report += f"- **🎭 Chủ đề:** {file_title}\n"
        report += f"- **🔢 Số lượng:** {len(pages)}/50 Neuron\n"
        report += "- **📍 Danh sách 50 chủ đề icons:**\n"
        
        # Group titles for cleaner look (10 per line or just a list)
        if pages:
            for p_idx, p_title in enumerate([p[1] for p in pages]):
                report += f"  {p_idx+1:02}. {p_title}\n"
        else:
            report += "  ⚠️ (Chưa tìm thấy dữ liệu cấu trúc #### Trang)\n"
        
        report += "\n"
    
    report += "---\n\n"

output_path = os.path.join(base_dir, 'MASTER_DRAGONBALL_INVENTORY.md')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(report)

print(f"Báo cáo tổng kết toàn diện đã được ghi vào: {output_path}")
