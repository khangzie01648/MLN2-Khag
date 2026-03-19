import os
import re
import json
from collections import defaultdict

base_dir = r'd:\nietzsche-chronicle'
folders = [
    '01_Biography_Neurons',
    '02_Kinh_Te_Thinh_Vuong_Neurons',
    '03_Dao_Duc_Triet_Hoc_Neurons',
    '04_Phap_Ly_Chinh_Tri_Neurons',
    '05_Khoa_Hoc_Van_Chuong_Neurons',
    '06_Dao_Duc_He_Thong_Neurons',
    '07_Nghe_Thuat_Di_San_Neurons'
]

# Parse each .md file into pages
def parse_pages(filepath):
    """Extract pages from a .md file. Returns list of (page_num, title, content_hash, first_100_chars)"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by page markers "#### Trang X:"
    pages = re.split(r'####\s+Trang\s+(\d+):', content)
    result = []
    
    for i in range(1, len(pages), 2):
        page_num = int(pages[i])
        page_content = pages[i+1].strip() if i+1 < len(pages) else ""
        
        # Extract title (first line)
        lines = page_content.split('\n')
        title = lines[0].strip() if lines else ""
        
        # Get content without the padding blocks (just meaningful content)
        # Remove the repetitive padding
        meaningful = page_content[:500]  # First 500 chars as fingerprint
        
        result.append({
            'num': page_num,
            'title': title,
            'content_fingerprint': meaningful,
            'full_content': page_content,
            'content_length': len(page_content)
        })
    
    return result

# Collect all data
all_data = {}  # folder -> filename -> [pages]

for folder in folders:
    folder_path = os.path.join(base_dir, folder)
    if not os.path.exists(folder_path):
        continue
    
    all_data[folder] = {}
    for filename in sorted(os.listdir(folder_path)):
        if not filename.endswith('.md'):
            continue
        if 'Prompts_FINAL' in filename:
            continue
        
        filepath = os.path.join(folder_path, filename)
        pages = parse_pages(filepath)
        if pages:
            all_data[folder][filename] = pages

# === SCAN 1: Duplicates WITHIN a single file ===
scan1_results = []

for folder, files in all_data.items():
    for filename, pages in files.items():
        titles = [p['title'] for p in pages]
        fingerprints = [p['content_fingerprint'] for p in pages]
        
        # Check title duplicates
        title_counts = defaultdict(list)
        for i, t in enumerate(titles):
            title_counts[t].append(i+1)
        
        dup_titles = {t: nums for t, nums in title_counts.items() if len(nums) > 1}
        
        # Check content duplicates
        fp_counts = defaultdict(list)
        for i, fp in enumerate(fingerprints):
            fp_counts[fp].append(i+1)
        
        dup_contents = {fp[:80]: nums for fp, nums in fp_counts.items() if len(nums) > 1}
        
        if dup_titles or dup_contents:
            scan1_results.append({
                'folder': folder,
                'file': filename,
                'dup_titles': dup_titles,
                'dup_contents': dup_contents
            })

# === SCAN 2: Duplicates across files IN SAME FOLDER ===
scan2_results = []

for folder, files in all_data.items():
    # Build cross-file title index
    title_index = defaultdict(list)  # title -> [(file, page_num)]
    fp_index = defaultdict(list)
    
    for filename, pages in files.items():
        for p in pages:
            title_index[p['title']].append((filename, p['num']))
            fp_index[p['content_fingerprint']].append((filename, p['num']))
    
    # Find titles that appear in multiple files
    cross_title_dups = {t: locs for t, locs in title_index.items() 
                        if len(set(loc[0] for loc in locs)) > 1}
    
    cross_content_dups = {fp[:80]: locs for fp, locs in fp_index.items()
                          if len(set(loc[0] for loc in locs)) > 1}
    
    if cross_title_dups or cross_content_dups:
        scan2_results.append({
            'folder': folder,
            'dup_titles': cross_title_dups,
            'dup_contents': cross_content_dups
        })

# === SCAN 3: Duplicates across DIFFERENT FOLDERS ===
scan3_results = []

global_title_index = defaultdict(list)  # title -> [(folder, file, page_num)]
global_fp_index = defaultdict(list)

for folder, files in all_data.items():
    for filename, pages in files.items():
        for p in pages:
            global_title_index[p['title']].append((folder, filename, p['num']))
            global_fp_index[p['content_fingerprint']].append((folder, filename, p['num']))

cross_folder_title_dups = {t: locs for t, locs in global_title_index.items()
                           if len(set(loc[0] for loc in locs)) > 1}

cross_folder_content_dups = {fp[:80]: locs for fp, locs in global_fp_index.items()
                              if len(set(loc[0] for loc in locs)) > 1}

# === STATISTICS ===
total_files = sum(len(files) for files in all_data.values())
total_pages = sum(len(pages) for files in all_data.values() for pages in files.values())
total_folders = len(all_data)

# === Generate Report ===
report = f"""# 📋 BÁO CÁO SCAN TRÙNG LẶP NỘI DUNG — ADAM SMITH ARCHIVES

