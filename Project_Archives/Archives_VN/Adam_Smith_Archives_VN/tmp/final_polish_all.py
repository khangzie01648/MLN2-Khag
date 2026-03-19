
import re
import os

def polish_file(file_path):
    if not os.path.exists(file_path):
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    suffix = "(ABSOLUTE MAXIMUM DATA EDITION)"
    
    for line in lines:
        # Polish Video Titles
        if line.startswith("VIDEO") and ":" in line:
            if suffix not in line:
                line = line.strip() + " " + suffix + "\n"
        
        # Polish Indentation and spacing
        line = line.replace("  ", " ").replace("  ", " ") # Collapse multiple spaces
        
        new_lines.append(line)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

base_dir = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons'
for i in range(1, 8):
    fname = f"0{i}_Adam_Smith_Full_250_Prompts_FINAL.md"
    fpath = os.path.join(base_dir, fname)
    if os.path.exists(fpath):
        polish_file(fpath)
        print(f"Polished {fname}")
