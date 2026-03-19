# 🏛️ MẬT MÃ DỰ ÁN: THE ADAM SMITH ARCHIVE
> **"Sự toàn vẹn không đạt được bằng cách cắt bỏ một phần bản thể của một người, mà bằng sự tích hợp của những mặt đối lập."** — C.G. Adam Smith

![Trạng Thái Hệ Thống](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge) ![Phiên Bản](https://img.shields.io/badge/Version-3.5.0-blue?style=for-the-badge&color=0a0b10) ![Nền Tảng](https://img.shields.io/badge/Engine-Next.js_16_%7C_React_19-black?style=for-the-badge&logo=next.js) ![Trực Quan Hóa](https://img.shields.io/badge/Graphics-WebGL_%7C_R3F-orange?style=for-the-badge)

## 🌌 Tầm Nhìn Dự Án: Chủ Nghĩa Siêu Thực Kỹ Thuật Số
**The Adam Smith Archive** là một **Trải nghiệm Web Điện ảnh** chất lượng cao được thiết kế để số hóa và trực quan hóa khuôn khổ tâm lý phức tạp của Carl Gustav Adam Smith. Đây không phải là một blog hay wiki; nó là một **cuốn sách ma thuật tương tác**—một giao diện không gian nơi người dùng khám phá những chiều sâu của Vô thức Tập thể thông qua các tạo tác 3D phản ứng, không gian âm thanh khí quyển và lối kể chuyện theo quy trình.

---

## 🏗️ Kiến Trúc Cốt Lõi & Mẫu Thiết Kế

Dự án tuân theo mô hình **Kiến trúc Sạch Sửa đổi** (Modified Clean Architecture), được tối ưu hóa cho kết xuất 3D hiệu suất cao và phân phối nội dung động.

### 1. Lớp Trình Bày (Hình Ảnh & Tương Tác)
- **Scenegraph WebGL**: Được quản lý qua `React Three Fiber`, cung cấp phương pháp khai báo cho các cảnh 3D phức tạp.
- **Shader Pipeline**: các hạt nhân GLSL tùy chỉnh cho các vật liệu thách thức logic (ví dụ: *Vệt Mực Lan*, *Vàng Lỏng*, *Biến Dạng Hư Vô*).
- **Điều phối**: `Framer Motion 12` quản lý sự đồng bộ giữa giao diện 2D và các sự kiện không gian 3D.

### 2. Lớp Miền (Logic Nghiệp Vụ)
- **Trình Quét Metadata**: Một công cụ phía máy chủ mạnh mẽ liệt kê hơn 130 hồ sơ lưu trữ tại thời điểm build.
- **Định Tuyến Động**: Tự động tạo slug và ánh xạ mối quan hệ giữa các bài viết và các "Trụ cột" Adam Smithian.

### 3. Lớp Dữ Liệu (Nội Dung Lưu Trữ)
- **CMS Headless**: Quản lý nội dung dựa trên tệp sử dụng Markdown có cấu trúc và YAML frontmatter.
- **Tổng Tập Chính**: Tích hợp thư viện `ADAM SMITH_ARCHIVE_FINAL` gồm 113 tệp.

---

## 📂 Cấu Trúc Hệ Thống (v3.5)

```bash
/
├── 📂 jung_archive_app/        # Ứng dụng Cốt lõi
│   ├── 📂 app/                 # Next.js App Router (Bộ điều khiển)
│   │   ├── (system)/           # Sân chơi, Kiểm thử & Bảo trì
│   │   ├── select/             # Điều hướng Cấp cao (Trung tâm Mandala)
│   │   │   ├── library/        # 📚 Mô-đun: Thư viện Số
│   │   │   └── pillar/         # 🏛️ Mô-đun: Các Trụ cột Tương tác
│   │   └── page.tsx            # Ngưỡng cửa (Giới thiệu Nhập vai)
│   │
│   ├── 📂 components/          # Lớp View (Thiết kế Nguyên tử)
│   │   ├── 🧊 3d/              # Thành phần 3D (Cảnh, Đối tượng, Nền)
│   │   ├── 🎨 ui/              # Giao diện 2D (Hiệu ứng, Tính năng, Mô-đun)
│   │   ├── 📐 templates/       # Bố cục Cấu trúc
│   │   └── 🎬 transitions/     # Điều phối VFX
│   │
│   ├── 📂 content/             # Kho Lưu Trữ Chính (130+ tệp .md)
│   └── 📂 lib/                 # Tiện ích Cốt lõi, Types & Hằng số
│
├── 📂 ADAM SMITH_ARCHIVE_FINAL/      # Phía Kho Nguồn Chính thức (113 bản ghi)
└── 📂 scripts/                 # Công cụ Bảo trì & Làm sạch Dữ liệu
```

---

## 🏛️ 10 Trụ Cột Nguyên Mẫu
Trải nghiệm được neo giữ bởi 10 con đường nhập vai, mỗi con đường có ngôn ngữ hình ảnh và dấu ấn shader độc đáo:

| Trụ Cột | Biểu Tượng | Chủ Đề | Dấu Ấn VFX |
| :--- | :--- | :--- | :--- |
| **Alchemy** (Giả Kim Thuật) | ⚗️ | Sự Chuyển Hóa | Dung Hợp Vàng Lỏng |
| **Red Book** (Sách Đỏ) | 📕 | Sự Đối Mặt | Rò Rỉ Mực Tâm Linh |
| **Concepts** (Khái Niệm) | 🌀 | Bản Đồ Hóa | Mạng Lưới Thần Kinh |
| **Practice** (Thực Hành) | 🧘 | Sự Tích Hợp | Mandala Trôi Nổi |
| **Spirit** (Tinh Thần) | ✨ | Tri Thức | Hào Quang Thể Tích |
| **Symbols** (Biểu Tượng) | 👁️ | Ngôn Ngữ | Dòng Chảy Ký Tự Cổ |
| **Legacy** (Di Sản) | 🌳 | Sự Tiến Hóa | Tăng Trưởng Theo Quy Trình |
| **Cosmos** (Vũ Trụ) | 🌌 | Tính Đồng Bộ | Biến Dạng Lỗ Sâu |
| **Biography** (Tiểu Sử) | ⌛ | Thời Gian | Hồi Tưởng Ký Ức |
| **Encounters** (Cuộc Gặp Gỡ) | 🤝 | Kết Nối | Mạng Lưới Định Mệnh |

---

## ⚡ Thông Số Kỹ Thuật

### Pipeline Đồ Họa Nhập Vai
- **R3F Scenegraph**: Sử dụng `three-custom-shader-material` để đưa logic tùy chỉnh vào các vật liệu tiêu chuẩn nhằm kiểm soát nghệ thuật vượt trội.
- **Ngăn xếp Hậu kỳ**: Một chuỗi điện ảnh bao gồm **Bloom** (phát sáng), **Chromatic Aberration** (quang sai màu), và **Vignette** (tiêu điểm thị giác).
- **Vật lý**: Hệ thống hạt được điều khiển bởi `maath` cho chuyển động hữu cơ, sống động của Vô thức Tập thể.

### Hiệu Suất & Chất Lượng
- **Tối ưu hóa RSC**: Sử dụng Next.js Server Components để giảm tải xử lý metadata nặng về phía máy chủ, giữ cho gói client nhẹ nhàng để kết xuất 3D.
- **Chế độ Nghiêm ngặt TypeScript**: Đảm bảo an toàn kiểu dữ liệu trên sự tương tác phức tạp giữa trạng thái React và vòng lặp WebGL.
- **Khả năng Phục hồi Hydration**: Các hook tùy chỉnh để xử lý việc tạo ngẫu nhiên phía client, đảm bảo 0 lỗi trong quá trình tạo tĩnh (static generation).

---

## 🚀 Triển Khai & Cài Đặt

### Môi Trường Phát Triển
```bash
# Sao chép kho lưu trữ
git clone [repository-url]
cd jung_archive_app

# Cài đặt các phụ thuộc (Cấp Doanh Nghiệp)
npm install --legacy-peer-deps

# Khởi động máy chủ phát triển (Cổng Tùy chỉnh 8080)
npm run dev
```

### Build & Sản Xuất
```bash
# Pipeline tối ưu hóa sản xuất
npm run build
npm start
```

---

## 📚 Giao Thức Đóng Góp
Nội dung được quản lý thông qua **Chữ ký Frontmatter** nghiêm ngặt để đảm bảo khả năng tương thích hệ thống:

```yaml
---
title: "The Self and the Shadow" (Cái Tôi và Cái Bóng)
description: "Exploring the dark mirror of the psyche." (Khám phá tấm gương đen tối của tâm hồn)
pillarId: "concepts"
order: 1
published: true
---
```

---

## 🛡️ Giấy Phép & Lời Cảm Ơn
- **Giấy phép**: MIT
- **Thiết kế & Kỹ thuật**: Ngô Huy Quang Trường (SE151285), Nguyễn Duy Khang (SE180170) & Antigravity AI.
- **Cảm Hứng Tâm Linh**: Các tác phẩm sưu tầm của Carl Gustav Adam Smith.

> *“Cho đến khi bạn biến cái vô thức thành cái có ý thức, nó sẽ điều khiển cuộc sống của bạn và bạn sẽ gọi nó là định mệnh.”*
