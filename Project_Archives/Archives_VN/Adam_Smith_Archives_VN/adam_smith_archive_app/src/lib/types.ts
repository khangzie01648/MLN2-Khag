export interface ArticleConfig {
    title: string;
    slug: string;
    sourceFile: string;
    fullPath?: string;
    description?: string;
}

export interface PillarConfig {
    id: string;
    name: string;
    nameVi: string;
    description: string;
    color: string;
    articles: ArticleConfig[];
}
