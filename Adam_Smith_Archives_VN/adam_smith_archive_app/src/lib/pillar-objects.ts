import PocketWatch from '@/components/3d/objects/PocketWatch';
import GoldenGears from '@/components/3d/objects/GoldenGears';
import SilverMirror from '@/components/3d/objects/SilverMirror';
import ScalesOfJustice from '@/components/3d/objects/ScalesOfJustice';
import FloatingQuill from '@/components/3d/objects/FloatingQuill';

export const PILLAR_OBJECT_MAP: Record<string, any> = {
    'biography': PocketWatch,
    'economics': GoldenGears,
    'ethics': SilverMirror,
    'law': ScalesOfJustice,
    'rhetoric': FloatingQuill,
    // Add legacy support just in case
    'philosophy': SilverMirror,
    'esoterica': FloatingQuill,
    'works': GoldenGears,
};

export const PILLAR_SCALE_MAP: Record<string, number> = {
    'biography': 1.6,
    'economics': 1.6,
    'ethics': 1.5,
    'law': 1.2,
    'rhetoric': 1.6,
};
