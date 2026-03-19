import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import { getProjects } from '@/lib/notion';
import { getProjectListFirstGridCoverHref } from '@/lib/utils/project-list-first-cover';

import ProjectGroup from './components/ProjectGroup';

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

export default async function DevProjects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'dev' });
  const projects = await getProjects();
  const firstCoverHref = getProjectListFirstGridCoverHref(projects);

  const breadcrumbMenus = [
    { text: t('common') }, // TODO: open /dev url
    // { text: 'Dev', url: '/dev' },
    { text: t('dev-project'), url: '/project' },
  ];

  return (
    <div className="content-wrap">
      <Breadcrumb menus={breadcrumbMenus} />
      {/*
        NOTE: Manually injecting link preload for the cover image is required. * Using the
      "preload" attribute directly on an `Image` tag does not guarantee the image gets preloaded
      before client-side React hydration. * Preloading via `link` ensures the browser starts
      fetching the key cover image as early as possible, which is critical for LCP (Largest
      Contentful Paint) optimization, especially during SSR.
      */}
      {firstCoverHref ? (
        <link rel="preload" as="image" href={firstCoverHref} fetchPriority="high" />
      ) : null}
      <ProjectGroup projects={projects} />
    </div>
  );
}
