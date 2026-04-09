'use client';

import {
  ClockIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Line from '@/app/[locale]/components/ui/Line';

import ProjectItemSkeleton from './ProjectItemSkeleton';

export default function ProjectGroupSkeleton({ title }: { title?: string }) {
  const t = useTranslations('project');
  const skeletonArray = Array.from({ length: 3 });
  const staticGroupByOptions = [
    { icon: <ClockIcon />, text: t('group.by-time'), key: 'dateStart' },
    { icon: <RectangleGroupIcon />, text: t('group.by-platform'), key: 'platform' },
  ];

  return (
    <div>
      <SectionHeader title={`${title || t('dev-project')}`} icon={<Squares2X2Icon />}>
        {/* Mirror GroupBy layout during loading to keep the toolbar visible and stable. */}
        <div className="flex items-center gap-2">
          {staticGroupByOptions.map((option) => (
            <div
              key={option.key}
              className={`px-2 py-1.5 rounded-lg flex gap-1 ${
                option.key === 'dateStart' ? 'bg-light-blue text-blue' : 'text-secondary'
              }`}
            >
              <span className="size-4">{option.icon}</span>
              <span
                className={`${option.key === 'dateStart' ? 'inline' : 'hidden'} sm:inline text-small whitespace-nowrap`}
              >
                {option.text}
              </span>
            </div>
          ))}
        </div>
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {skeletonArray.map((_, index) => (
          <div key={index} className="flex flex-col items-start gap-4">
            <div className="w-20 h-6 bg-middle-gray rounded-md" />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 - index }).map((__, idx) => (
                <ProjectItemSkeleton key={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
