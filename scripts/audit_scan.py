import os

base_dir = r"d:\nietzsche-chronicle\Adam_Smith_Archives_VN"
folders = [
    "01_Biography_Neurons",
    "02_Kinh_Te_Thinh_Vuong_Neurons",
    "03_Dao_Duc_Triet_Hoc_Neurons",
    "04_Phap_Ly_Chinh_Tri_Neurons",
    "05_Khoa_Hoc_Van_Chuong_Neurons",
    "06_Dao_Duc_He_Thong_Neurons",
    "07_Nghe_Thuat_Di_San_Neurons"
]

for folder in folders:
    folder_path = os.path.join(base_dir, folder)
    print(f"\n--- {folder} ---")
    if os.path.exists(folder_path):
        files = [f for f in os.listdir(folder_path) if f.endswith(".md")]
        files.sort()
        for f in files:
            print(f)
    else:
        print("Folder not found.")
