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

all_data = {}

for folder in folders:
    folder_path = os.path.join(base_dir, folder)
    if not os.path.exists(folder_path):
        continue
    
    files = sorted([f for f in os.listdir(folder_path) if f.endswith('.md') and 'Prompts' not in f])
    pillar_data = []
    for f_name in files:
        if not (f_name.startswith('01') or f_name.startswith('02') or f_name.startswith('03') or 
                f_name.startswith('04') or f_name.startswith('05') or f_name.startswith('06') or f_name.startswith('07')):
            continue
            
        f_path = os.path.join(folder_path, f_name)
        with open(f_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Get overall title (H1)
        title_match = re.search(r'^#\s+(.*)', content, re.MULTILINE)
        title = title_match.group(1) if title_match else f_name
        
        # Get pages
        pages = re.findall(r'#### Trang (\d+):\s+(.*)', content)
        pillar_data.append({
            'filename': f_name,
            'title': title,
            'page_count': len(pages),
            'page_titles': [p[1] for p in pages]
        })
    all_data[folder] = pillar_data

# Generate Report
report = "# 🐉 BÁO CÁO QUY HOẠCH NGỌC RỒNG & 50 KINH VĂN (NEURONS)\n\n"

for folder, data in all_data.items():
    report += f"## 🏛️ Trụ cột: {folder}\n\n"
    for idx, item in enumerate(data):
        star = idx + 1
        status = "✅ ĐỦ 50 TRANG" if item['page_count'] == 50 else f"❌ THIẾU ({item['page_count']}/50)"
        report += f"### {star} ⭐ Dragon Ball (nr{star}sao)\n"
        report += f"- **File tương ứng:** `{item['filename']}`\n"
        report += f"- **Chủ đề chính:** {item['title']}\n"
        report += f"- **Trạng thái:** {status}\n"
        if item['page_count'] > 0:
            report += "- **Danh sách 50 trang/icon:**\n"
            for p_idx, p_title in enumerate(item['page_titles']):
                report += f"  {p_idx+1}. {p_title}\n"
        report += "\n"
    report += "---\n\n"

with open(os.path.join(base_dir, 'full_dragonball_neuron_report.md'), 'w', encoding='utf-8') as f:
    f.write(report)

print("Scan complete. Report saved to full_dragonball_neuron_report.md")