**Ngày scan:** 2026-03-18 11:11 (GMT+7)  
**Tổng số thư mục:** {total_folders}  
**Tổng số file .md:** {total_files}  
**Tổng số trang:** {total_pages}  

---

## 📁 Tổng Quan Cấu Trúc

"""

for folder, files in all_data.items():
    report += f"### 📂 {folder}\n"
    for filename, pages in files.items():
        report += f"- `{filename}` — **{len(pages)} trang**\n"
    report += "\n"

report += """---

## 🔍 SCAN 1: Trùng lặp TRONG CÙNG MỘT FILE

> Kiểm tra xem các trang (Trang 1-50) trong cùng một file .md có bị trùng tiêu đề hoặc nội dung không.

"""

if not scan1_results:
    report += "✅ **KHÔNG CÓ TRÙNG LẶP** — Tất cả các trang trong mỗi file đều có tiêu đề và nội dung khác nhau.\n\n"
else:
    for result in scan1_results:
        report += f"### ❌ `{result['folder']}/{result['file']}`\n\n"
        if result['dup_titles']:
            report += "**Tiêu đề trùng:**\n"
            for title, nums in result['dup_titles'].items():
                report += f"- \"{title[:80]}...\" → Trang {nums}\n"
        if result['dup_contents']:
            report += "**Nội dung trùng:**\n"
            for fp, nums in result['dup_contents'].items():
                report += f"- Nội dung giống nhau → Trang {nums}\n"
        report += "\n"

report += """---

## 🔍 SCAN 2: Trùng lặp GIỮA CÁC FILE TRONG CÙNG THƯ MỤC

> Kiểm tra xem các trang từ file .md khác nhau trong cùng folder có bị trùng tiêu đề hoặc nội dung không.

"""

if not scan2_results:
    report += "✅ **KHÔNG CÓ TRÙNG LẶP** — Tất cả các trang giữa các file trong cùng thư mục đều độc lập.\n\n"
else:
    for result in scan2_results:
        report += f"### ❌ Thư mục: `{result['folder']}`\n\n"
        if result['dup_titles']:
            report += f"**Tiêu đề trùng giữa các file ({len(result['dup_titles'])} trường hợp):**\n"
            count = 0
            for title, locs in result['dup_titles'].items():
                if count >= 10:
                    report += f"- ... và {len(result['dup_titles']) - 10} trường hợp khác\n"
                    break
                report += f"- \"{title[:80]}\" → "
                report += ", ".join([f"`{loc[0]}` Trang {loc[1]}" for loc in locs[:3]])
                if len(locs) > 3:
                    report += f" (+{len(locs)-3} nơi khác)"
                report += "\n"
                count += 1
        if result['dup_contents']:
            report += f"\n**Nội dung trùng giữa các file ({len(result['dup_contents'])} trường hợp):**\n"
            count = 0
            for fp, locs in result['dup_contents'].items():
                if count >= 10:
                    report += f"- ... và {len(result['dup_contents']) - 10} trường hợp khác\n"
                    break
                report += f"- Nội dung giống → "
                report += ", ".join([f"`{loc[0]}` Trang {loc[1]}" for loc in locs[:3]])
                if len(locs) > 3:
                    report += f" (+{len(locs)-3} nơi khác)"
                report += "\n"
                count += 1
        report += "\n"

report += """---

