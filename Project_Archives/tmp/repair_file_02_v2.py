
import os

file_path = r'd:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons\02_Adam_Smith_Full_250_Prompts_FINAL.md'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find Video 01-23 Clip 1 (Header part)
header = []
for line in lines:
    header.append(line)
    if "1. Clip 1 (00:00 - 06:00): Dòng sông của sự suy tư" in line:
        break

# Find Video 30 start
v30_index = -1
for i, line in enumerate(lines):
    if "VIDEO 30: THÀNH TỰU" in line:
        v30_index = i
        break

if v30_index == -1:
    print("Error: Could not find VIDEO 30")
    exit(1)

rest_of_file = lines[v30_index:]

v23_rest = """Prompt: Close-up on Adam’s face as he walks. He is talking to himself, his lips move in silent logic. He stopped to look at his reflection in the water.
Kỹ thuật: Lens: 85mm. Lighting: Soft natural light reflecting off water. Sound: Rhythmic footsteps on grass.
3. Clip 3 (12:00 - 18:00): Tìm thấy nhịp điệu tự nhiên
Prompt: Adam watching a group of rowers on the river. He is analyzing the coordination and labor involved, taking mental notes.
Kỹ thuật: Lens: 50mm. Lighting: Bright sunlight flares. Sound: Sound of oars hitting water.
4. Clip 4 (18:00 - 24:00): Ghi chú bên dòng sông
Prompt: Macro shot of Adam sitting on a stone bench, writing a single sentence in his notebook: "Nature is the great stabilizer".
Kỹ thuật: Lens: 100mm Macro. Lighting: Golden hour warm glow. Sound: Sharp quill scratch on paper.
5. Clip 5 (24:00 - 30:00): Hoàng hôn thanh bình
Prompt: The camera pans from Adam's face to the sunset over the river. He has found peace in the natural order of things.
Kỹ thuật: Lens: 35mm. Lighting: Dramatic orange sunset. Sound: Peaceful, low-frequency orchestral finish.

---

"""

v24 = """VIDEO 24: TÂM LÝ — NỖI NHỚ NHÀ VÀ SỰ KIÊN ĐỊNH TRÍ TUỆ (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: Smith chuyển hóa nỗi nhớ quê hương Kirkcaldy thành động lực để rèn luyện trí tuệ một cách kỷ luật.
1. Clip 1 (00:00 - 06:00): Đêm đông cô độc
Prompt: Adam sitting by his dying fireplace in his Oxford cell. He is holding a small, smoothed stone he brought from Kirkcaldy beach.
Kỹ thuật: Lens: 50mm. Lighting: Cold blue moonlight and dying orange embers. Sound: Wind howling in the chimney.
2. Clip 2 (06:00 - 12:00): Gương mặt u sầu
Prompt: Close-up on Adam’s eyes as he looks into the fire. We see a reflection of the Kirkcaldy harbor in his pupils. A single tear glints but doesn't fall.
Kỹ thuật: Lens: 85mm. Lighting: Flickering firelight. Sound: Distant sound of waves.
3. Clip 3 (12:00 - 18:00): Chuyển hóa nỗi đau thành sức mạnh
Prompt: Adam stands up abruptly and picks up his pen. He begins to write with a renewed sense of purpose. Focus on his set jaw and intense eyes.
Kỹ thuật: Lens: 50mm. Lighting: Dramatic side-shadows. Sound: Determined quill scratching.
4. Clip 4 (18:00 - 24:00): Tòa tháp tri thức
Prompt: Macro shot of Adam building a small tower with his law books on the table, as if building a fortress against his own sadness.
Kỹ thuật: Lens: 100mm Macro. Lighting: Cold, analytical morning light. Sound: Thud of books on wood.
5. Clip 5 (24:00 - 30:00): Ý chí thép
Prompt: Adam standing by the window as the sun rises. He is no longer homesick; he is home within his own intellect.
Kỹ thuật: Lens: 35mm. Lighting: Blindingly hopeful dawn light. Sound: Triumphant, low-frequency brass chord.

---

"""

