import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { getAllArticlesFlat } from '@/lib/content-config';
import ArchiveReader from '@/components/library/ArchiveReader';

export async function generateStaticParams() {
    const articles = getAllArticlesFlat();
    return articles.map((article: any) => ({
        slug: article.slug,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const articles = getAllArticlesFlat();
    const article = articles.find((a: any) => a.slug === slug);

    if (!article) {
        notFound();
    }

    // Read content
    let content = '';
    // Prioritize fullPath if available
    if (article.fullPath) {
        if (fs.existsSync(article.fullPath)) {
            content = fs.readFileSync(article.fullPath, 'utf8');
        }
    } else {
        // Fallback: try to construct path based on Pillar (Legacy method)
        // This might fail for archives if fullPath isn't set, but we handled that in config.
        // If we are here, content shouldn't be empty unless file missing.

        // Try content directory
        const contentDir = path.join(process.cwd(), 'content', article.sourceFile);
        if (fs.existsSync(contentDir)) {
            content = fs.readFileSync(contentDir, 'utf8');
        }

        // Try archive directory if still empty
        if (!content) {
            const archiveDir = path.resolve(process.cwd(), '../adam_smith_archive_final', article.sourceFile);
            if (fs.existsSync(archiveDir)) {
                content = fs.readFileSync(archiveDir, 'utf8');
            }
        }
    }

    if (!content) {
        return <div className="p-20 text-center text-red-500">Error: Could not read file content.</div>;
    }

    // Clean Frontmatter from content for display? 
    // actually react-markdown might render yaml as table or text.
    // gray-matter is better to strip it.
    const matter = require('gray-matter');
    const parsed = matter(content);

    return (
        <ArchiveReader content={parsed.content} metadata={{ ...article, ...parsed.data }} />
    );
}
