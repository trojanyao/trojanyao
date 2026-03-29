'use client';

import dynamic from 'next/dynamic';

import SkillListSkeleton from './SkillListSkeleton';

const SkillGroup = dynamic(() => import('./SkillGroup'), {
  // Reuse the same layout as the Suspense fallback so cold starts never flash blank
  // while the lazy chunk downloads after streamed data is ready.
  loading: () => <SkillListSkeleton />,
});

export default function SkillGroupDynamic({ skills }: { skills: Skill[] }) {
  return <SkillGroup skills={skills} />;
}
