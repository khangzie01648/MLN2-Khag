import { getAllArticlesFlat } from '../../../lib/content-config';
import LibraryExplorer from '../../../components/library/LibraryExplorer';

export default function LibraryPage() {
    const articles = getAllArticlesFlat();

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Glow Effect behind title */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#d4af37] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 space-y-4">
                    <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#d4af37] to-[#8a7020] animate-fade-in-up">
                        KHO TÀNG CỦA C.G. ADAM SMITH
                    </h1>
                    <p className="font-inter text-lg text-gray-400 max-w-2xl mx-auto italic">
                        "Người không có cảm giác về Lịch sử thì giống như một người không có tai hoặc mắt."
                    </p>
                </div>

                {/* Decorative divider */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-8 opacity-50"></div>
            </section>

            {/* Main Content */}
            <LibraryExplorer articles={articles} />
        </div>
    );
}

// Simple internal component to avoid server/client conflict if I used motion here directly
// But wait, LibraryExplorer is client. Page is server.
// I can't use motion.div here unless I make a registry or use a client wrapper for the title too.
// For now, I'll stick to standard HTML for the title to keep it Server Component simple,
// or I can move the Hero into LibraryExplorer?
// BETTER: Move Hero into LibraryExplorer? No, separating fetching is good.
// I will just use standard CSS classes for the Title animation or keep it static for now.
// The prompt "motion_div_placeholder" was a thought, I will replace it with standard div.
