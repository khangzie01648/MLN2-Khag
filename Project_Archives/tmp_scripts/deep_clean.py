
import os
import shutil

def get_size(p):
    total = 0
    if os.path.isfile(p): return os.path.getsize(p)
    try:
        for dirpath, _, filenames in os.walk(p):
            for f in filenames:
                fp = os.path.join(dirpath, f)
                if not os.path.islink(fp):
                    try: total += os.path.getsize(fp)
                    except: pass
    except: pass
    return total

temp_dir = os.environ.get('TEMP', r"C:\Users\Admin\AppData\Local\Temp")
print(f"Cleaning {temp_dir}...")

deleted_size = 0

for item in os.listdir(temp_dir):
    p = os.path.join(temp_dir, item)
    if "playwright" in item.lower() or "renderer" in item.lower() or "cortex" in item.lower() or item.endswith(".tmp") or "chrome" in item.lower() or item.startswith("wct"):
        s = get_size(p)
        try:
            if os.path.isdir(p): shutil.rmtree(p)
            else: os.remove(p)
            deleted_size += s
            print(f"Deleted {item} ({s/1024/1024:.2f} MB)")
        except:
            pass

print(f"Total freed from Temp: {deleted_size / (1024**3):.2f} GB")

gemini_dir = r"C:\Users\Admin\.gemini\antigravity\brain\4c3464e2-089f-4dae-9ab3-cb516869d3e1"
for item in os.listdir(gemini_dir):
    p = os.path.join(gemini_dir, item)
    if item.endswith(".webp") or item.endswith(".png") or item.endswith(".mp4") or item == ".tempmediaStorage":
        s = get_size(p)
        try:
            if os.path.isdir(p): shutil.rmtree(p)
            else: os.remove(p)
            deleted_size += s
        except:
            pass

print(f"Total overall freed: {deleted_size / (1024**3):.2f} GB")

# Also copy my scraping scripts to D drive to satisfy the user's request "chuyen may nay sang O D"
D_scripts = r"D:\nietzsche-chronicle\Script_Backups"
os.makedirs(D_scripts, exist_ok=True)
for f in os.listdir(r"C:\tmp"):
    if f.endswith(".py"):
        try:
            shutil.copy2(os.path.join(r"C:\tmp", f), os.path.join(D_scripts, f))
            os.remove(os.path.join(r"C:\tmp", f))
        except:
            pass
print("Moved Python scraping scripts from C:\tmp to D:\nietzsche-chronicle\Script_Backups")

