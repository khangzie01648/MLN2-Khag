"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYMBOL_DICTIONARY: Record<string, { arch: string; meaning: string }> = {
    "rắn": { arch: "The Serpent", meaning: "Sự chuyển hóa, năng lượng Libido hoặc bản năng nguyên thủy." },
    "nước": { arch: "The Ocean", meaning: "Biểu tượng của Vô thức tập thể, sự thanh tẩy hoặc chìm đắm." },
    "lửa": { arch: "The Fire", meaning: "Sự thiêu rụi cái cũ để tái sinh, năng lượng sáng tạo mạnh mẽ." },
    "mặt nạ": { arch: "The Persona", meaning: "Cái tôi xã hội, những gì bạn đang cố gắng trình diễn cho thế giới." },
    "gương": { arch: "The Shadow", meaning: "Sự phản chiếu của những phần bị kìm nén trong nhân cách." },
    "ngôi nhà": { arch: "The Psyche", meaning: "Cấu trúc của tâm hồn. Các tầng hầm đại diện cho vô thức sâu thẳm." },
    "bay": { arch: "Ascension", meaning: "Khao khát tự do, vượt lên khỏi những ràng buộc vật chất hoặc sự lạm dụng trí tuệ." }
};

export default function DreamJournal() {
    const [dreamText, setDreamText] = useState('');
    const [analysis, setAnalysis] = useState<{ symbol: string; meaning: string; arch: string }[] | null>(null);

    const analyzeDream = () => {
        const foundSymbols: { symbol: string; meaning: string; arch: string }[] = [];
        const textLow = dreamText.toLowerCase();

        Object.keys(SYMBOL_DICTIONARY).forEach(key => {
            if (textLow.includes(key)) {
                foundSymbols.push({ symbol: key, ...SYMBOL_DICTIONARY[key] });
            }
        });

        setAnalysis(foundSymbols.length > 0 ? foundSymbols : []);
    };

    return (
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8 backdrop-blur-md">
            <header className="mb-8">
                <h3 className="text-xl font-cinzel text-white mb-2">Nhật Ký Giấc Mơ (Dream Journal)</h3>
                <p className="text-xs text-white/30 italic uppercase tracking-widest">Lưu trữ các mảnh ghép từ Vô thức đêm.</p>
            </header>

            <div className="space-y-6">
                <textarea
                    value={dreamText}
                    onChange={(e) => setDreamText(e.target.value)}
                    placeholder="Đêm qua bạn đã thấy gì? (Ví dụ: Tôi thấy một con rắn trong hồ nước...)"
                    className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-white/10 resize-none font-light"
                />

                <button
                    onClick={analyzeDream}
                    className="w-full py-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 rounded-lg text-[10px] tracking-[0.4em] uppercase transition-all font-bold"
                >
                    Giải Mã Biểu Tượng
                </button>

                <AnimatePresence>
                    {analysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 pt-4 border-t border-white/5"
                        >
                            {analysis.length > 0 ? (
                                analysis.map((item, idx) => (
                                    <div key={idx} className="p-4 bg-white/[0.03] border border-white/5 rounded-lg group hover:border-amber-500/30 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">{item.arch}</span>
                                            <span className="text-[8px] text-white/20 uppercase">Phát hiện: "{item.symbol}"</span>
                                        </div>
                                        <p className="text-xs text-white/60 leading-relaxed italic">{item.meaning}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-white/20 italic text-center py-4">
                                    Không tìm thấy biểu tượng phổ quát nào. Hãy thử mô tả chi tiết hơn về các vật thể hoặc môi trường.
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
