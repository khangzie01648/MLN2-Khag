'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

const ManualOverlay = () => {
    const [isOpen, setIsOpen] = useState(false);

    const steps = [
        {
            icon: "🌑",
            title: "GIAI ĐOẠN 1: PHÁ VỠ HƯ VÔ",
            subtitle: "THE INITIALIZE",
            content: "Đây là cổng vào. Rê chuột vào chữ INITIALIZE để thấy hiệu ứng 'hút' hồn, sau đó nhấn chuột trái để khởi động đoạn phim biến hình siêu ảo diệu đưa bạn vào không gian 3D sâu thẳm."
        },
        {
            icon: "🧬",
            title: "GIAI ĐOẠN 2: 'HACK' NÃO BỘ",
            subtitle: "NEURAL HOLOGRAM",
            content: "Trạm đồng bộ hóa. Bạn phải làm khối não 3D bùng nổ:\n• Webcam: Đưa tay ra trước kính, dùng cử chỉ 'pinch' để vần quả cầu to ra.\n• Thủ công: Kéo bảng điều khiển, đổi màu (Holo-Core). Làm nó to hết cỡ (> 9.2x) để xuyên không!"
        },
        {
            icon: "🏰",
            title: "GIAI ĐOẠN 3: ĐẠI SẢNH 8 CỬA",
            subtitle: "ADAM SMITH DOORS",
            content: "Hành lang bí ẩn với 8 cánh cửa khổng lồ. Dùng phím di chuyển hoặc chuột để tiến tới. Mỗi cửa là một Trụ cột (Pillar) tri thức: Biography, Economics, Ethics... Hãy bắt đầu từ Biography!"
        },
        {
            icon: "✨",
            title: "GIAI ĐOẠN 4: SĂN NGỌC TRÊN CÂY",
            subtitle: "THE PILLAR DIORAMA",
            content: "Thế giới 3D choáng ngợp với cái cây vĩnh cửu. Dùng chuột xoay, kéo, zoom để khám phá. Nhấn vào 7 viên ngọc đang bay để mở khóa các bài viết bí mật của chương đó."
        },
        {
            icon: "📖",
            title: "GIAI ĐOẠN 5: THU THẬP LINH HỒN",
            subtitle: "READING & INVENTORY",
            content: "Giao diện đọc chuyên sâu. Trả lời các câu hỏi 'hack não' để tích lũy vào Psychological Inventory. Hệ thống sẽ phân tích xem bạn là kiểu người Shadow hay Archetype nào."
        },
        {
            icon: "🌀",
            title: "GIAI ĐOẠN 6: KIỆT TÁC MANDALA",
            subtitle: "KẾT THÚC CỰC ĐỈNH",
            content: "Toàn bộ lựa chọn của bạn sẽ được 'đúc' lại thành tác phẩm nghệ thuật Mandala duy nhất. Đây chính là bản đồ tư duy và linh hồn của bạn sau hành trình tiến hóa này."
        }
    ];

    return (
        <>
            {/* FLOATING INFO BUTTON - FIXED POSITION MATCHING USER IMAGE STYLE */}
            <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(218, 165, 32, 0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed top-6 right-6 z-[60] w-12 h-12 rounded-full border border-[#daa520]/40 flex items-center justify-center bg-black/40 backdrop-blur-md text-[#daa520] group transition-all duration-300 shadow-[0_0_20px_rgba(218, 165, 32, 0.1)]"
            >
                <div className="relative flex items-center justify-center">
                    <Info size={22} className="relative z-10" />
                    <motion.div
                        animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-[-10px] rounded-full bg-[#daa520]/10 blur-sm"
                    />
                </div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        {/* MODAL CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-5xl max-h-[90vh] bg-[#050505] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]"
                        >
                            {/* HEADER */}
                            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#daa520]/5 to-transparent">
                                <div>
                                    <h2 className="text-[10px] tracking-[0.5em] uppercase text-[#daa520] font-black mb-1">Archive Protocol</h2>
                                    <h3 className="text-3xl font-cinzel font-bold text-white tracking-widest uppercase">Giao thức Điều hướng</h3>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group"
                                >
                                    <X className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                                </button>
                            </div>

                            {/* BODY - SCROLLABLE CONTENT */}
                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {steps.map((step, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-[#daa520]/30 transition-all duration-500"
                                        >
                                            <div className="flex items-start gap-6">
                                                <div className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{step.icon}</div>
                                                <div>
                                                    <div className="flex flex-col mb-4">
                                                        <span className="text-[9px] font-black text-[#daa520]/80 tracking-[0.3em] uppercase">{step.subtitle}</span>
                                                        <h4 className="text-sm font-bold text-white tracking-widest uppercase">{step.title}</h4>
                                                    </div>
                                                    <p className="text-xs text-white/50 leading-relaxed font-light whitespace-pre-line group-hover:text-white/70 transition-colors">
                                                        {step.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* FOOTER TIPS */}
                                <div className="mt-10 p-8 border-t border-white/5 bg-white/[0.01] rounded-3xl">
                                    <h5 className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase mb-4">Mẹo chuyên gia (Pro Tips)</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <div className="text-amber-500/60 font-black text-xs">01 / ÂM THANH</div>
                                            <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-tighter">Đeo tai nghe để cảm nhận không gian âm thanh vòm 360 độ.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-amber-500/60 font-black text-xs">02 / HIỆU NĂNG</div>
                                            <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-tighter">Nếu lag, hãy ưu tiên tab này và tắt các ứng dụng chạy ngầm.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-amber-500/60 font-black text-xs">03 / KHÁM PHÁ</div>
                                            <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-tighter">Mỗi ngóc ngách 3D đều ẩn chứa bí mật. Đừng ngại xoay góc camera!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DECORATIVE BOTTOM LINE */}
                            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#daa520]/50 to-transparent" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(218, 165, 32, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(218, 165, 32, 0.6);
                }
            `}</style>
        </>
    );
};

export default ManualOverlay;
