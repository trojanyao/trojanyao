'use client';

import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import { FolderOpenIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Line from '@/app/[locale]/components/ui/Line';

import SkillGridSkeleton from './SkillGridSkeleton';

export default function SkillListSkeleton() {
  const t = useTranslations('skill');
  const staticGroupByOptions: GroupOptionItem[] = [
    { icon: <RectangleStackIcon />, key: 'status', text: t('group.proficiency') },
    { icon: <FolderOpenIcon />, key: 'category', text: t('group.category') },
  ];

  const skeletonArray = [
    { text: t('level.proficient'), count: 15 },
    { text: t('level.familiar'), count: 12 },
  ];

  return (
    <div>
      <SectionHeader title={t('dev-skill')} icon={<CodeBracketSquareIcon />}>
        {/* Mirror GroupBy markup so the toolbar stays visible while loading. */}
        <div className="flex items-center gap-2">
          {staticGroupByOptions.map((option) => (
            <div
              key={option.key}
              className={`px-2 py-1.5 rounded-lg flex gap-1 ${
                option.key === 'status' ? 'bg-light-blue text-blue' : 'text-secondary'
              }`}
            >
              <span className="size-4">{option.icon}</span>
              <span
                className={`${option.key === 'status' ? 'inline' : 'hidden'} sm:inline text-small whitespace-nowrap`}
              >
                {option.text}
              </span>
            </div>
          ))}
        </div>
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
