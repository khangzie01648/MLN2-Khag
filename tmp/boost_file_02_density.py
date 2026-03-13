
import re

file_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\02_Adam_Smith_Full_250_Prompts_FINAL.md'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Function to boost a video block
def boost_video(video_text):
    # Ensure it has Nội dung: at start
    if 'Nội dung:' not in video_text:
        # Try to find a summary line
        pass
    
    # Standardize keywords in Kỹ thuật
    # We want to add some high-end keywords if they are missing
    def enhance_tech(match):
        tech_line = match.group(0)
        # Add Physics/Camera/VFX randomly if missing to increase "density" and "pro feel"
        if 'Physics:' not in tech_line and 'Macro' in video_text:
             tech_line += " Physics: Stable macro focus simulation."
        if 'Camera:' not in tech_line and 'pan' in video_text.lower():
             tech_line += " Camera: Smooth cinematic tracking."
        if '8K' not in video_text:
             # Add to Prompt if not there
             pass
        return tech_line

    video_text = re.sub(r'Kỹ thuật:.*', enhance_tech, video_text)
    
    # Ensure all prompts mention 8K or Cinematic if not there
    def enhance_prompt(match):
        prompt_line = match.group(0)
        if '8K' not in prompt_line:
            prompt_line = prompt_line.replace('Prompt: ', 'Prompt: A breathtaking 8K ')
        return prompt_line

    video_text = re.sub(r'Prompt: (?!A breathtaking 8K).*', enhance_prompt, video_text)

    return video_text

# Separate by VIDEO blocks
blocks = re.split(r'(VIDEO \d+:)', text)
new_blocks = [blocks[0]]
for i in range(1, len(blocks), 2):
    header = blocks[i]
    body = blocks[i+1]
    
    # Check for duplicated clip numbers in body
    clip_nums = re.findall(r'^(\d+)\. Clip \d+', body, flags=re.MULTILINE)
    if len(clip_nums) > 5:
        # There's a duplication. We already fixed Video 20 manually, but let's be safe.
        # This script could be smarter, but for now let's just do basic boosting.
        pass

    new_blocks.append(header)
    new_blocks.append(boost_video(body))

final_text = "".join(new_blocks)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_text)
