"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
    { text: "One does not become enlightened by imagining figures of light, but by making the darkness conscious.", translation: "Người ta không trở nên giác ngộ bằng cách tưởng tượng ra ánh sáng, mà bằng cách làm cho bóng tối trở nên có ý thức." },
    { text: "The most terrifying thing is to accept oneself completely.", translation: "Điều đáng sợ nhất trên đời là chấp nhận bản thân mình một cách trọn vẹn." },
    { text: "Until you make the unconscious conscious, it will direct your life and you will call it fate.", translation: "Chừng nào bạn chưa làm cho cái vô thức trở thành ý thức, nó sẽ điều khiển cuộc đời bạn và bạn sẽ gọi đó là số phận." },
    { text: "Who looks outside, dreams; who looks inside, awakes.", translation: "Kẻ nhìn ra ngoài thì mơ mộng; kẻ nhìn vào trong thì tỉnh thức." },
    { text: "Neurosis is always a substitute for legitimate suffering.", translation: "Bệnh thần kinh luôn là một sự thay thế cho những khổ đau chính đáng." },
    { text: "I am not what happened to me, I am what I choose to become.", translation: "Tôi không phải là những gì đã xảy ra với tôi, tôi là những gì tôi chọn trở thành." },
    { text: "Show me a sane man and I will cure him for you.", translation: "Hãy chỉ cho tôi một kẻ tỉnh táo bình thường, và tôi sẽ chữa khỏi cho hắn." },
    { text: "Where love rules, there is no will to power.", translation: "Nơi nào tình yêu cai trị, nơi đó không có ý chí quyền lực." },
    { text: "The privilege of a lifetime is to become who you truly are.", translation: "Đặc quyền của một đời người là được trở thành chính con người thật của mình." },
    { text: "Life really does begin at forty. Up until then, you are just doing research.", translation: "Cuộc đời thực sự bắt đầu ở tuổi 40. Trước đó, bạn chỉ đang làm nghiên cứu thị trường mà thôi." },
    { text: "We cannot change anything unless we accept it.", translation: "Chúng ta không thể thay đổi bất cứ điều gì nếu chúng ta không chấp nhận nó trước đã." },
    { text: "I don't need to believe. I know.", translation: "Tôi không cần phải tin. Tôi BIẾT." },
];

const ARCHETYPES = [
    { name: "THE SELF", icon: "☀️", desc: "Sự toàn vẹn" },
    { name: "THE SHADOW", icon: "🌑", desc: "Bóng tối" },
    { name: "ANIMA", icon: "💃", desc: "Linh hồn nữ" },
    { name: "ANIMUS", icon: "🦅", desc: "Linh hồn nam" },
    { name: "PERSONA", icon: "🎭", desc: "Mặt nạ" },
    { name: "THE WISE OLD MAN", icon: "🧙‍♂️", desc: "Minh triết" },
    { name: "THE TRICKSTER", icon: "🃏", desc: "Kẻ lừa gạt" },
];

export default function SynchronicityOracle() {
    const [result, setResult] = useState<{ quote: typeof QUOTES[0], archetype: typeof ARCHETYPES[0] } | null>(null);
    const [isRolling, setIsRolling] = useState(false);

    const handleRoll = () => {
        setIsRolling(true);
        setResult(null);
        setTimeout(() => {
            const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            const randomArchetype = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
            setResult({ quote: randomQuote, archetype: randomArchetype });
            setIsRolling(false);
        }, 2000);
    };

    return (
        <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden bg-black/20">
            {/* Background Bloom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-2xl font-cinzel text-purple-200 tracking-[0.5em] mb-16 uppercase flex items-center justify-center gap-6"
                >
                    <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-purple-500/50"></span>
                    Synchronicity Oracle
                    <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-purple-500/50"></span>
                </motion.h2>

                <div className="min-h-[400px] flex flex-col items-center justify-center perspective-[1000px]">
                    <AnimatePresence mode="wait">
                        {!result && !isRolling && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                key="intro"
                                className="relative z-10 flex flex-col items-center"
                            >
                                <div className="text-7xl mb-8 opacity-20 animate-pulse grayscale brightness-50">🎲</div>
                                <p className="text-purple-100/40 mb-10 font-light italic tracking-widest text-lg max-w-lg">
                                    "Không có gì là ngẫu nhiên. Vô thức tập thể đang chờ câu hỏi của bạn."
                                </p>
                                <button
                                    onClick={handleRoll}
                                    className="relative group px-12 py-5 bg-transparent overflow-hidden border border-purple-500/30 hover:border-purple-400 text-purple-300 hover:text-white rounded-sm transition-all tracking-[0.3em] uppercase text-xs"
                                >
                                    <div className="absolute inset-0 bg-purple-900/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <span className="relative z-10 font-bold">Gieo Quẻ</span>
                                </button>
                            </motion.div>
                        )}

                        {isRolling && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key="rolling"
                                className="flex flex-col items-center justify-center"
                            >
                                {/* MYSTICAL LOADER */}
                                <div className="relative w-32 h-32 mb-8">
                                    <div className="absolute inset-0 border border-purple-500/30 rounded-full animate-[spin_3s_linear_infinite]" />
                                    <div className="absolute inset-4 border border-purple-400/20 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                                    <div className="absolute inset-10 bg-purple-500/10 blur-xl rounded-full animate-pulse" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-purple-500 animate-ping">✦</div>
                                </div>
                                <span className="text-xs tracking-[0.5em] text-purple-300/40 uppercase animate-pulse">Đang triệu hồi Cổ mẫu...</span>
                            </motion.div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, rotateX: 90 }}
                                animate={{ opacity: 1, rotateX: 0 }}
                                transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                                className="relative w-full max-w-xl bg-black/80 backdrop-blur-xl border border-purple-500/20 p-1 rounded-xl shadow-[0_20px_60px_-15px_rgba(88,28,135,0.3)]"
                            >
                                {/* TAROT CARD BORDER EFFECT */}
                                <div className="absolute inset-0 border border-white/5 m-1 rounded-lg pointer-events-none" />
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-50 blur-sm rounded-xl" />

                                <div className="px-8 py-12 rounded-lg flex flex-col items-center text-center h-full relative overflow-hidden">
                                    {/* Background Noise for Card */}
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />

                                    <div className="relative z-10 mb-8 w-24 h-24 flex items-center justify-center bg-purple-950/30 rounded-full border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] group">
                                        <div className="text-5xl group-hover:scale-110 transition-transform duration-500">{result.archetype.icon}</div>
                                    </div>

                                    <h3 className="text-base font-bold text-purple-300 uppercase tracking-[0.4em] mb-4">{result.archetype.name}</h3>
                                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-8" />

                                    <blockquote className="text-xl md:text-3xl font-cinzel text-white/90 leading-normal mb-8 max-w-md mx-auto drop-shadow-lg">
                                        "{result.quote.text}"
                                    </blockquote>

                                    <p className="text-sm text-gray-400 italic font-serif opacity-70">
                                        {result.quote.translation}
                                    </p>

                                    <button
                                        onClick={handleRoll}
                                        className="absolute bottom-4 right-6 text-[10px] text-white/20 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="group-hover:-rotate-180 transition-transform duration-500">↻</span> Gieo lại
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
