
import os

def get_dir_size(path):
    total = 0
    try:
        for dirpath, _, filenames in os.walk(path):
            for f in filenames:
                fp = os.path.join(dirpath, f)
                if not os.path.islink(fp):
                    try:
                        total += os.path.getsize(fp)
                    except:
                        pass
    except:
        pass
    return total

print("Scanning C drive folders...")
check_paths = [
    r"C:\Users\Admin\.gemini",
    os.environ.get('TEMP', r"C:\Users\Admin\AppData\Local\Temp"),
    r"C:\Users\Admin\AppData\Local\ms-playwright",
    r"C:\Users\Admin\AppData\Local\Google\Chrome\User Data\Default\Cache"
]

for p in check_paths:
    if os.path.exists(p):
        size_gb = get_dir_size(p) / (1024**3)
        print(f"{p} : {size_gb:.2f} GB")
        
        # If it's temp, let's find the biggest subfolders
        if "Temp" in p or ".gemini" in p:
            print(f"  Top subfolders in {p}:")
            subdirs = []
            for item in os.listdir(p):
                full_path = os.path.join(p, item)
                if os.path.isdir(full_path):
                    s = get_dir_size(full_path) / (1024**3)
                    if s > 0.5: # bigger than 500MB
                        subdirs.append((full_path, s))
            subdirs.sort(key=lambda x: x[1], reverse=True)
            for sub, s in subdirs[:5]:
                print(f"    - {sub} : {s:.2f} GB")
