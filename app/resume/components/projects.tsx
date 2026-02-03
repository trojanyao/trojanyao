import { Suspense } from 'react';

import { Squares2X2Icon } from '@heroicons/react/24/outline';

import SectionHeader from '@/app/components/common/SectionHeader';
import ProjectCardSkeleton from '@/app/project/components/ProjectCardSkeleton';
import ProjectItem from '@/app/project/components/ProjectItem';
import { getProjects } from '@/lib/notion';

export default function Projects() {
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectContent />
    </Suspense>
  );
}

async function ProjectContent() {
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
      <SectionHeader title="项目案例" icon={<Squares2X2Icon />} />
      <div className="flex flex-col gap-4">
        {projects?.map((project: Project) => (
          <ProjectItem key={project.id} data={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div>
      <SectionHeader title="项目案例" icon={<Squares2X2Icon />} />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
