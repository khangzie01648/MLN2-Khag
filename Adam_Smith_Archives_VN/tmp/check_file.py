
import os

file_path = r"d:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\01_Adam_Smith_Full_250_Prompts_FINAL.md"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.readlines()
        print(f"Total lines: {len(content)}")
        print("Last 20 lines:")
        for line in content[-20:]:
            print(line.strip())
except Exception as e:
    print(f"Error: {e}")
