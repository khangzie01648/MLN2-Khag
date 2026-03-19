# -*- coding: utf-8 -*-
import os
import re
import hashlib
import collections

# CONFIGURATION
BASE_DIR = r"d:\nietzsche-chronicle\Adam_Smith_Archives_VN"
FOLDERS = [
    "01_Biography_Neurons",
    "02_Kinh_Te_Thinh_Vuong_Neurons",
    "03_Dao_Duc_Triet_Hoc_Neurons",
    "04_Phap_Ly_Chinh_Tri_Neurons",
    "05_Khoa_Hoc_Van_Chuong_Neurons",
    "06_Dao_Duc_He_Thong_Neurons",
    "07_Nghe_Thuat_Di_San_Neurons"
]

# TOPIC KEYWORDS FOR LEGITIMACY CHECK
TOPIC_REQUIREMENTS = {
    "01": ["Smith", "Kirkcaldy", "Glasgow", "Oxford", "Hume", "Tiểu sử", "Cuộc đời"],
    "02": ["Giá trị", "Lao động", "Thị trường", "Vốn", "Tự do", "Kinh tế", "Wealth of Nations"],
    "03": ["Cảm thông", "Đạo đức", "Sympathy", "Moral Sentiments", "Spectator", "Lương tâm"],
    "04": ["Công lý", "Pháp luật", "Chính trị", "Nhà nước", "Quyền lực", "Tự do"],
    "05": ["Thiên văn", "Tu từ", "Văn chương", "Khoa học", "Triết học", "Hệ thống"],
    "06": ["Đức hạnh", "Hệ thống", "Đạo đức", "Stoics", "Tiêu chuẩn", "Hành vi"],
    "07": ["Di sản", "Lưu trữ", "Lịch sử", "Archives", "Vĩnh cửu", "Nghệ thuật"]
}

VALID_HISTORICAL_CONTEXT = ["Thế kỷ 18", "18th Century", "Khai sáng", "Enlightenment", "1723", "1790"]

def get_paragraphs(content):
    # Filter out headers and short meta lines
    paras = [p.strip() for p in content.split('\n\n') if len(p.strip()) > 100]
    return paras

def audit_archives():
    all_files = []
    for folder in FOLDERS:
        folder_path = os.path.join(BASE_DIR, folder)
        if os.path.exists(folder_path):
            files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.md')]
            all_files.extend(files)

    report = []
    report.append("==============================================================================")
    report.append("🔍 SIÊU KIỂM TOÁN TỔNG THỂ: CHẤT LƯỢNG NỘI DUNG TUYỆT ĐỐI (ULTIMATE AUDIT)")
    report.append("Mục tiêu: Đúng Chủ Đề, Chính Tả, Ngữ Cảnh, Legit, 100% Unique (Internal/Cross)")
    report.append("==============================================================================\n")

    # For cross-file duplication
    global_para_hashes = {} # hash -> filename
    
    total_dups_cross = 0
    total_dups_internal = 0
    total_legit_errors = 0
    
    for file_path in all_files:
        filename = os.path.basename(file_path)
        folder_id = filename[:2]
        file_report = [f"\n--- FILE: {filename} ---"]
        
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            content = f.read()

        # 1. Subject & Legitimacy Check
        reqs = TOPIC_REQUIREMENTS.get(folder_id, [])
        found_reqs = [r for r in reqs if r.lower() in content.lower()]
        legit_score = (len(found_reqs) / len(reqs)) * 100 if reqs else 100
        
        # 2. Historical Context Check
        context_score = 100 if any(c.lower() in content.lower() for c in VALID_HISTORICAL_CONTEXT) else 0
        
        # 3. Spelling & Template Check (Generic placeholders)
        template_residues = re.findall(r'\{.*?\}', content)
        
        # 4. Internal Duplication (Page by Page)
        pages = re.split(r'#### Trang \d+:', content)
        pages = [p.strip() for p in pages if len(p.strip()) > 500] # Ignore header/footer
        
        internal_para_hashes = collections.defaultdict(list)
        file_dups_internal = 0
        
        paragraphs = get_paragraphs(content)
        for i, para in enumerate(paragraphs):
            p_hash = hashlib.md5(para.encode('utf-8')).hexdigest()
            
            # Cross-file check
            if p_hash in global_para_hashes:
                total_dups_cross += 1
                # Only log the first few cross-dups to avoid bloat
                if total_dups_cross < 10:
                    file_report.append(f"   ⚠️ TRÙNG LẶP CHÉO: Đoạn văn trùng với {global_para_hashes[p_hash]}")
            else:
                global_para_hashes[p_hash] = filename
            
            # Internal check
            internal_para_hashes[p_hash].append(i)
            if len(internal_para_hashes[p_hash]) > 1:
                file_dups_internal += 1
                total_dups_internal += 1

        # Assessment
        status = "✅ HOÀN HẢO"
        if legit_score < 70 or context_score == 0 or template_residues or file_dups_internal > 0:
            status = "❌ CẦN ĐIỀU CHỈNH"

        file_report.append(f"   - Trạng thái: {status}")
        file_report.append(f"   - Độ khớp chủ đề (Legit): {legit_score:.1f}%")
        file_report.append(f"   - Bối cảnh lịch sử: {'Đúng' if context_score == 100 else 'Sai/Thiếu'}")
        file_report.append(f"   - Lỗi template: {len(template_residues)}")
        file_report.append(f"   - Trùng lặp nội bộ: {file_dups_internal} đoạn")
        
        report.extend(file_report)

    # FINAL SUMMARY
    report.append("\n" + "="*80)
    report.append("📊 TỔNG KẾT KIỂM TOÁN TOÀN HỆ THỐNG")
    report.append(f"- Tổng số file kiểm tra: {len(all_files)}")
    report.append(f"- Tổng lỗi trùng lặp chéo: {total_dups_cross}")
    report.append(f"- Tổng lỗi trùng lặp nội bộ: {total_dups_internal}")
    report.append(f"- Tổng dung lượng tri thức: {len(global_para_hashes)} đoạn văn độc bản")
    report.append("XÁC NHẬN: Hệ thống Archives đạt tiêu chuẩn 'Absolute Maximum Data Edition' nếu các chỉ số trên đều là 0.")
    report.append("="*80)

    report_path = r"d:\nietzsche-chronicle\tmp\ultimate_audit_report.txt"
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(report))
    
    print(f"Audit completed. Report saved to: {report_path}")

if __name__ == "__main__":
    audit_archives()
