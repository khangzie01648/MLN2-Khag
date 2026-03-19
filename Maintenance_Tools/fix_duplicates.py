import re
import os

def fix_page_in_file(filepath, page_num, new_title, new_content_snippet):
    """Replace a specific page's title and first paragraph in a .md file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to find the specific page
    pattern = rf'(#### Trang {page_num}:)\s*(.+?)(\n\n)'
    match = re.search(pattern, content)
    if match:
        old_title = match.group(2).strip()
        content = content.replace(
            f"#### Trang {page_num}: {old_title}",
            f"#### Trang {page_num}: {new_title}"
        )
        # Also replace the content description line
        old_desc = f"Nội dung chi tiết về chủ đề: {old_title}."
        new_desc = f"Nội dung chi tiết về chủ đề: {new_title}."
        content = content.replace(old_desc, new_desc, 1)
        
        old_analysis = f"Adam Smith đã phân tích sâu sắc về {old_title}"
        new_analysis = f"Adam Smith đã phân tích sâu sắc về {new_title}"
        content = content.replace(old_analysis, new_analysis, 1)
        
        # Fix padding blocks too
        old_pad1 = f"Sự thấu hiểu về {old_title}"
        new_pad1 = f"Sự thấu hiểu về {new_title}"
        content = content.replace(old_pad1, new_pad1)
        
        old_pad2 = f"suy ngẫm về {old_title}"
        new_pad2 = f"suy ngẫm về {new_title}"
        content = content.replace(old_pad2, new_pad2)
        
        old_pad3 = f"chi tiết nhỏ về {old_title}"
        new_pad3 = f"chi tiết nhỏ về {new_title}"
        content = content.replace(old_pad3, new_pad3)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✅ Fixed Trang {page_num}: \"{old_title[:50]}...\" → \"{new_title[:50]}...\"")
        return True
    else:
        print(f"  ❌ Could not find Trang {page_num} in {filepath}")
        return False

base = r'd:\nietzsche-chronicle'

# === FIX 1: 02_Kinh_Te_Thinh_Vuong_Neurons ===
# "1776 — Vĩnh Cửu: Wealth Of Nations Và Vận Mệnh Nhân Loại"
# Trùng: 01_Tong_Quan (Trang 50) vs 07_Di_San (Trang 45)
# → Sửa file 07, Trang 45
print("🔧 FIX 1: 02_Kinh_Te_Thinh_Vuong_Neurons/07_Di_San_Va_Tranh_Luan_Hien_Dai.md")
fix_page_in_file(
    os.path.join(base, "02_Kinh_Te_Thinh_Vuong_Neurons", "07_Di_San_Va_Tranh_Luan_Hien_Dai.md"),
    45,
    "2026 — Tầm Nhìn Vĩnh Viễn: Di Sản Smith Trong Kỷ Nguyên AI Và Toàn Cầu Hóa",
    "Trong kỷ nguyên số hóa và trí tuệ nhân tạo"
)

# === FIX 2: 05_Khoa_Hoc_Van_Chuong_Neurons ===
# "Xã hội — Ngôn Ngữ Như Một Công Cụ Giao Tiếp Xã Hội"
# Trùng: 02_Tu_Tu_Hoc (Trang 28) vs 06_Su_Phat_Trien (Trang 9)
# → Sửa file 06, Trang 9
print("\n🔧 FIX 2: 05_Khoa_Hoc_Van_Chuong_Neurons/06_Su_Phat_Trien_Cua_Ngon_Ngu.md")
fix_page_in_file(
    os.path.join(base, "05_Khoa_Hoc_Van_Chuong_Neurons", "06_Su_Phat_Trien_Cua_Ngon_Ngu.md"),
    9,
    "Cộng đồng — Vai Trò Của Ngôn Ngữ Trong Việc Xây Dựng Cấu Trúc Cộng Đồng",
    "Ngôn ngữ không chỉ là phương tiện giao tiếp mà còn là nền tảng xây dựng cộng đồng"
)

# === FIX 3: 06_Dao_Duc_He_Thong_Neurons ===
# "Kết luận — Sự Thăng Hoa Toàn Diện Của Nhân Bản Đạo Đức"
# Trùng: 04_Moi_Quan_He (Trang 50) vs 07_Dao_Duc_Trong (Trang 48)
# → Sửa file 07, Trang 48
print("\n🔧 FIX 3: 06_Dao_Duc_He_Thong_Neurons/07_Dao_Duc_Trong_Xa_Hoi_Thuong_Mai_Hien_Dai.md")
fix_page_in_file(
    os.path.join(base, "06_Dao_Duc_He_Thong_Neurons", "07_Dao_Duc_Trong_Xa_Hoi_Thuong_Mai_Hien_Dai.md"),
    48,
    "Tổng hợp — Bản Giao Hưởng Cuối Cùng: Đạo Đức Dẫn Dắt Thương Mại Nhân Bản",
    "Đạo đức và thương mại không phải là hai thế lực đối lập"
)

# === FIX 4: Cross-folder ===
# "Mô phỏng — Sự Khác Biệt Giữa Bản Sao Và Nghệ Thuật"
# Trùng: 05/.../04_Ban_Chat (Trang 7) vs 07/.../02_Hoi_Hoa (Trang 3)
# → Sửa 07/02_Hoi_Hoa, Trang 3
print("\n🔧 FIX 4: 07_Nghe_Thuat_Di_San_Neurons/02_Hoi_Hoa_Dieu_Khac_va_Su_Mo_Phong.md")
fix_page_in_file(
    os.path.join(base, "07_Nghe_Thuat_Di_San_Neurons", "02_Hoi_Hoa_Dieu_Khac_va_Su_Mo_Phong.md"),
    3,
    "Tái hiện — Ranh Giới Mong Manh Giữa Sao Chép Và Sáng Tạo Nghệ Thuật",
    "Trong hội họa và điêu khắc, ranh giới giữa tái hiện trung thực và sáng tạo nghệ thuật"
)

print("\n🎉 Hoàn tất sửa 4 lỗi trùng lặp!")
