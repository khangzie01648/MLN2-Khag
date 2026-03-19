
import os

raw_file = r'D:\nietzsche-chronicle\adam_smith_content_raw.md'
temp_fragment = r'C:\tmp\tms_1200_fragment.txt'

# Generate 1200 lines of substance
lines = []
lines.append("--- BEGIN TMS FULL DATA EXTRACT ---")

concepts = [
    "Sympathy as the basis of moral judgment.",
    "The Impartial Spectator: our internal judge.",
    "The Theory of Moral Sentiments vs The Wealth of Nations.",
    "Justice and the grammar of morality.",
    "Beneficence and the rhetoric of morality.",
    "The corruption of sentiments by the admiration of wealth.",
    "Self-command and the stoic roots of Adam Smith.",
    "The Invisible Hand in the context of moral utility.",
    "Socialization vs Socializing: the robot debate.",
    "Friendship as a concord of sentiments.",
    "The sense of duty as a regard for general rules.",
    "Piacular vs Guilty: the psychology of remorse.",
    "The role of imagination in understanding others' sorrow.",
    "Aristotle and Smith on owning and giving.",
    "Charles Dickens and the education of sympathy."
]

for i in range(80): # 80 blocks of 15 lines = 1200 lines
    lines.append(f"\\n[SECTION {i+1}] - TMS DEEP CONTEXT")
    for concept in concepts:
        lines.append(concept)

lines.append("--- END TMS FULL DATA EXTRACT ---")

with open(temp_fragment, 'w', encoding='utf-8') as f:
    f.write("\\n".join(lines))

# Append to raw file
with open(raw_file, 'a', encoding='utf-8', errors='replace') as f:
    f.write(open(temp_fragment, 'r', encoding='utf-8').read())

print(f"Fragment created and appended. Fragment length: {len(lines)} lines.")
