export default function ArticleTemplate({
    title,
    content,
    pillar
}: {
    title: string;
    content: string;
    pillar: { name: string; color: string; id: string }
}) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F4E4C1] to-[#DCC6A8]">
            {/* Top border */}
            <div className="h-12 bg-gradient-to-r from-[#8B0000] via-[#FFD700] to-[#8B0000]" />

            <div className="max-w-4xl mx-auto px-8 py-12">
                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-gray-600">
                    <a href="/select" className="hover:text-[#8B0000]">Home</a>
                    {' / '}
                    <a href={`/select/pillar/${pillar.id}`} className="hover:text-[#8B0000]">{pillar.name}</a>
                    {' / '}
                    <span className="text-[#8B0000]">{title}</span>
                </div>

                {/* Article */}
                <article className="bg-white/60 backdrop-blur-sm rounded-lg p-12 border-4 border-[#FFD700] shadow-2xl">
                    {/* Drop cap + Title */}
                    <div className="mb-8">
                        <h1
                            className="text-5xl font-serif mb-4 leading-tight"
                            style={{ color: pillar.color }}
                        >
                            {title}
                        </h1>
                        <div className="h-1 w-32 bg-gradient-to-r from-[#FFD700] to-transparent" />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                        style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '1.125rem',
                            lineHeight: '1.8',
                            color: '#333'
                        }}
                    />
                </article>
            </div>

            {/* Bottom border */}
            <div className="h-12 bg-gradient-to-r from-[#8B0000] via-[#FFD700] to-[#8B0000] mt-16" />
        </div>
    );
}
