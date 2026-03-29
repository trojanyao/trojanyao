'use client';

import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Line from '@/app/[locale]/components/ui/Line';

import SkillGridSkeleton from './SkillGridSkeleton';

export default function SkillListSkeleton() {
  const t = useTranslations('skill');

  const skeletonArray = [
    { text: t('level.proficient'), count: 15 },
    { text: t('level.familiar'), count: 12 },
  ];

  return (
    <div>
      <SectionHeader title={t('dev-skill')} icon={<CodeBracketSquareIcon />}>
        {/* Avoid CLS */}
        <div className="h-7" />
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {skeletonArray.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-4">
            <div className="title-small text-secondary">{item.text}</div>

            <SkillGridSkeleton length={item.count} />
          </div>
        ))}
      </div>
    </div>
  );
}
