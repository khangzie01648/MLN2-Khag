import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PILLAR_META, type PillarConfig } from './pillar-constants';
export { type PillarConfig };
export { PILLAR_META };
import { ArticleConfig } from './types';

// Define the content directories
const contentDirectory = path.join(process.cwd(), 'content');
// Assuming ADAM SMITH_ARCHIVE_FINAL is a sibling of jung_archive_app
const archivesDirectory = path.resolve(process.cwd(), '../Project_Archives/Archives_VN/Adam_Smith_Archives_VN'); // Fallback if needed
const archivesVnDirectory = path.resolve(process.cwd(), '../Project_Archives/Archives_VN/Adam_Smith_Archives_VN');
// Root-level Neurons folders (now in Knowledge_Neurons)
const rootNeuronsDirectory = path.resolve(process.cwd(), '../Knowledge_Neurons');

// Helper to map filename or directory to Pillar ID
function classifyPillar(filename: string, sourceDir: string): string {
    const f = filename.toLowerCase();
    const d = sourceDir.toLowerCase();

    // 0. PRIORITY: Check directory name (for _Neurons folders)
    if (d.includes('01_biography')) return 'biography';
    if (d.includes('02_kinh_te')) return 'economics';
    if (d.includes('03_dao_duc_triet_hoc')) return 'ethics';
    if (d.includes('04_phap_ly')) return 'politics';
    if (d.includes('05_khoa_hoc')) return 'literature';
    if (d.includes('06_dao_duc_he_thong')) return 'systems';
    if (d.includes('07_nghe_thuat')) return 'legacy';

    // 1. BIOGRAPHY & LIFE
    if (f.startsWith('biography_') || f.includes('biography') || f.includes('life') || f.includes('tieu_su')) {
        return 'biography';
    }

    // 2. ECONOMICS & WEALTH
    if (f.includes('economics') || f.includes('wealth') || f.includes('nations') || f.includes('kinh_te') || f.includes('thinh_vuong')) {
        return 'economics';
    }

    // 3. ETHICS & PHILOSOPHY
    if (f.includes('ethics') || f.includes('philosophy') || f.includes('sentiments') || f.includes('dao_duc') || f.includes('triet_hoc')) {
        return 'ethics';
    }

    // 4. LAW & POLITICS
    if (f.includes('law') || f.includes('politics') || f.includes('jurisprudence') || f.includes('phap_luat') || f.includes('chinh_tri')) {
        return 'politics';
    }

    // 5. RHETORIC & LETTERS
    if (f.includes('rhetoric') || f.includes('letters') || f.includes('belles') || f.includes('tu_tuong') || f.includes('ngon_ngu')) {
        return 'literature';
    }

    // Legacy / Fallback mapping
    if (f.startsWith('essay_')) return 'economics';
    if (f.startsWith('topic_')) return 'ethics';
    if (f.startsWith('vn_') || f.startsWith('archive_')) return 'economics';

    return 'economics'; // Default
}

function getArticlesFromDir(dirPath: string): { pillarId: string; article: ArticleConfig }[] {
    if (!fs.existsSync(dirPath)) return [];

    // Check if it's a directory or symlink
    try {
        const stats = fs.statSync(dirPath);
        if (!stats.isDirectory()) return [];
    } catch (e) {
        return [];
    }

    const fileNames = fs.readdirSync(dirPath).sort();
    return fileNames
        .filter(fileName => fileName.endsWith('.md') && !fileName.includes('Prompts'))
        .map(fileName => {
            const fullPath = path.join(dirPath, fileName);
            let fileContents = '';
            try {
                fileContents = fs.readFileSync(fullPath, 'utf8');
            } catch (e) {
                console.error(`Error reading file ${fullPath}`, e);
                return null;
            }

            if (!fileContents) return null;

            const { data } = matter(fileContents);
            const pillarId = classifyPillar(fileName, dirPath);
            const slug = fileName.replace(/\.md$/, '');

            const result: { pillarId: string; article: ArticleConfig } = {
                pillarId,
                article: {
                    slug: slug,
                    sourceFile: fileName,
                    fullPath: fullPath,
                    title: data.title || slug.replace(/_/g, ' '),
                    description: data.description || "Tài liệu lưu trữ"
                }
            };
            return result;
        })
        .filter((item): item is { pillarId: string; article: ArticleConfig } => item !== null);
}

