import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { getPillars, getArticle } from '@/lib/content-config';
import { notFound } from 'next/navigation';
import ArchiveNeuronViewer from '@/components/reading/ArchiveNeuronViewer';

export const dynamic = 'force-dynamic';

interface ReadingPageProps {
    params: Promise<{ id: string; slug: string }>;
}

export default async function ReadingPage({ params }: ReadingPageProps) {
    const { id: pillarId, slug } = await params;

    // 1. Fetch Article from proper path
    const article = getArticle(pillarId, slug);

    if (!article || !article.fullPath || !fs.existsSync(article.fullPath)) {
        notFound();
    }

    const fileContents = fs.readFileSync(article.fullPath, 'utf8');
    const { content } = matter(fileContents);

    // 2. Parse content into Pages
    // Split by the page markers "#### Trang X: Title"
    const pageRegex = /#### Trang (\d+): (.*)/g;
    const pageMarkers = Array.from(content.matchAll(pageRegex));
    
    const pages = await Promise.all(pageMarkers.map(async (match, index) => {
        const pageId = parseInt(match[1]);
        const title = match[2].trim();
        
        // Find text between this marker and the next
        const startIdx = match.index! + match[0].length;
        const nextMatch = pageMarkers[index + 1];
        const rawContent = nextMatch 
            ? content.substring(startIdx, nextMatch.index) 
            : content.substring(startIdx);
            
        const processed = await remark().use(html).process(rawContent);
        
        return {
            id: pageId,
            title,
            content: processed.toString()
        };
    }));

    // If no pages found, create dummy data or handle error
    if (pages.length === 0) {
        // Fallback for simple md files
        const processed = await remark().use(html).process(content);
        pages.push({ id: 1, title: article.title, content: processed.toString() });
    }

    // 3. Define model path based on pillar
    const modelMap: Record<string, string> = {
        'biography': '/01.glb',
        'economics': '/02.glb',
        'ethics': '/03.glb',
        'politics': '/04.glb',
        'literature': '/05.glb',
        'systems': '/06.glb',
        'legacy': '/07.glb'
    };
    const modelPath = modelMap[pillarId] || '/01.glb';

    return (
        <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black">
            <ArchiveNeuronViewer pages={pages} modelPath={modelPath} />
        </div>
    );
}
