
import os

file_path = r"d:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\01_Adam_Smith_Full_250_Prompts_FINAL.md"

try:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        print(f"Total characters: {len(content)}")
        print("First 500 chars:")
        print(content[:500])
        print("\nAround position 2685:")
        print(content[2600:2800])
        print("\nLast 500 chars:")
        print(content[-500:])
except Exception as e:
    print(f"Error: {e}")
