"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ADAM_SMITH_QUOTES = [
    "Vũ trụ không có ý nghĩa gì nếu không có tâm thức con người.",
    "Bóng tối không chỉ là sự vắng bóng của ánh sáng, nó là một thực tại cần được đối diện.",
    "Giấc mơ là những lá thư từ vô thức gửi đến ý thức mỗi đêm.",
    "Ai nhìn ra ngoài thì mơ mộng, ai nhìn vào trong thì tỉnh thức.",
    "Vàng ròng thường được tìm thấy ở những nơi bẩn thỉu nhất của tâm hồn.",
    "Đừng cố gắng trở nên hoàn hảo, hãy cố gắng trở nên trọn vẹn."
];

export default function ActiveImagination() {
    const [messages, setMessages] = useState<{ role: 'user' | 'philemon'; text: string }[]>([
        { role: 'philemon', text: "Chào mừng bạn đến với Chiều sâu. Tôi là Philemon. Bạn đang tìm kiếm điều gì trong cõi vô thức hôm nay?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Simulate Philemon's reply
        setTimeout(() => {
            const randomQuote = ADAM_SMITH_QUOTES[Math.floor(Math.random() * ADAM_SMITH_QUOTES.length)];
            let reply = "";

            if (userMsg.toLowerCase().includes('shadow') || userMsg.toLowerCase().includes('bóng')) {
                reply = "Shadow là người anh em tối tăm mà bạn đã chối bỏ. Hãy đón nhận nó như một phần của vàng ròng.";
            } else if (userMsg.toLowerCase().includes('dream') || userMsg.toLowerCase().includes('giấc mơ')) {
                reply = "Giấc mơ là ngôn ngữ của vô thức. Bạn có nhớ biểu tượng nào nổi bật nhất không?";
            } else {
                reply = `Thú vị đấy. Hãy nhớ rằng: ${randomQuote}`;
            }

            setMessages(prev => [...prev, { role: 'philemon', text: reply }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[500px] bg-black/40 border border-white/5 rounded-xl overflow-hidden backdrop-blur-md">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-[10px] tracking-[0.4em] uppercase text-amber-500 font-bold">Active Imagination Engine</h3>
                <span className="text-[9px] text-white/20 uppercase tracking-widest">Communicating with Philemon...</span>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                <AnimatePresence>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] p-4 rounded-lg text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-amber-500/10 border border-amber-500/20 text-amber-100'
                                : 'bg-white/[0.05] border border-white/10 text-white/70 italic'
                                }`}>
                                <div className="text-[8px] uppercase tracking-widest opacity-30 mb-2">
                                    {msg.role === 'user' ? 'Người tìm kiếm' : 'Philemon'}
                                </div>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white/[0.02] p-4 rounded-lg">
                            <div className="flex gap-1">
                                <span className="w-1 h-1 bg-white/20 rounded-full animate-bounce" />
                                <span className="w-1 h-1 bg-white/20 rounded-full animate-bounce delay-75" />
                                <span className="w-1 h-1 bg-white/20 rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-black/60 border-t border-white/5 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Đặt một câu hỏi cho linh hồn..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-white/10"
                />
                <button
                    onClick={handleSend}
                    className="px-6 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-[10px] uppercase tracking-widest rounded transition-all border border-amber-500/20"
                >
                    Gửi
                </button>
            </div>
        </div>
    );
}
