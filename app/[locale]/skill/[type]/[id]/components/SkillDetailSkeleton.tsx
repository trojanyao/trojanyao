import {
  ClockIcon,
  HomeIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Line from '@/app/[locale]/components/ui/Line';
import ProjectItemSkeleton from '@/app/[locale]/project/components/skeleton/ProjectItemSkeleton';

export function SkillBreadcrumbSkeleton() {
  const t = useTranslations();

  // Match `Breadcrumb` container spacing to prevent layout shift.
  return (
    <div className="pt-4 pb-8 flex items-center gap-2">
      {/* Keep stable parts readable; only the dynamic skill name uses skeleton. */}
      <HomeIcon className="size-4 text-light" />

      <span className="text-small text-light">/</span>
      <span className="text-small text-light">{t('common.dev')}</span>
      <span className="text-small text-light">/</span>
      <span className="text-small text-light">{t('skill.dev-skill')}</span>
    </div>
  );
}

export function BasicInfoSkeleton() {
  return (
    <div className="flex justify-between items-center animate-pulse">
      <div className="w-full lg:w-2/3 flex gap-6">
        {/* Match `<Image className="size-24" />` layout (no extra rounding). */}
        <div className="bg-middle-gray size-24 aspect-square rounded-full" />

        <div className="py-1 flex flex-col justify-center gap-2 w-full">
          <div className="flex items-center gap-3">
            <div className="bg-middle-gray h-6 w-32 rounded-md" />
            {/* External link icon placeholder */}
            <div className=" bg-middle-gray size-6 rounded-md" />
          </div>

          <div className="bg-middle-gray h-4 w-full rounded-md" />
          <div className="bg-middle-gray h-4 w-2/3 rounded-md block sm:hidden" />

          <div className="bg-middle-gray h-4 w-24 rounded-md mt-4" />
        </div>
      </div>
    </div>
  );
}

export function RelatedProjectsSkeleton() {
  const skeletonArray = Array.from({ length: 3 });
  const tSkill = useTranslations('skill');
  const tProject = useTranslations('project');

  return (
    <div>
      <SectionHeader title={tSkill('related-project')} icon={<Squares2X2Icon />}>
        {/* Show known group actions directly; only project list content waits for data. */}
        <div className="flex items-center gap-2">
          <div className="px-2 py-1.5 rounded-lg flex gap-1 bg-light-blue text-blue">
            <span className="size-4">
              <ClockIcon />
            </span>
            <span className="inline sm:inline text-small whitespace-nowrap">
              {tProject('group.by-time')}
            </span>
          </div>

          <div className="px-2 py-1.5 rounded-lg flex gap-1 text-secondary">
            <span className="size-4">
              <RectangleGroupIcon />
            </span>
            <span className="hidden sm:inline text-small whitespace-nowrap">
              {tProject('group.by-platform')}
            </span>
          </div>
        </div>
      </SectionHeader>

      <div className="flex flex-col gap-6 animate-pulse">
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
