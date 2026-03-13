import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { getPillars } from '@/lib/content-config';
import { notFound } from 'next/navigation';
import OuroborosProgress from '@/components/ui/OuroborosProgress';
import CinematicHeader from '@/components/reading/CinematicHeader';
import FixedBackground from '@/components/ui/FixedBackground';

export const dynamic = 'force-dynamic';

interface ReadingPageProps {
    params: Promise<{ id: string; slug: string }>;
}

export default async function ReadingPage({ params }: ReadingPageProps) {
    const { id: pillarId, slug } = await params;

    // 1. Fetch Pillar Meta
    const allPillars = getPillars();
    const pillarData = allPillars.find(p => p.id === pillarId);

    // 2. Read the REAL markdown file
    const contentPath = path.join(process.cwd(), 'content', `${slug}.md`);

    if (!fs.existsSync(contentPath)) {
        notFound();
    }

    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const { data, content } = matter(fileContents);

    // 3. Convert Markdown to HTML
    const processedContent = await remark()
        .use(html)
        .process(content);
    const contentHtml = processedContent.toString();

    const displayTitle = data.title || slug.replace(/_/g, ' ').toUpperCase();

    return (
        <div className="min-h-screen bg-transparent text-white selection:bg-amber-500 selection:text-black font-light leading-relaxed relative overflow-hidden">
            {/* Background Video Layer - Portaled to Body to avoid Transform Scale issues */}
            <FixedBackground src="/vid3.mp4" />

            {/* Immersive Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0 mix-blend-screen">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            {/* Ouroboros Scroll Progress (Client Component) */}
            <OuroborosProgress color={pillarData?.color || '#ffd700'} />

            {/* Navigation - Minimalist Archival Style */}
            <nav className="sticky top-0 z-50 bg-[#000508]/90 backdrop-blur-xl border-b border-white/5 py-6 font-cinzel">
                <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
                    <Link href={`/select/pillar/${pillarId}`} className="group flex items-center gap-4">
                        <span className="text-amber-500 group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white transition-colors">Quay lại {pillarData?.nameVi}</span>
                    </Link>
                    <div className="hidden md:block text-[10px] tracking-[0.8em] uppercase text-amber-500/50 font-bold">
                        Hồ sơ Tâm thức // Archive Protocol
                    </div>
                    <Link href="/select" className="text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-amber-500 transition-colors">
                        Mandala Hub
                    </Link>
                </div>
            </nav>

            <main className="max-w-[1200px] mx-auto px-8 py-32 relative z-10">
                {/* Article Header (Client Component) */}
                <CinematicHeader
                    title={displayTitle}
                    description={data.description || ""}
                    subtitle={`Xác thực: ${pillarData?.nameVi || "Hồ sơ lưu trữ"}`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Left Sidebar - Meta info */}
                    <aside className="lg:col-span-3 space-y-16">
                        <section className="border-l border-amber-500/20 pl-8 py-4">
                            <h4 className="text-[10px] tracking-[0.3em] uppercase text-amber-500/60 mb-6 font-bold font-cinzel">Ghi chú Lề (Marginalia)</h4>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-[11px] text-white/30 uppercase tracking-widest mb-2 font-mono">Bối cảnh</p>
                                    <p className="text-xs text-white/60 leading-relaxed italic">
                                        Hồ sơ: <span className="text-white">{pillarData?.nameVi}</span>.
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-[11px] text-white/30 uppercase tracking-widest mb-2 font-mono">Cách ngôn</p>
                                    <p className="text-xs text-stone-500 leading-relaxed italic">
                                        &quot;Linh hồn là một mê cung nơi chân lý chỉ xuất hiện trong bóng tối.&quot;
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="pt-12 sticky top-48">
                            <div className="w-16 h-16 rounded-full border border-amber-500/10 flex items-center justify-center mb-6 bg-amber-500/[0.02]">
                                <span className="text-amber-500 font-cinzel text-xl">III</span>
                            </div>
                            <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase leading-loose font-light">
                                Giai đoạn: Đối diện với Chiều sâu. <br />
                                <span className="text-amber-500/50 uppercase">Archive protocol.</span>
                            </p>
                        </div>
                    </aside>

                    {/* Center Column - Rendered Article */}
                    <article className="lg:col-span-9">
                        <div
                            className="markdown-content prose prose-invert prose-amber max-w-none prose-h1:font-cinzel prose-h2:font-cinzel"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                    </article>
                </div>

                {/* Footer Navigation */}
                <footer className="mt-48 pt-24 border-t border-white/5 text-center">
                    <div className="text-[10px] tracking-[1em] uppercase text-white/20 mb-16">
                        Kết thúc Hồ sơ • {pillarData?.nameVi.toUpperCase()}
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <Link href={`/select/pillar/${pillarId}`} className="px-12 py-5 rounded-xl border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 transition-all font-cinzel tracking-[0.4em] text-xs uppercase group">
                            Quay lại <span className="text-white group-hover:text-amber-400 transition-colors">{pillarData?.nameVi}</span>
                        </Link>
                        <Link href="/select/library" className="px-12 py-5 rounded-xl bg-amber-500 text-black font-cinzel tracking-[0.4em] text-xs uppercase font-bold hover:bg-white transition-all shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                            Thư viện Tổng
                        </Link>
                    </div>
                </footer>
            </main>

            {/* Global Vignette */}
            <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] z-50" />
        </div>
    );
}