## 🔍 SCAN 3: Trùng lặp GIỮA CÁC THƯ MỤC KHÁC NHAU

> Kiểm tra xem các trang từ file .md ở thư mục khác nhau (02 vs 03, 04 vs 07, v.v.) có bị trùng tiêu đề hoặc nội dung không.

"""

if not cross_folder_title_dups and not cross_folder_content_dups:
    report += "✅ **KHÔNG CÓ TRÙNG LẶP** — Tất cả các trang giữa các thư mục đều hoàn toàn độc lập.\n\n"
else:
    if cross_folder_title_dups:
        report += f"### ❌ Tiêu đề trùng giữa các thư mục ({len(cross_folder_title_dups)} trường hợp)\n\n"
        count = 0
        for title, locs in cross_folder_title_dups.items():
            if count >= 15:
                report += f"- ... và {len(cross_folder_title_dups) - 15} trường hợp khác\n"
                break
            report += f"- \"{title[:80]}\" →\n"
            for loc in locs[:5]:
                report += f"  - `{loc[0]}/{loc[1]}` Trang {loc[2]}\n"
            if len(locs) > 5:
                report += f"  - (+{len(locs)-5} nơi khác)\n"
            count += 1
        report += "\n"
    
    if cross_folder_content_dups:
        report += f"### ❌ Nội dung trùng giữa các thư mục ({len(cross_folder_content_dups)} trường hợp)\n\n"
        count = 0
        for fp, locs in cross_folder_content_dups.items():
            if count >= 15:
                report += f"- ... và {len(cross_folder_content_dups) - 15} trường hợp khác\n"
                break
            report += f"- Nội dung giống →\n"
            for loc in locs[:5]:
                report += f"  - `{loc[0]}/{loc[1]}` Trang {loc[2]}\n"
            if len(locs) > 5:
                report += f"  - (+{len(locs)-5} nơi khác)\n"
            count += 1
        report += "\n"

report += """---

## 📊 TỔNG KẾT

"""

s1_status = "✅ PASS" if not scan1_results else f"❌ FAIL ({len(scan1_results)} file có trùng)"
s2_status = "✅ PASS" if not scan2_results else f"❌ FAIL ({len(scan2_results)} folder có trùng)"
s3_title_status = "✅ PASS" if not cross_folder_title_dups else f"❌ FAIL ({len(cross_folder_title_dups)} tiêu đề trùng)"
s3_content_status = "✅ PASS" if not cross_folder_content_dups else f"❌ FAIL ({len(cross_folder_content_dups)} nội dung trùng)"

report += f"""| Scan | Mô tả | Kết quả |
|:-----|:------|:--------|
| Scan 1 | Trùng trong cùng file | {s1_status} |
| Scan 2 | Trùng giữa file cùng folder | {s2_status} |
| Scan 3 (Tiêu đề) | Trùng tiêu đề khác folder | {s3_title_status} |
| Scan 3 (Nội dung) | Trùng nội dung khác folder | {s3_content_status} |
"""

# Save report
report_path = r'C:\Users\Admin\.gemini\antigravity\brain\c4c9de9d-28dc-45c5-9ca9-409a376fce77\content_duplication_scan_report.md'
with open(report_path, 'w', encoding='utf-8') as f:
    f.write(report)

print(f"Report saved to: {report_path}")
print(f"\n=== QUICK SUMMARY ===")
print(f"Total folders: {total_folders}")
print(f"Total files: {total_files}")
print(f"Total pages: {total_pages}")
print(f"Scan 1 (within file): {len(scan1_results)} issues")
print(f"Scan 2 (same folder): {len(scan2_results)} issues")
print(f"Scan 3 titles (cross folder): {len(cross_folder_title_dups)} issues")
print(f"Scan 3 content (cross folder): {len(cross_folder_content_dups)} issues")
