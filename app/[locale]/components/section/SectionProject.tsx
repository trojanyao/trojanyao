import { Suspense } from 'react';

import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { getTranslations } from 'next-intl/server';

import ProjectItem from '@/app/[locale]/project/components/ProjectItem';
import ProjectCardSkeleton from '@/app/[locale]/project/components/ProjectItemSkeleton';
import { getProjects } from '@/lib/notion';

import SectionHeader from '../common/SectionHeader';

export default async function SectionProject() {
  const t = await getTranslations('project');

  return (
    <section>
      <SectionHeader url="/project" title={t('selected')} icon={<CheckBadgeIcon />} />

      <div className="max-w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <Suspense fallback={<ProjectListSkeleton />}>
          <ProjectList />
        </Suspense>
      </div>
    </section>
  );
}

async function ProjectList() {
  const projects = await getProjects([{ property: '首页精选', checkbox: { equals: true } }]);

  projects.sort((a, b) => {
    return new Date(b.dateEnd).getTime() - new Date(a.dateEnd).getTime();
  });

  return (
    <>
      {projects?.map((item, index) => (
        <ProjectItem key={index} data={item} />
      ))}
    </>
  );
}

function ProjectListSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </>
  );
}
