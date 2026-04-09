import { Suspense } from 'react';

import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import ProjectItem from '@/app/[locale]/project/components/ProjectItem';
import ProjectItemSkeleton from '@/app/[locale]/project/components/skeleton/ProjectItemSkeleton';
import { getProjects } from '@/lib/notion';

export default function Projects() {
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectContent />
    </Suspense>
  );
}

async function ProjectContent() {
  const t = await getTranslations('project');

  const projects = await getProjects([
    {
      property: '简历精选',
      checkbox: {
        equals: true,
      },
    },
  ]);

  projects.sort((a: Project, b: Project) => (b?.resumeOrder ?? 0) - (a?.resumeOrder ?? 0));

  return (
    <div>
      <SectionHeader title={t('case')} icon={<Squares2X2Icon />} />
      <div className="flex flex-col gap-4">
        {projects?.map((project: Project) => (
          <ProjectItem key={project.id} data={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  const t = useTranslations('project');

  return (
    <div>
      <SectionHeader title={t('case')} icon={<Squares2X2Icon />} />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ProjectItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