export function getPillars(): PillarConfig[] {
    // 1. Read files from root directories
    const contentArticles = getArticlesFromDir(contentDirectory);
    const archiveArticles = getArticlesFromDir(archivesDirectory);
    const archiveVnArticles = getArticlesFromDir(archivesVnDirectory);

    // 2. Group by Pillar
    const pillars: Record<string, PillarConfig> = {};

    // Initialize pillars structure based on META
    Object.keys(PILLAR_META).forEach(id => {
        const meta = PILLAR_META[id];
        if (meta) {
            pillars[id] = {
                ...meta,
                articles: []
            };

            // Scan specific subdirectories for each pillar
            if (meta.subtitle) {
                // 1. Scan in Adam_Smith_Archives_VN
                const subDirPath = path.join(archivesVnDirectory, meta.subtitle);
                const neuronArticles = getArticlesFromDir(subDirPath);
                neuronArticles.forEach(({ article }) => {
                    pillars[id].articles!.push(article);
                });

                // 2. ALSO scan root-level Neurons folders (e.g., d:\nietzsche-chronicle\02_Kinh_Te_Thinh_Vuong_Neurons)
                const rootSubDirPath = path.join(rootNeuronsDirectory, meta.subtitle);
                if (rootSubDirPath !== subDirPath) {
                    const rootNeuronArticles = getArticlesFromDir(rootSubDirPath);
                    rootNeuronArticles.forEach(({ article }) => {
                        // Avoid duplicates
                        const exists = pillars[id].articles?.some(a => a.slug === article.slug);
                        if (!exists) {
                            pillars[id].articles!.push(article);
                        }
                    });
                }
            }
        }
    });

    const allArticles = [...contentArticles, ...archiveArticles, ...archiveVnArticles];

    // Ensure a default pillar exists if articles don't match any META
    const fallbackId = 'economics'; // Everything else is a "Work"
    if (!pillars[fallbackId]) {
        pillars[fallbackId] = {
            id: fallbackId,
            name: 'Archives',
            nameVi: 'Kho Lưu Trữ',
            description: 'Tài liệu bổ sung',
            icon: 'archive',
            color: '#d4af37',
            articles: []
        };
    }

    // Distribute root articles to pillars
    allArticles.forEach(({ pillarId, article }) => {
        if (pillars[pillarId]) {
            // Avoid duplicates if already added from subDir
            const exists = pillars[pillarId].articles?.some(a => a.slug === article.slug);
            if (!exists) {
                pillars[pillarId].articles!.push(article);
            }
        }
    });

    // FINAL STEP: Sort all articles in each pillar chronologically by filename (01_ to 07_)
    const result = Object.values(pillars);
    result.forEach(p => {
        if (p.articles) {
            p.articles.sort((a, b) => a.sourceFile.localeCompare(b.sourceFile));
        }
    });

    return result;
}


export function getPillarById(id: string) {
    const pillars = getPillars();
    return pillars.find(p => p.id === id);
}

export function getArticle(pillarId: string, slug: string) {
    const pillar = getPillarById(pillarId);
    if (!pillar) return undefined;

    // We need to know WHERE the file is to read its content in full later, 
    // but ArticleConfig only stores sourceFile name. 
    // Ideally update ArticleConfig to store fullPath, but that might break frontend serialization.
    // For now, checks are done by slug matching.
    return pillar.articles?.find(a => a.slug === slug);
}

export function getAllArticleSlugs() {
    const pillars = getPillars();
    const slugs: { pillar: string; slug: string }[] = [];
    pillars.forEach(p => {
        p.articles?.forEach(a => {
            slugs.push({ pillar: p.id, slug: a.slug });
        });
    });
    return slugs;
}

export function getAllArticlesFlat() {
    const pillars = getPillars();
    const articles: any[] = [];
    pillars.forEach(p => {
        p.articles?.forEach(a => {
            articles.push({
                ...a,
                pillarId: p.id,
                pillarName: p.nameVi || p.name,
                pillarColor: p.color
            });
        });
    });
    return articles;
}

