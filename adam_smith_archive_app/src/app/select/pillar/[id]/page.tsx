import { notFound } from 'next/navigation';
import { getPillarById, getPillars } from '@/lib/content-config';
import PillarPageTemplate from '@/components/templates/PillarPageTemplate';
import { PILLAR_OBJECT_MAP, PILLAR_SCALE_MAP } from '@/lib/pillar-objects';

interface PillarPageRouteProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const pillars = getPillars();
    return pillars.map((p) => ({
        id: p.id,
    }));
}

export default async function DynamicPillarPage({ params }: PillarPageRouteProps) {
    const { id } = await params;

    // Fetch real data from the file system (All articles!)
    const pillarData = getPillarById(id);

    if (!pillarData) {
        notFound();
    }

    // Attach the 3D Object component and scale
    const enhancedPillar = {
        ...pillarData,
        Object: PILLAR_OBJECT_MAP[id] || PILLAR_OBJECT_MAP['concepts'],
        baseScale: PILLAR_SCALE_MAP[id] || 1.0
    };

    // Sort articles by order if available
    const sortedArticles = (pillarData.articles || []).sort((a, b) => {
        const orderA = parseInt(a.slug.split('_')[1]) || 99;
        const orderB = parseInt(b.slug.split('_')[1]) || 99;
        return orderA - orderB;
    });

    return <PillarPageTemplate pillar={enhancedPillar} articles={sortedArticles} />;
}
