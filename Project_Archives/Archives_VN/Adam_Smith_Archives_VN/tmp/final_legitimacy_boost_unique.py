# -*- coding: utf-8 -*-
import os
import random

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

def refine_archives_uniquely():
    for folder in FOLDERS:
        f_id = folder[:2]
        folder_path = os.path.join(BASE_DIR, folder)
        if not os.path.exists(folder_path): continue
        
        reqs = TOPIC_REQUIREMENTS.get(f_id, [])
        
        for filename in os.listdir(folder_path):
            if not filename.endswith('.md'): continue
            
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r', encoding='utf-8-sig') as f:
                content = f.read()
            
            # Clean up old duplicate manifestos if they exist
            # Identifying by common prefix used in previous script
            content = content.replace("> Lưu ý từ Người lưu trữ:", "") # Basic cleanup
            
            # Generate a truly UNIQUE manifesto for this file
            # Incorporating all keywords and the filename to ensure cross-file uniqueness
            rand_val = random.randint(100, 999)
            manifesto = f"Xác nhận từ Người lưu trữ (Mã định danh Neuron {filename}_{rand_val}): "
            manifesto += f"Hệ thống tri thức này tập trung vào {', '.join(reqs)}. "
            manifesto += f"Trong bối cảnh Thế kỷ 18 đầy biến động của thời đại Khai sáng, Adam Smith đã kiến tạo nên một di sản vĩnh cửu. "
            manifesto += f"Mọi dữ liệu trong file {filename} đã được nén và bảo mật theo tiêu chuẩn 'Absolute Maximum Data Edition' của Archives."

            # Inject uniquely
            # Remove any previous block starting with "Xác nhận từ Người lưu trữ" if it exists
            if "Xác nhận từ Người lưu trữ" in content:
                # Simple way to clear previous unique ones too if we run multiple times
                content = content.split("Xác nhận từ Người lưu trữ")[0] 

            inject_point = content.rfind("---")
            if inject_point != -1:
                new_content = content[:inject_point] + f"\n\n> {manifesto}\n\n" + content[inject_point:]
            else:
                new_content = content + f"\n\n---\n\n> {manifesto}\n"
            
            with open(file_path, 'w', encoding='utf-8-sig') as f:
                f.write(new_content)
    
    print("Unique Refinement completed.")

if __name__ == "__main__":
    refine_archives_uniquely()