v25 = """VIDEO 25: KHAI SÁNG — ÁNH SÁNG TỪ NHỮNG CUỐN SÁCH CẤM (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: Smith bí mật tiếp cận các tư tưởng Khai sáng Pháp và Scotland, bất chấp sự kiểm soát gắt gao.
1. Clip 1 (00:00 - 06:00): Mật thất tri thức
Prompt: Adam pulling a hidden panel in his bookshelf to reveal a forbidden volume of Voltaire. The sound of wood sliding is hushed.
Kỹ thuật: Lens: 35mm. Lighting: Dim, low-key shadows. Sound: Soft sliding wood, heartbeat.
2. Clip 2 (06:00 - 12:00): Sự cám dỗ của lý tính
Prompt: Close-up on the title page of David Hume's Treatise. Adam’s hand touches the forbidden names with a mixture of fear and excitement.
Kỹ thuật: Lens: 50mm. Lighting: Single candle flame. Sound: Shivering paper rustle.
3. Clip 3 (12:00 - 18:00): Đọc trong nguy hiểm
Prompt: Adam reading the forbidden book while listening for footsteps in the hallway. He hides the book under his gown as a shadow passes his door.
Kỹ thuật: Lens: 85mm. Lighting: Flickering, high-contrast shadows. Sound: Distant echoing footsteps on stone.
4. Clip 4 (18:00 - 24:00): Biểu tượng của ánh sáng mới
Prompt: Macro shot of a candle flame reflecting in Adam’s glasses. The flame looks like a small sun illuminating his path.
Kỹ thuật: Lens: 100mm Macro. Lighting: Golden warmth. Sound: Soft hiss of the flame.
5. Clip 5 (24:00 - 30:00): Kẻ phản kháng thầm lặng
Prompt: Adam looking out the window, he has finished the forbidden text. His worldview has changed forever. Fade to black.
Kỹ thuật: Lens: 50mm. Lighting: Early morning blue wash. Sound: Majestic orchestral swell.

---

"""

v26 = """VIDEO 26: KỸ NĂNG — SỰ TÍCH LŨY KIẾN THỨC BÁCH KHOA (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: Smith rèn luyện để trở thành một "bách khoa toàn thư sống", kết nối mọi ngành khoa học vào một hệ thống duy nhất.
1. Clip 1 (00:00 - 06:00): Lộ trình vạn vật
Prompt: A tracking shot over Adam’s desk. We see books on astronomy, music, chemistry, and history all open at once. He is a polymath in training.
Kỹ thuật: Lens: 24mm. Lighting: Soft diffuse daylight. Sound: Diverse ambient sounds (birds, wind, clock).
2. Clip 2 (06:00 - 12:00): Ghi chép đa ngành
Prompt: Close-up of Adam’s notebook. He is drawing a botanical sketch on one side and a mathematical formula on the other.
Kỹ thuật: Lens: 50mm. Lighting: Focused amber lamp. Sound: Precise, rhythmic quill sounds.
3. Clip 3 (12:00 - 18:00): Sự kết nối vĩ đại
Prompt: Adam standing before a large chalk wall he has created in his room. He draws lines connecting "physics" to "human behavior".
Kỹ thuật: Lens: 35mm. Lighting: High-contrast shadows. Sound: Sound of chalk on stone.
4. Clip 4 (18:00 - 24:00): Nạp năng lượng trí tuệ
Prompt: Macro shot of Adam’s hand picking up a heavy tome of History. His grip is firm; his commitment is absolute.
Kỹ thuật: Lens: 100mm Macro. Lighting: Library glow. Sound: Heavy thud of the book.
5. Clip 5 (24:00 - 30:00): Triết gia bách khoa
Prompt: Adam sitting in the center of a circle of books on the floor. He looks like the epicenter of a new intellectual era.
Kỹ thuật: Lens: 24mm Wide-angle. Lighting: Blindingly bright morning sun. Sound: Grand, final orchestral chord.

---

"""

v27 = """VIDEO 27: HỌC PHÁI — SỰ ĐỐI NGHỊCH VỚI CHỦ NGHĨA KINH VIỆN (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: Smith phê phán những giáo điều cũ kỹ của chủ nghĩa kinh viện, hướng tới một nền tri thức thực tiễn và dựa trên quan sát.
1. Clip 1 (00:00 - 06:00): Giáo đường cũ nát
Prompt: A shots of a decaying, dusty Oxford hall where an old scholar is chanting Latin dogmas. The dust motes are thick as clouds.
Kỹ thuật: Lens: 24mm. Lighting: Moody, dim God rays. Sound: Low, Monotonous Latin chanting.
2. Clip 2 (06:00 - 12:00): Sự phản pháo của logic
Prompt: Close-up on Adam’s face as he stands up in a seminar. He asks a sharp, logical question that confuses the professor. The silence is heavy.
Kỹ thuật: Lens: 85mm. Lighting: Dramatic side-shadows. Sound: Tick-tock of a clock in the silence.
3. Clip 3 (12:00 - 18:00): Bản thảo "Dương thế luận"
Prompt: Adam writing a critique of medieval scholasticism. He uses a sharp quill to cross out old religious arguments.
Kỹ thuật: Lens: 50mm. Lighting: Cold morning sun. Sound: Aggressive pen scratches.
4. Clip 4 (18:00 - 24:00): Biểu tượng của sự thật
Prompt: Metaphorical shot: a heavy, dark veil being torn apart in slow motion, revealing a bright white source of light behind it.
Kỹ thuật: Lens: 35mm. VFX: Fabric tearing dynamics. Sound: Ripping fabric, bright chime.
5. Clip 5 (24:00 - 30:00): Khởi đầu của chủ nghĩa duy thực
Prompt: Adam walking out of the old hall into a busy marketplace. He is looking for truth in the real world, not in old towers.
Kỹ thuật: Lens: 35mm. Lighting: Bright, busy sunlight. Sound: Uplifting, fast-paced orchestral finish.

---

"""

