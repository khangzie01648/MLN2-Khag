'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Archive, FileText, Hash, Disc, User } from 'lucide-react';

// Icons mapping based on Pillar ID or category
const ICONS: Record<string, any> = {
    compendium: Archive,
    vietnamese_core: BookOpen,
    essays: FileText,
    topics: Hash,
    biography_full: User,
    library: Disc,
    // Fallbacks for original pillars
    alchemy: Disc,
    red_book: Disc,
};

interface Article {
    slug: string;
    sourceFile: string;
    title: string;
    description?: string;
    pillarId: string;
    pillarName: string;
    pillarColor: string;
}

export default function LibraryExplorer({ articles }: { articles: Article[] }) {
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    // Extract unique pillars for filter menu
    const pillars = useMemo(() => {
        const map = new Map<string, string>();
        articles.forEach(a => {
            if (!map.has(a.pillarId)) {
                map.set(a.pillarId, a.pillarName);
            }
        });
        return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
    }, [articles]);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchFilter = filter === 'ALL' || article.pillarId === filter;
            const matchSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
                (article.description || '').toLowerCase().includes(search.toLowerCase());
            return matchFilter && matchSearch;
        });
    }, [articles, filter, search]);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {/* Search & Filter Bar */}
            <div className="sticky top-4 z-40 bg-[#0a0b10]/80 backdrop-blur-md p-4 rounded-xl border border-[#d4af37]/20 shadow-2xl mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">

                {/* Search */}
                <div className="relative w-full md:w-1/3 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d4af37]/70 group-focus-within:text-[#d4af37] transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm tri thức..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#14161f] border border-[#d4af37]/30 text-[#ececec] pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all placeholder:text-gray-600 font-serif"
                    />
                </div>

                {/* Categories (Horizontal Scroll on mobile) */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    <button
                        onClick={() => setFilter('ALL')}
                        className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-all ${filter === 'ALL' ? 'bg-[#d4af37] text-black font-bold border-[#d4af37]' : 'bg-transparent text-[#d4af37] border-[#d4af37]/30 hover:border-[#d4af37]'}`}
                    >
                        Tất Cả
                    </button>
                    {pillars.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setFilter(p.id)}
                            className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap capitalize transition-all ${filter === p.id ? 'bg-[#d4af37] text-black font-bold border-[#d4af37]' : 'bg-transparent text-[#d4af37] border-[#d4af37]/30 hover:border-[#d4af37]'}`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid Simulation (using CSS Grid with auto-fill) */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {filteredArticles.map((article) => {
                        const Icon = ICONS[article.pillarId] || Disc;
                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, type: "spring" }}
                                key={article.slug}
                                className="group relative"
                            >
                                <Link href={`/select/library/${article.slug}`}>
                                    <div className="h-full bg-[#14161f] border border-[#d4af37]/10 rounded-xl overflow-hidden hover:border-[#d4af37]/60 transition-colors duration-500 shadow-lg hover:shadow-[#d4af37]/20 flex flex-col">
                                        {/* Decorative Header (Simulating a Book Spine/Cover top) */}
                                        <div className="h-2 w-full" style={{ backgroundColor: article.pillarColor }}></div>

                                        <div className="p-6 flex-1 flex flex-col gap-4">
                                            <div className="flex justify-between items-start">
                                                <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]/80 border border-[#d4af37]/20 px-2 py-1 rounded">
                                                    {article.pillarName}
                                                </span>
                                                <Icon size={20} color={article.pillarColor} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                            </div>

                                            <h3 className="font-cinzel text-xl text-[#ececec] group-hover:text-[#d4af37] transition-colors leading-tight">
                                                {article.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm line-clamp-3 font-inter leading-relaxed">
                                                {article.description}
                                            </p>
                                        </div>

                                        {/* Footer / Read More */}
                                        <div className="p-4 bg-black/20 border-t border-white/5 flex justify-between items-center mt-auto">
                                            <span className="text-xs text-gray-500 font-mono">{article.sourceFile}</span>
                                            <span className="text-[#d4af37] text-sm font-bold flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                Đọc Ngay →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {filteredArticles.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl font-cinzel text-gray-600">Không tìm thấy tài liệu nào trong hư không...</p>
                </div>
            )}
        </div>
    );
}
