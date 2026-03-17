export interface PillarConfig {
    id: string;
    name: string;
    nameVi: string;
    subtitle?: string;
    description: string;
    icon?: string;
    color: string;
    articles?: any[]; // Keep it optional for client-side
}

export const PILLAR_META: Record<string, PillarConfig> = {
    'biography': {
        id: "biography",
        name: "Biography & Neurons",
        nameVi: "TIỂU SỬ & TẾ BÀO",
        subtitle: "01_Biography_Neurons",
        description: "Hành trình cuộc đời và những nơ-ron ký ức đầu tiên.",
        color: "#9ca3af",
        icon: "castle"
    },
    'economics': {
        id: "economics",
        name: "Economics & Wealth",
        nameVi: "KINH TẾ & THỊNH VƯỢNG",
        subtitle: "02_Kinh_Te_Thinh_Vuong_Neurons",
        description: "Nền tảng của sự thịnh vượng và cơ chế thị trường.",
        color: "#92400e",
        icon: "book"
    },
    'ethics': {
        id: "ethics",
        name: "Ethics & Philosophy",
        nameVi: "ĐẠO ĐỨC & TRIẾT HỌC",
        subtitle: "03_Dao_Duc_Triet_Hoc_Neurons",
        description: "Khám phá bản chất con người và sự đồng cảm.",
        color: "#fbbf24",
        icon: "flame"
    },
    'politics': {
        id: "politics",
        name: "Law & Politics",
        nameVi: "PHÁP LÝ & CHÍNH TRỊ",
        subtitle: "04_Phap_Ly_Chinh_Tri_Neurons",
        description: "Hệ thống pháp quyền và quản trị xã hội.",
        color: "#1e40af",
        icon: "scale"
    },
    'literature': {
        id: "literature",
        name: "Science & Literature",
        nameVi: "KHOA HỌC & VĂN CHƯƠNG",
        subtitle: "05_Khoa_Hoc_Van_Chuong_Neurons",
        description: "Nghệ thuật ngôn từ và tư duy khoa học.",
        color: "#a855f7",
        icon: "sparkles"
    },
    'systems': {
        id: "systems",
        name: "Moral Systems",
        nameVi: "ĐẠO ĐỨC & HỆ THỐNG",
        subtitle: "06_Dao_Duc_He_Thong_Neurons",
        description: "Cấu trúc của các hệ thống đạo đức phức hợp.",
        color: "#06b6d4",
        icon: "sparkles"
    },
    'legacy': {
        id: "legacy",
        name: "Art & Legacy",
        nameVi: "NGHỆ THUẬT & DI SẢN",
        subtitle: "07_Nghe_Thuat_Di_San_Neurons",
        description: "Những giá trị vĩnh cửu và di sản để lại cho hậu thế.",
        color: "#f43f5e",
        icon: "castle"
    }
};

// Array for iteration in UI
export const PILLARS: PillarConfig[] = Object.values(PILLAR_META);
