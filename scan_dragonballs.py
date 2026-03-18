import os
import re

base_dir = r'd:\nietzsche-chronicle'
folders = [
    "01_Biography_Neurons",
    "02_Kinh_Te_Thinh_Vuong_Neurons",
    "03_Dao_Duc_Triet_Hoc_Neurons",
    "04_Phap_Ly_Chinh_Tri_Neurons",
    "05_Khoa_Hoc_Van_Chuong_Neurons",
    "06_Dao_Duc_He_Thong_Neurons",
    "07_Nghe_Thuat_Di_San_Neurons"
]

report = "# 🐉 DRAGON BALL & NEURON MAPPING REPORT\n\n"
report += "**Mô tả:** Báo cáo xác thực ánh xạ giữa 7 viên ngọc rồng và 50 icons (Neurons) trong từng tập hồ sơ.\n\n"

for i, folder in enumerate(folders):
    cat_id = folder.split('_')[0]
    folder_path = os.path.join(base_dir, folder)
    report += f"## 🔮 Trụ Cột {cat_id}: {folder.replace('_', ' ')}\n\n"
    
    if not os.path.exists(folder_path):
        report += "❌ **Thư mục không tồn tại!**\n\n"
        continue
        
    files = sorted([f for f in os.listdir(folder_path) if f.endswith('.md') and 'Prompts' not in f])
    
    report += "| Ngọc Rồng | Tập Hồ Sơ (.md) | Số Trang (Icons) | Trạng Thái |\n"
    report += "|:---------:|:----------------|:----------------:|:----------:|\n"
    
    for idx, filename in enumerate(files):
        if idx >= 7: break # Chỉ lấy 7 file tương ứng 7 ngọc rồng
        
        filepath = os.path.join(folder_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        pages = re.findall(r'####\s+Trang\s+\d+:', content)
        page_count = len(pages)
        star_count = idx + 1
        
        status = "✅ OK" if page_count == 50 else "⚠️ Kiểm tra"
        report += f"| {star_count} ⭐ | `{filename}` | {page_count} | {status} |\n"
        
    report += "\n---\n"

# Ghi ra file báo cáo
out_path = r'C:\Users\Admin\.gemini\antigravity\brain\c4c9de9d-28dc-45c5-9ca9-409a376fce77\dragon_ball_neuron_sync_report.md'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(report)

print(f"Report saved to: {out_path}")
