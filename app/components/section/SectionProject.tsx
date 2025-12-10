import { Suspense } from 'react';

import { CheckBadgeIcon } from '@heroicons/react/24/outline';

import ProjectItem from '@/app/project/components/ProjectItem';
import { getProjects } from '@/lib/notion';

import SectionHeader from '../common/SectionHeader';

export default async function SectionProject() {
  return (
    <section>
      <SectionHeader url="/project" title="精选项目" icon={<CheckBadgeIcon />} />

      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList />
      </Suspense>
    </section>
  );
}

async function ProjectList() {
  const projects = await getProjects([{ property: '首页精选', checkbox: { equals: true } }]);

  projects.sort((a, b) => {
    return new Date(b.dateEnd).getTime() - new Date(a.dateEnd).getTime();
  });

  return (
    <div className="max-w-full flex gap-6 overflow-x-scroll">
      {projects?.map((item, index) => (
        <ProjectItem key={index} data={item} />
      ))}
    </div>
  );
}

function ProjectListSkeleton() {
  return (
    <div className="max-w-full flex gap-6 overflow-x-scroll">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="w-96 min-w-96 aspect-[4/3] bg-middle-gray border-[1px] border-third rounded-[20px] overflow-hidden relative animate-pulse"
        >
          <div className="w-full bg-white/75 p-3 backdrop-blur-xl flex justify-between items-center gap-3 absolute bottom-0">
            <div className="flex items-center gap-2 overflow-hidden">
              {/* Logo */}
              <div className="w-10 h-10 bg-middle-gray rounded-full flex-shrink-0"></div>

              {/* Title + Text */}
              <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                <div className="w-32 h-4 bg-middle-gray rounded"></div>
                <div className="w-48 h-3 bg-middle-gray rounded"></div>
              </div>
            </div>

            {/* Time + Type */}
            <div className="flex flex-col items-end gap-2">
              <div className="w-20 h-3 bg-middle-gray rounded"></div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-middle-gray rounded-full"></div>
                <div className="w-6 h-6 bg-middle-gray rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
