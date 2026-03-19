
import re

file_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\02_Adam_Smith_Full_250_Prompts_FINAL.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Clean up awkward double "A" from previous boost
content = content.replace('Prompt: A breathtaking 8K A ', 'Prompt: A breathtaking 8K ')
content = content.replace('Prompt: A breathtaking 8K An ', 'Prompt: A breathtaking 8K ')

# Ensure the project line is clean
content = content.replace('### DỰ ÁN: TRỰC QUAN HÓA CUỘC ĐỜI ADAM SMITH - NEURON 02 (1737-1746)', '### DỰ ÁN: TRỰC QUAN HÓA CUỘC ĐỜI ADAM SMITH (1737-1746)')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
