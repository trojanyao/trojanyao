import { Suspense } from 'react';

import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import { getProjects } from '@/lib/notion';

import SectionHeader from '../components/common/SectionHeader';
import Line from '../components/ui/Line';

import ProjectGroup from './components/ProjectGroup';
import ProjectCardSkeleton from './components/ProjectItemSkeleton';

export const dynamic = 'force-dynamic'; // use SSR to avoid Notion's image expiry

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'project' });

  return {
    title: t('dev-project'),
    description:
      locale === 'zh'
        ? '主导和参与的开发项目案例，包括 Web、App、小程序等。'
        : 'Development project cases that I have led or participated in, including Web, App, Mini Programs, etc.',
  };
}

export default function DevProjects() {
  const t = useTranslations('dev');

  const breadcrumbMenus = [
    { text: t('common') }, // TODO: open /dev url
    // { text: '开发', url: '/dev' },
    { text: t('dev-project'), url: '/project' },
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

  return <ProjectGroup projects={projects} />;
}

function ProjectListSkeleton() {
  const t = useTranslations('dev');

  const skeletonArray = Array.from({ length: 3 });

  return (
    <div>
      <SectionHeader title={t('dev-project')} icon={<Squares2X2Icon />}>
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
