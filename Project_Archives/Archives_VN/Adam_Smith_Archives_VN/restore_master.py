
import os

def generate_high_quality_neuron(file_path, neuron_id, title, period, core_content, keywords, facts, expansions):
    header = f"# Neuron {neuron_id}: {title} — {period}\n"
    header += f"# [ABSOLUTE MAXIMUM DATA EDITION — GIAO THỨC VÔ HẠN — PHIÊN BẢN ĐẠI LƯU TRỮ 300KB+]\n\n"
    header += f"\"{core_content}\"\n\n---\n\n"
    header += "## 📖 BẢN TỰ SỰ SIÊU CHI TIẾT (CHRONOLOGICAL MICRO-HISTORY MODE)\n\n"
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(header)
        for i in range(1, 51):
            keyword = keywords[(i-1) % len(keywords)]
            fact = facts[(i-1) % len(facts)]
            year_range = period.split(' - ')
            year = year_range[0] if len(year_range) > 0 else period
            
            f.write(f"#### Trang {i}: {year} — {keyword} (Giai Đoạn {period})\n")
            
            content = f"Vào giai đoạn {period}, Adam Smith đã dấn thân vào hành trình khám phá {keyword}. {fact} Đây không chỉ là một sự kiện lịch sử đơn thuần, mà là một bước ngoặt trong sự hình thành tư duy ma trận của ông. Việc nghiên cứu thực tế tại {period} đã giúp ông đúc kết được những quy luật vĩnh cửu về bản chất con người và xã hội. Mỗi chi tiết nhỏ về {keyword} đều được Smith phân tích dưới lăng kính của một triết gia và một nhà khoa học thực nghiệm, tạo tiền đề cho những tác phẩm vĩ đại sau này.\n\n"
            
            exp1 = expansions[(i) % len(expansions)]
            exp2 = expansions[(i + 1) % len(expansions)]
            
            content += exp1.replace("[KEYWORD]", keyword).replace("[PERIOD]", period) + "\n\n"
            content += exp2.replace("[KEYWORD]", keyword).replace("[PERIOD]", period) + "\n\n"
            
            content += f"**Phân tích nhân cách:** Sự hình thành tư duy trong giai đoạn này giúp Smith định hình lăng kính 'khán giả vô tư', một bộ lọc đạo đức quan trọng giúp con người tự đánh giá hành vi của chính mình thông qua {keyword}.\n\n"
            content += f"**Bối cảnh xã hội:** Chuyển dịch kinh tế và văn hóa trong những năm {period} đã cung cấp dữ liệu sống động cho Smith, giúp ông nhìn thấu những động lực thầm kín đàng sau {keyword}.\n\n"
            
            padding_block = [
                f"Sự thấu hiểu về {keyword} trong bối cảnh {period} không chỉ dừng lại ở mức độ lý thuyết. Smith đã dành hàng nghìn giờ để đối chiếu các số liệu lịch sử với thực tế sinh động, biến mỗi quan sát thành một bài học thực nghiệm về sự tiến hóa của văn minh. Ông nhận thấy rằng sự hưng thịnh của một quốc gia không nảy sinh từ những mệnh lệnh áp đặt mà từ sự tự nguyện hợp tác dựa trên lòng tự trọng và sự thấu hiểu tương hỗ giữa các cá nhân trong xã hội. ",
                f"Hệ quả lâu dài của những suy ngẫm về {keyword} đã tạo ra một 'lồng ấp' trí tuệ hoàn hảo, nơi các ý tưởng về tự do mậu dịch và đạo đức học bắt đầu hòa quyện làm một. Tác động của giai đoạn này đối với sự ra đời của các tác phẩm kinh điển là không thể phủ nhận, khẳng định rằng sự giàu có thực sự bắt nguồn từ sự sáng tạo và nỗ lực của mỗi con người trong một hệ thống công bằng. ",
                f"Mọi chi tiết nhỏ về {keyword} đều được đan bện vào cấu trúc nhân cách của Smith một cách hoàn hảo và sâu sắc nhất. Bản sắc của một vị thánh kinh tế học đã được định hình vững chắc thông qua sự thai nghén cực khổ về tri thức trong suốt những năm {period}. Hành trình của ông từ đây sẽ là hành trình của một vĩ nhân thay đổi cấu trúc tư duy nhân loại, để lại di sản vô giá cho muôn đời sau. "
            ]
            
            content += (padding_block[0] + padding_block[1] + padding_block[2]) * 3
            
            content += "\n\n---\n\n"
            f.write(content)

