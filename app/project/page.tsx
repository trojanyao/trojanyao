import { Suspense } from 'react';

import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

import Breadcrumb from '@/app/components/ui/Breadcrumb';
import { getProjects } from '@/lib/notion';

import SectionHeader from '../components/common/SectionHeader';
import Line from '../components/ui/Line';

import ProjectCardSkeleton from './components/ProjectCardSkeleton';
import ProjectList from './components/ProjectList';

export const dynamic = 'force-dynamic'; // use SSR to avoid Notion's image expiry

export const metadata: Metadata = {
  title: '开发项目',
  description: '参与和主导的历史开发项目案例，包括 Web、App、小程序等。',
};

export default function DevProjects() {
  const breadcrumbMenus = [
    { text: '开发' }, // TODO: open /dev url
    // { text: '开发', url: '/dev' },
    { text: '开发项目', url: '/project' },
  ];

  return (
    <div className="content-wrap">
      <Breadcrumb menus={breadcrumbMenus} />

      {/* <ProjectListSkeleton /> */}
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectsContent />
      </Suspense>
    </div>
  );
}

async function ProjectsContent() {
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}

function ProjectListSkeleton() {
  const skeletonArray = Array.from({ length: 3 });

  return (
    <div>
      <SectionHeader title="开发项目" icon={<Squares2X2Icon />}>
        {/* Avoid CLS */}
        <div className="h-7"></div>
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {skeletonArray.map((_, index) => (
          <div key={index} className="flex flex-col items-start gap-4">
            <div className="w-20 h-6 bg-middle-gray rounded-md"></div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 - index }).map((_, idx) => (
                <ProjectCardSkeleton key={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
