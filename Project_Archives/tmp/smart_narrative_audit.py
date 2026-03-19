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

def get_narrative_content(content):
    # Extract only the 50 pages of narrative
    # Start after '#### Trang 1:' and end before the final '---' or typical footer
    try:
        start_idx = content.index("#### Trang 1:")
        # Find the LAST marker of a page or the end of the 50th page
        end_marker = "---"
        potential_ends = [i.start() for i in re.finditer(r'---', content)]
        # We want the '---' that comes AFTER the narrative
        end_idx = len(content)
        for e in potential_ends:
            if e > start_idx + 1000: # Heuristic: narrative is at least 1k chars
                end_idx = e
                break
        return content[start_idx:end_idx]
    except ValueError:
        return content # Fallback

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
    report.append("🔍 SIÊU KIỂM TOÁN NỘI DUNG NARRATIVE (SMART AUDIT)")
    report.append("Mục tiêu: Tập trung kiểm tra 100% tính duy nhất của PHẦN KỂ CHUYỆN (NARRATIVE)")
    report.append("Loại trừ: Header/Tutorial (vốn lặp lại có chủ đích)")
    report.append("==============================================================================\n")

    global_para_hashes = {}
    total_dups_cross = 0
    total_dups_internal = 0
    
    for file_path in all_files:
        filename = os.path.basename(file_path)
        folder_id = filename[:2]
        
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            full_content = f.read()
        
        narrative = get_narrative_content(full_content)
        paras = get_paragraphs(narrative)
        
        # 1. Legitimacy check (on full content to include footer tags)
        reqs = TOPIC_REQUIREMENTS.get(folder_id, [])
        found_reqs = [r for r in reqs if r.lower() in full_content.lower()]
        legit_score = (len(found_reqs) / len(reqs)) * 100 if reqs else 100
        
        # 2. Historical check
        context_score = 100 if any(c.lower() in full_content.lower() for c in VALID_HISTORICAL_CONTEXT) else 0
        
        file_dups_internal = 0
        file_dups_cross = 0
        internal_hashes = set()
        
        for p in paras:
            p_hash = hashlib.md5(p.encode('utf-8')).hexdigest()
            # Cross check
            if p_hash in global_para_hashes:
                file_dups_cross += 1
                total_dups_cross += 1
            else:
                global_para_hashes[p_hash] = filename
            
            # Internal check
            if p_hash in internal_hashes:
                file_dups_internal += 1
                total_dups_internal += 1
            else:
                internal_hashes.add(p_hash)

        status = "✅ HOÀN HẢO"
        if legit_score < 70 or context_score == 0 or file_dups_internal > 0 or file_dups_cross > 0:
            status = "❌ CẦN ĐIỀU CHỈNH"

        report.append(f"--- FILE: {filename} ---")
        report.append(f"   - Trạng thái: {status}")
        report.append(f"   - Độ khớp chủ đề (Legit): {legit_score:.1f}%")
        report.append(f"   - Bối cảnh lịch sử: {'Đúng' if context_score == 100 else 'Thiếu'}")
        report.append(f"   - Trùng lặp nội bộ (Narrative): {file_dups_internal}")
        report.append(f"   - Trùng lặp chéo (Narrative): {file_dups_cross}")
        report.append("")

    report.append("\n" + "="*80)
    report.append("📊 TỔNG KẾT KIỂM TOÁN NARRATIVE TOÀN CỰC")
    report.append(f"- Tổng số file: {len(all_files)}")
    report.append(f"- Tổng đoạn văn Narrative độc nhất: {len(global_para_hashes)}")
    report.append(f"- Tổng vi phạm Trùng lặp chéo: {total_dups_cross}")
    report.append(f"- Tổng vi phạm Trùng lặp nội bộ: {total_dups_internal}")
    report.append("Hệ thống đạt chuẩn 'Absolute Maximum' khi Trùng lặp = 0 và Legit = 100%.")
    report.append("="*80)

    report_path = r"d:\nietzsche-chronicle\tmp\smart_narrative_audit.txt"
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(report))
    
    print(f"Smart Audit completed. Report: {report_path}")

if __name__ == "__main__":
    audit_archives()
