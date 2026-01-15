import { Suspense } from 'react';

import { CheckBadgeIcon } from '@heroicons/react/24/outline';

import ProjectCardSkeleton from '@/app/project/components/ProjectCardSkeleton';
import ProjectItem from '@/app/project/components/ProjectItem';
import { getProjects } from '@/lib/notion';

import SectionHeader from '../common/SectionHeader';

export default async function SectionProject() {
  return (
    <section className="px-4 lg:px-0">
      <SectionHeader url="/project" title="精选项目" icon={<CheckBadgeIcon />} />

      <div className="max-w-full flex flex-col gap-4 lg:flex-row lg:gap-6">
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
