import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GlitchTransition() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Gấp 4 tờ giấy từ 4 góc vào giữa
    const folds = [
        // Top-half: gập xuống dưới (rotateX âm = lật về phía người xem từ trên)
        {
            id: 'top',
            className: 'top-0 left-0 right-0',
            style: { height: '50%', transformOrigin: 'bottom center' },
            animate: { rotateX: -180, opacity: [1, 1, 0] },
            delay: 0,
        },
        // Bottom-half: gập lên trên
        {
            id: 'bottom',
            className: 'bottom-0 left-0 right-0',
            style: { height: '50%', transformOrigin: 'top center' },
            animate: { rotateX: 180, opacity: [1, 1, 0] },
            delay: 0.05,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 1 }}
            className="fixed inset-0 z-[150] pointer-events-none overflow-hidden"
            style={{ perspective: '1200px' }}
        >
            {/* Backdrop tối từ từ rơi vào sau khi các tờ giấy gập xong */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="absolute inset-0 bg-black z-[-1]"
            />

            {/* ---- 2 nửa màn hình gấp lại ---- */}
            {folds.map(fold => (
                <motion.div
                    key={fold.id}
                    className={`absolute left-0 right-0 ${fold.className} backdrop-grayscale`}
                    style={{
                        ...fold.style,
                        transformStyle: 'preserve-3d',
                        // Phủ màu nền đen để giả tờ giấy
                        background: 'linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(5,5,5,1) 100%)',
                        borderTop: fold.id === 'bottom' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                        borderBottom: fold.id === 'top' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    }}
                    animate={fold.animate}
                    transition={{
                        duration: 0.65,
                        delay: fold.delay,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    {/* Ánh phản chiếu (Crease highlight) làm tờ giấy có độ sâu */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                fold.id === 'top'
                                    ? 'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.15) 95%, rgba(255,255,255,0.4) 100%)'
                                    : 'linear-gradient(to top, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.15) 95%, rgba(255,255,255,0.4) 100%)',
                        }}
                    />
                </motion.div>
            ))}

            {/* Nếp gấp (Crease line) ở giữa màn hình — vệt sáng mảnh xuất hiện đúng lúc 2 tờ gặp nhau */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: [0, 0.8, 0], scaleX: [0, 1, 1] }}
                transition={{ duration: 0.5, delay: 0.1, times: [0, 0.4, 1] }}
                className="absolute top-1/2 left-0 right-0 h-[2px] bg-white origin-center -translate-y-1/2"
                style={{
                    boxShadow: '0 0 20px 4px rgba(255,255,255,0.8), 0 0 60px 15px rgba(200,200,200,0.3)',
                }}
            />

            {/* Màn hình trắng lấp đầy SAU KHI gập xong */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.75, ease: 'easeIn' }}
                className="absolute inset-0 bg-white z-[10]"
            />
        </motion.div>
    );
}
