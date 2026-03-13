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
        name: "Biography & Life",
        nameVi: "TIỂU SỬ & CUỘC ĐỜI",
        subtitle: "The Life of Smith",
        description: "Hành trình từ Kirkcaldy đến những ngày cuối đời tại Edinburgh.",
        color: "#9ca3af", // Xám
        icon: "castle"
    },
    'economics': {
        id: "economics",
        name: "Economics & Wealth",
        nameVi: "KINH TẾ & THỊNH VƯỢNG",
        subtitle: "The Wealth of Nations",
        description: "Nền tảng của kinh tế học hiện đại và sự thịnh vượng của các quốc gia.",
        color: "#92400e", // Nâu
        icon: "book"
    },
    'ethics': {
        id: "ethics",
        name: "Ethics & Philosophy",
        nameVi: "ĐẠO ĐỨC & TRIẾT HỌC",
        subtitle: "The Theory of Moral Sentiments",
        description: "Khám phá bản chất con người và sự đồng cảm xã hội.",
        color: "#fbbf24", // Vàng
        icon: "flame"
    },
    'law': {
        id: "law",
        name: "Law & Politics",
        nameVi: "LUẬT PHÁP & CHÍNH TRỊ",
        subtitle: "Jurisprudence",
        description: "Lý thuyết về pháp quyền, công lý và quản trị xã hội.",
        color: "#1e40af", // Xanh dương
        icon: "scale"
    },
    'rhetoric': {
        id: "rhetoric",
        name: "Rhetoric & Letters",
        nameVi: "TU TỪ & THƯ TÍN",
        subtitle: "Belles Lettres",
        description: "Nghệ thuật ngôn từ và những dòng thư gửi gắm tư tưởng.",
        color: "#a855f7", // Tím
        icon: "sparkles"
    }
};

// Array for iteration in UI
export const PILLARS: PillarConfig[] = Object.values(PILLAR_META);
