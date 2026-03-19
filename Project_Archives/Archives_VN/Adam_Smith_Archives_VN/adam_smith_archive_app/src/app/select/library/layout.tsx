import type { Metadata } from 'next';
import { Cinzel, Inter, Playfair_Display } from 'next/font/google';
import '../../globals.css';

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
    title: 'Thư Viện Số Carl Adam Smith (The Digital Library)',
    description: 'Kho tàng kiến thức đồ sộ về Tâm lý học Phân tích, Giả kim thuật và Sách Đỏ.',
};

export default function LibraryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${cinzel.variable} ${inter.variable} ${playfair.variable} bg-[#0a0b10] text-[#ececec] min-h-screen font-sans`} suppressHydrationWarning>
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
                <svg className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            <main className="relative z-10 w-full">
                {children}
            </main>
        </div>
    );
}
