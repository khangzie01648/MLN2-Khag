'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import FixedBackground from '@/components/ui/FixedBackground';

export default function ArchiveReader({ content, metadata }: { content: string, metadata: any }) {
    const [activeId, setActiveId] = useState<string>('');

    // Extract headings for Table of Contents
    const headings = content.match(/^##\s+(.+)$/gm)?.map(h => h.replace(/^##\s+/, '')) || [];

    return (
        <div className="min-h-screen bg-transparent text-[#ececec] relative">
            {/* Background Video - Portaled to Body */}
            <FixedBackground src="/vid3.mp4" />

            {/* Navigation Bar */}
            <div className="fixed top-0 left-0 w-full z-50 bg-[#0a0b10]/90 backdrop-blur border-b border-[#d4af37]/20 px-6 py-4 flex items-center justify-between">
                <Link href="/select/library" className="flex items-center gap-2 text-[#d4af37] hover:text-[#f1c40f] transition-colors font-cinzel font-bold">
                    <ChevronLeft size={20} />
                    QUAY LẠI THƯ VIỆN
                </Link>
                <span className="text-xs text-gray-500 uppercase tracking-widest hidden md:block">{metadata.title}</span>
                <div className="w-8"></div> {/* Spacer */}
            </div>

            <div className="pt-24 pb-20 max-w-7xl mx-auto flex gap-12 px-4 relative">

                {/* Main Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 max-w-4xl"
                >
                    {/* Header */}
                    <header className="mb-12 border-b border-[#d4af37]/30 pb-8">
                        <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest mb-2 block border-l-2 border-[#d4af37] pl-3">
                            {metadata.pillarName}
                        </span>
                        <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-[#ececec] leading-tight mb-6">
                            {metadata.title}
                        </h1>
                        <p className="font-inter text-lg text-gray-400 italic font-light border-l-4 border-gray-700 pl-4 py-2">
                            {metadata.description}
                        </p>
                    </header>

                    {/* Markdown Content */}
                    <article className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-cinzel prose-headings:text-[#d4af37] 
            prose-p:font-serif prose-p:text-gray-300 prose-p:leading-relaxed
            prose-blockquote:border-l-[#d4af37] prose-blockquote:bg-[#14161f] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic
            prose-strong:text-white prose-em:text-[#d4af37]
            prose-li:text-gray-300
            prose-img:rounded-lg prose-img:shadow-2xl prose-img:border prose-img:border-[#d4af37]/20
            selection:bg-[#d4af37]/30 selection:text-white
          ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h2: ({ node, ...props }: any) => {
                                    const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
                                    return <h2 id={id} className="scroll-mt-32" {...props} />
                                }
                            } as any}
                        >
                            {content}
                        </ReactMarkdown>
                    </article>

                    {/* Footer Signature */}
                    <div className="mt-20 pt-10 border-t border-[#d4af37]/20 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 opacity-50 bg-[url('/chakra_mandala.png')] bg-contain bg-no-repeat bg-center"></div>
                        <p className="font-cinzel text-[#d4af37]/60 text-sm">TOÀN THƯ CARL GUSTAV ADAM SMITH</p>
                    </div>
                </motion.div>

                {/* Sticky Table of Contents (Desktop Only) */}
                <aside className="hidden lg:block w-64 sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto pr-2 no-scrollbar">
                    <div className="border-l border-[#d4af37]/20 pl-4">
                        <h3 className="font-cinzel text-[#d4af37] font-bold mb-6 text-sm uppercase tracking-wider">Mục Lục</h3>
                        <ul className="space-y-4">
                            {headings.length > 0 ? headings.map((heading, idx) => {
                                const id = heading.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                                return (
                                    <li key={idx}>
                                        <a
                                            href={`#${id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="text-sm text-gray-500 hover:text-[#d4af37] transition-colors block leading-tight font-inter"
                                        >
                                            {heading}
                                        </a>
                                    </li>
                                )
                            }) : (
                                <li className="text-gray-600 text-xs italic">Không có mục lục chi tiết.</li>
                            )}
                        </ul>
                    </div>
                </aside>

            </div>
        </div>
    );
}
