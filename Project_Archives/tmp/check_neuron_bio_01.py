# -*- coding: utf-8 -*-
import os
import collections

def check_neuron(path, report_path):
    if not os.path.exists(path):
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(f"File not found: {path}")
        return

    size = os.path.getsize(path)
    report = []
    report.append(f"--- BÁO CÁO KIỂM TRA NEURON TIỂU SỬ 01 ---")
    report.append(f"Kích thước file: {size/1024:.2f} KB")

    with open(path, 'r', encoding='utf-8-sig') as f:
        content = f.read()

    # Check number of pages
    page_count = content.count('#### Trang')
    report.append(f"Số lượng trang: {page_count}")

    # Check for duplicate paragraphs/lines
    lines = [l.strip() for l in content.split('\n') if len(l.strip()) > 100]
    counter = collections.Counter(lines)
    dups = [item for item, count in counter.items() if count > 1]

    report.append(f"Số lượng đoạn văn trùng lặp (>100 ký tự): {len(dups)}")
    
    # Check for template markers
    template_errors = ["{0}", "{1}", "{2}", "{topic}", "{title}"]
    found_errors = [m for m in template_errors if m in content]
    report.append(f"Dấu vết template lỗi: {'CÓ' if found_errors else 'KHÔNG'}")

    # Check keywords
    narrative_keys = ["Smith", "Kirkcaldy", "thơ ấu", "mẹ", "thấu cảm"]
    found_keys = [k for k in narrative_keys if k.lower() in content.lower()]
    report.append(f"Từ khóa chủ đề: {', '.join(found_keys)}")

    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(report))

path_to_check = r"d:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\01_Khoi_Nguon_Tho_Au_va_Hoc_Nghe_1723_1737.md"
report_file = r"d:\nietzsche-chronicle\tmp\check_result_bio_01.txt"
check_neuron(path_to_check, report_file)
print("Check completed.")
