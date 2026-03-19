import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, ShieldCheck, Cpu, User } from 'lucide-react';

const ProjectCredits = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔹 THE FLOATING INFO BUTTON */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(218, 165, 32, 0.2)' }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full border border-[#daa520]/40 bg-black/40 backdrop-blur-md flex items-center justify-center text-[#daa520] shadow-[0_0_20px_rgba(218,165,32,0.1)] transition-all duration-300"
      >
        <Info size={24} />
        {/* Subtle Breathing Light */}
        <motion.div
           animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
           transition={{ duration: 3, repeat: Infinity }}
           className="absolute inset-0 rounded-full bg-[#daa520]/10"
        />
      </motion.button>

      {/* 🔹 CREDIT OVERLAY MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-[#daa520]/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-neutral-900 to-black p-6 border-b border-[#daa520]/10 flex justify-between items-center">
                <h3 className="font-cinzel text-xl text-[#daa520] tracking-widest uppercase">Thông Tin Hệ Thống</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6">
                
                {/* Member Section */}
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-lg bg-[#daa520]/10 flex items-center justify-center text-[#daa520] shrink-0 border border-[#daa520]/20">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">Nhóm Nghiên Cứu Chính</h4>
                    <p className="text-sm text-white font-medium group-hover:text-[#daa520] transition-colors duration-500">Ngô Huy Quang Trường (SE151285)</p>
                    <p className="text-sm text-white font-medium group-hover:text-[#daa520] transition-colors duration-500">Nguyễn Duy Khang (SE180170)</p>
                  </div>
                </div>

                {/* AI Section */}
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">Hệ Sinh Thái AI & Công Cụ</h4>
                    <p className="text-sm text-blue-300 font-medium">Antigravity, Claude, Blender, Grok,</p>
                    <p className="text-sm text-blue-300 font-medium">OpenClaw, Gemini, NotebookLM</p>
                  </div>
                </div>

                {/* Disclosure */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex gap-3 items-center mb-3">
                    <ShieldCheck size={16} className="text-[#daa520]/60" />
                    <h4 className="text-[10px] font-mono text-[#daa520]/60 uppercase tracking-[0.2em]">Giao Thức Công Bố AI</h4>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed font-light italic">
                    "Kho lưu trữ kỹ thuật số này là một công trình tái thiết được tăng cường bởi AI. Toàn bộ nội dung, bản đồ dữ liệu và các thành phần trực quan đã được tạo ra thông qua sự cộng tác hệ thống giữa ý tưởng của con người và trí tuệ nhân tạo tự chủ."
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCredits;