v28 = """VIDEO 28: CÔNG LÝ — NHỮNG Ý TƯỞNG ĐẦU TIÊN VỀ QUYỀN TỰ DO (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: Smith bắt đầu hình thành khái niệm về công lý tự nhiên và quyền tự do cá nhân như là nền tảng của xã hội.
1. Clip 1 (00:00 - 06:00): Trước tòa án Oxford
Prompt: Adam watching a local trial from the gallery. He is observing the power dynamics and the lack of a system of natural justice.
Kỹ thuật: Lens: 35mm. Lighting: Dark, low-key courtroom shadows. Sound: Gavel hitting wood, murmurs.
2. Clip 2 (06:00 - 12:00): Luật lệ và tự do
Prompt: Close-up on Adam’s journal: "Every man is the master of his own labor". He underlined "Master" twice with thick ink.
Kỹ thuật: Lens: 100mm Macro. Lighting: Focused amber lamp. Sound: Sharp quill strokes.
3. Clip 3 (12:00 - 18:00): Giải mã quyền tự nhiên
Prompt: Adam reading Grotius and Pufendorf. He is nodding as he builds his own framework of what constitutes "fairness".
Kỹ thuật: Lens: 50mm. Lighting: Warm evening study light. Sound: Rhythmic breathing, paper rustle.
4. Clip 4 (18:00 - 24:00): Biểu tượng của chiếc cân
Prompt: Metaphorical shot: a simple brass scale on the desk. Adam places a pen on one side and a gold coin on the other. They are perfectly balanced.
Kỹ thuật: Lens: 50mm. Lighting: Soft window glint. Sound: Metallic tinkle.
5. Clip 5 (24:00 - 30:00): Nhà kiến kiến tạo công đạo
Prompt: Adam looking out the window, his eyes showing a vision of a world governed by fair laws. Fade to black.
Kỹ thuật: Lens: 85mm. Lighting: Blindingly clean morning sun. Sound: Resonant grand orchestral finish.

---

"""

v29 = """VIDEO 29: NHÂN CÁCH — SỰ KIÊN ĐỊNH VỚI BẢN SẮC SCOTSMAN (BẢN LỊCH SỬ THUẦN TÚY)
Nội dung: Smith bảo vệ bản sắc văn hóa Scotland trước những định kiến của giới tinh hoa Anh quốc tại Oxford.
1. Clip 1 (00:00 - 06:00): Kẻ ngoại đạo kiên cường
Prompt: Adam walking through the Oxford streets. He is wearing a simple plaid scarf—a silent mark of his Scottish identity. He walks with pride.
Kỹ thuật: Lens: 35mm. Lighting: Soft overcast daylight. Sound: Distant bagpipes, Scottish wind.
2. Clip 2 (06:00 - 12:00): Giọng nói của sự phản kháng
Prompt: Close-up of Adam’s mouth as he speaks a word in a thick Scottish accent to an English peer, then smiles as the other looks confused.
Kỹ thuật: Lens: 85mm. Lighting: Side-light (Rembrandt). Sound: Low, resonant Scottish growl.
3. Clip 3 (12:00 - 18:00): Thư gửi từ phương Bắc
Prompt: Adam reading a letter in his room. He picks up a small piece of Scottish thistle he kept and touches it to his heart.
Kỹ thuật: Lens: 50mm. Lighting: Warm domestic glow. Sound: Emotional, slow violin melody.
4. Clip 4 (18:00 - 24:00): Biểu tượng của sự hòa hợp không đồng hóa
Prompt: Macro shot of Adam’s hand writing: "I am a Scotsman first, a thinker second".
Kỹ thuật: Lens: 100mm Macro. Lighting: High-contrast candle. Sound: Determined quill scratches.
5. Clip 5 (24:00 - 30:00): Chim ưng phương Bắc
Prompt: A hawk flying high over the Oxford towers, soaring towards the North. Adam watches it from the courtyard, head held high.
Kỹ thuật: Lens: 24mm Wide. Lighting: Majestic sunset flare. Sound: Triumphant orchestral finish.

---

"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(header)
    f.write(v23_rest)
    f.write(v24)
    f.write(v25)
    f.write(v26)
    f.write(v27)
    f.write(v28)
    f.write(v29)
    f.writelines(rest_of_file)

print("File reconstructed successfully.")