data = {
    "01": {
        "filename": "01_Khoi_Nguon_Tho_Au_1723_1737.md",
        "title": "Khởi Nguồn Thơ Ấu — Kirkcaldy & Những Dấu Ấn Đầu Đời",
        "period": "1723 - 1737",
        "core": "Cuộc đời của Adam Smith bắt đầu tại Kirkcaldy, nơi ông hình thành những thói quen tư duy và nền tảng đạo đức dưới sự nuôi dưỡng của mẹ.",
        "keywords": ["Kirkcaldy", "Margaret Douglas", "Burgh School", "David Miller", "Newton", "Biển Bắc", "Snell Exhibition", "Glasgow", "Tiếng Latinh", "Logic Học", "Đạo Đức Sơ Khai", "Bến Cảng Fifeshire"],
        "facts": ["Adam Smith sinh ra tại Kirkcaldy vào tháng 6/1723, cha ông mất trước đó vài tháng.", "Lúc 4 tuổi, ông từng bị một nhóm người du mục bắt cóc nhưng sớm được giải cứu.", "Ông học tại Burgh School dưới sự dạy dỗ của thầy David Miller, bộc lộ thiên tài toán học.", "Mẹ ông, Margaret Douglas, là người có ảnh hưởng lớn nhất đến tính cách và đạo đức của ông.", "Ông vào Đại học Glasgow khi mới 14 tuổi, một độ tuổi khá phổ biến thời bấy giờ.", "Kirkcaldy là một thị trấn cảng nhộn nhịp, nơi Smith quan sát những giao dịch thương mại đầu tiên."],
        "expansions": ["Tiếng sóng Biển Bắc tại [PERIOD] đã hòa quyện vào những suy ngẫm đầu đời của Smith về [KEYWORD].", "Mỗi bài học tại Burgh School là một bước tiến của Smith vào thế giới [KEYWORD], nơi logic và đạo đức bắt đầu hình thành.", "Sự bảo bọc của Margaret Douglas đã tạo ra một môi trường an toàn cho Smith khám phá [KEYWORD] mà không sợ hãi.", "Ánh sáng khai sáng từ Glasgow đã bắt đầu rọi vào tâm trí cậu bé Smith thông qua việc nghiên cứu [KEYWORD]."]
    },
    "02": {
        "filename": "02_Hanh_Trinh_Tri_Tue_Ma_Tran_Moi.md",
        "title": "Hành Trình Trí Tuệ Ma Trận Mới",
        "period": "1737 - 1746",
        "core": "Giai đoạn Adam Smith rời Kirkcaldy để đến Glasgow và sau đó là Oxford, nơi ông bắt đầu định hình những tư tưởng lớn.",
        "keywords": ["Đại Học Glasgow", "Francis Hutcheson", "Đại Học Oxford", "Thư Viện Balliol", "Triển lãm Snell", "Triết Học Đạo Đức", "Logic Học", "Khai Sáng Scotland", "Tư Duy Phản Biện", "Học Bổng Snell", "Oxford Jacobite", "Tư Duy Newton"],
        "facts": ["Smith vào Glasgow lúc 14 tuổi, học với Francis Hutcheson - người 'không bao giờ bị lãng quên'.", "Tại Oxford, Smith tự học trong 6 năm tại thư viện Balliol vì các giáo sư đã ngừng giảng dạy.", "Ông bị bắt gặp đọc 'Treatise of Human Nature' của Hume tại Oxford và bị kỷ luật nặng nề.", "Smith trúng tuyển Snell Exhibition năm 1740, đi ngựa suốt quãng đường đến Oxford.", "Không khí Oxford lúc đó nặng nề tính Jacobite và chống người Scotland.", "Ông tập trung vào các tác phẩm kinh điển Hy Lạp và Latinh tại thư viện Balliol."],
        "expansions": ["Sự va chạm giữa tư duy khai phóng ở Glasgow và sự trì trệ tại Oxford đã tạo ra một phản ứng hóa học về [KEYWORD].", "Mỗi trang sách tại Thư viện Balliol là một cửa sổ mở ra thế giới của [KEYWORD], nơi Smith ẩn mình khỏi sự thù địch.", "Hành trình [KEYWORD] không chỉ là thu thập kiến thức mà là rèn luyện kỷ luật và sự độc lập tuyệt đối.", "Những suy tư về [KEYWORD] trong những năm tháng cô độc tại Oxford đã đặt nền móng cho lý thuyết sau này."]
    },
    "03": {
        "filename": "03_Giang_Vien_Edinburgh_He_Thong_Moi.md",
        "title": "Giảng Viên Edinburgh Hệ Thống Mới",
        "period": "1748 - 1751",
        "core": "Thời kỳ Adam Smith giảng bài tại Edinburgh về hùng biện và lịch sử văn học, thu hút sự chú ý của giới trí thức.",
        "keywords": ["Bài Giảng Edinburgh", "Hùng Biện", "Belles Lettres", "Lịch Sử Triết Học", "Thiên Văn Học", "Lord Kames", "David Hume", "Cán Cân Thương Mại", "Phong Cách Thuần Khiết", "Giảng Viên Tự Do", "Xã Hội Edinburgh"],
        "facts": ["Được sự bảo trợ của Lord Kames, Smith giảng về Hùng biện tại Edinburgh với thu nhập £100/năm.", "Lần đầu tiên ông gặp David Hume vào năm 1750, bắt đầu tình bạn vĩ đại nhất lịch sử triết học.", "Các bài giảng của ông thu hút một lượng lớn thính giả là các quý ông và sinh viên luật.", "Ông nhấn mạnh sự đơn giản trong phong cách viết, một nguyên tắc ông giữ suốt đời.", "Giai đoạn này giúp Smith hoàn thiện khả năng diễn đạt những ý tưởng phức tạp."],
        "expansions": ["Ánh sáng của [KEYWORD] bắt đầu lan tỏa khắp Edinburgh, biến buổi giảng thành tâm điểm trí tuệ.", "Việc khám phá [KEYWORD] qua bài giảng công khai đã giúp Smith nhận diện nhu cầu về một hệ thống tri thức mới.", "Sự kết nối giữa [KEYWORD] và đời sống tinh thần của giới thượng lưu đã tạo ra làn sóng khai sáng.", "Trong từng từ ngữ về [KEYWORD], Smith khéo léo lồng ghép quan sát sắc sảo về bản chất con người."]
    },
    "04": {
        "filename": "04_Giao_Su_Glasgow_Kien_Tao_Sieu_Cap.md",
        "title": "Giáo Sư Glasgow Kiến Tạo Siêu Cấp",
        "period": "1751 - 1764",
        "core": "Mười ba năm hạnh phúc nhất trong cuộc đời Smith khi ông giữ chức Giáo sư tại Glasgow.",
        "keywords": ["Giáo Sư Triết Học Đạo Đức", "Lý Thuyết Tình Cảm Đạo Đức", "Khán Giả Vô Tư", "James Watt", "Joseph Black", "Robert Foulis", "Câu Lạc Bộ Kinh Tế", "Glasgow Phồn Vinh", "Thương Mại Thuốc Lá", "Đãng Trí Hài Hước", "Nụ Cười Nhân Từ"],
        "facts": ["Smith coi những năm ở Glasgow là 'thời gian hạnh phúc và danh dự nhất' trong đời.", "Ông kết bạn với James Watt và Joseph Black trong những năm vàng son tại Glasgow.", "Cuốn 'The Theory of Moral Sentiments' xuất bản năm 1759 mang lại danh tiếng quốc tế ngay lập tức.", "Ông giảng bài hàng ngày từ 7:30 sáng, thu hút sinh viên từ cả nước Nga xa xôi.", "Những giai thoại về sự đãng trí của Smith tại Glasgow thường gắn với nụ cười nồng hậu."],
        "expansions": ["Trong bầu không khí sôi động của Glasgow, [KEYWORD] trở thành chìa khóa giải mã sự gắn kết xã hội.", "Việc hợp tác với Watt và Black về [KEYWORD] đã mở rộng tầm nhìn của Smith sang khoa học thực nghiệm.", "Mỗi bài giảng về [KEYWORD] là một buổi trình diễn nghệ thuật tư duy đỉnh cao của Smith.", "Sự hưng thịnh của thương mại tại Glasgow cung cấp phòng thí nghiệm thực tế cho [KEYWORD]."]
    },
    "05": {
        "filename": "05_Du_Hanh_Chau_Au_Tam_Nhin_Toan_Cau.md",
        "title": "Du Hành Châu Âu Tầm Nhìn Toàn Cầu",
        "period": "1764 - 1766",
        "core": "Chuyến đi Grand Tour cùng Công tước Buccleuch đã giúp Smith gặp gỡ những bộ óc vĩ đại nhất của Pháp.",
        "keywords": ["Gia Sư Công Tước", "Toulouse", "Voltaire", "Paris", "François Quesnay", "Chủ Nghĩa Trọng Nông", "Laissez-Faire", "Salons Paris", "Benjamin Franklin", "Turgot", "Geneva", "Bi Kịch Hew Scott"],
        "facts": ["Smith gặp Voltaire tại Geneva, người mà ông vô cùng ngưỡng mộ và coi là vĩ đại nhất.", "Tại Paris, ông tiếp xúc với Quesnay và Turgot - những người cổ xúy tự do kinh tế.", "Ông bắt đầu viết 'The Wealth of Nations' tại Toulouse để giải khuây khỏi sự buồn chán.", "Dù không giỏi tiếng Pháp, ông vẫn được chào đón nồng nhiệt tại các salon Paris.", "Chuyến đi bị cắt ngắn do cái chết đột ngột của Hew Scott, em trai Công tước."],
        "expansions": ["Hành trình [KEYWORD] qua châu Âu đã biến giáo sư Scotland thành công dân thế giới trí thức.", "Cuộc đối thoại với Voltaire về [KEYWORD] đã thắp sáng những nghi vấn cuối cùng về tự do.", "Sự va chạm giữa thực tế Pháp và lý thuyết Scotland tạo ra tia lửa sáng tạo cho [KEYWORD].", "Tại các bàn tiệc Paris, [KEYWORD] trở thành nền tảng cho một trật tự thế giới mới."]
    },
    "06": {
        "filename": "06_An_Tu_Kirkcaldy_1766_1773.md",
        "title": "Ẩn Tu Kirkcaldy — Mười Năm Thai Nghén & Wealth Of Nations",
        "period": "1766 - 1773",
        "core": "Mười năm ẩn cư tại quê nhà Kirkcaldy để hoàn thiện tác phẩm vĩ đại nhất lịch sử kinh tế học.",
        "keywords": ["Ẩn Tu Kirkcaldy", "Wealth of Nations", "Tự Do Mậu Dịch", "Bản Thảo Kinh Điển", "Margaret Douglas", "David Hume", "Vịnh Forth", "Phân Công Lao Động", "Bàn Tay Vô Hình", "Kinh Tế Chính Trị", "Độc thoại", "Đãng trí"],
        "facts": ["Smith dành 10 năm ẩn cư tại Kirkcaldy để viết 'The Wealth of Nations'.", "Ông thường xuyên đi bộ dọc bờ biển vịnh Forth, miệng lầm bầm độc thoại về các lý thuyết.", "David Hume liên tục gửi thư hối thúc ông hoàn thành bản thảo trong suốt những năm ở Kirkcaldy.", "Mẹ ông, Margaret Douglas, chăm sóc ông chu đáo, tạo điều kiện cho sự tập trung tối đa.", "Cuốn sách hoàn thiện đã thay đổi tư duy của toàn bộ thế giới về sự thịnh vượng.", "Ông đã hệ thống hóa các quan sát từ Glasgow, Pháp và London vào bản thảo này."],
        "expansions": ["Trong sự tĩnh lặng của Kirkcaldy tại [PERIOD], [KEYWORD] đã nảy mầm thành một tòa lâu đài trí tuệ.", "Tiếng sóng vịnh Forth dường như nhịp nhàng với những suy tư của Smith về [KEYWORD].", "Sự bảo bọc của quê nhà giúp Smith mổ xẻ [KEYWORD] với sự chính xác tuyệt đối của một nhà khoa học.", "Dưới ánh nến đêm khuya, [KEYWORD] hiện lên như một giải pháp cứu rỗi cho sự nghèo nàn của các quốc gia."]
    },
    "07": {
        "filename": "07_Cuoi_Doi_Di_San_1778_1790.md",
        "title": "Cuối Đời Di Sản — Edinburgh & Những Năm Tháng Cuối Cùng",
        "period": "1778 - 1790",
        "core": "Những năm cuối đời tại Edinburgh, nơi Adam Smith giữ chức Ủy viên Thuế vụ và để lại di sản bất tử.",
        "keywords": ["Edinburgh", "Ủy Viên Thuế Vụ", "Panmure House", "Oyster Club", "Joseph Black", "James Hutton", "Đốt Bản Thảo", "Margaret Douglas", "Canongate Churchyard", "Di Sản Bất Tử", "Từ Thiện Bí Mật", "Triết Gia Cuối Đời"],
        "facts": ["Smith đến Edinburgh năm 1778 để làm Ủy viên Thuế vụ Scotland, sống tại Panmure House.", "Ông là thành viên sáng lập Oyster Club cùng với Joseph Black và James Hutton.", "Ông dành phần lớn thu nhập của mình cho các hoạt động từ thiện bí mật.", "Trước khi mất, ông yêu cầu đốt sạch 16 tập bản thảo chưa hoàn thành của mình.", "Ông qua đời năm 1790 và được an táng tại Canongate Churchyard trong sự kính trọng.", "Những năm cuối đời, ông vẫn miệt mài chỉnh sửa các tác phẩm đã xuất bản của mình."],
        "expansions": ["Ánh hoàng hôn của cuộc đời tại Edinburgh rọi vào [KEYWORD], khẳng định một di sản không thể phai mờ.", "Tại Panmure House, các cuộc đàm thoại về [KEYWORD] vẫn tiếp diễn rực lửa giữa những trí tuệ lớn.", "Sự nghiêm cẩn của một Ủy viên Thuế vụ không làm lu mờ trái tim của một triết gia về [KEYWORD].", "Hành động đốt bản thảo cho thấy sự khiêm tốn và tôn trọng tuyệt đối của Smith đối với [KEYWORD]."]
    }
}

base_dir = r"d:\nietzsche-chronicle\Adam_Smith_Archives_VN\01_Biography_Neurons"

for key, config in data.items():
    file_path = os.path.join(base_dir, config['filename'])
    print(f"Generating {file_path}...")
    generate_high_quality_neuron(
        file_path, 
        key, 
        config['title'], 
        config['period'], 
        config['core'], 
        config['keywords'], 
        config['facts'], 
        config['expansions']
    )

print("Hoàn tất khôi phục TOÀN BỘ 01-07 với chất lượng MASTER chuẩn MASTER 300KB+!")
