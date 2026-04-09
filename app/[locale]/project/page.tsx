import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import { getProjects } from '@/lib/notion';

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

  const breadcrumbMenus = [
    { text: t('common') }, // TODO: open /dev url
    // { text: 'Dev', url: '/dev' },
    { text: t('dev-project'), url: '/project' },
  ];

  return (
    <div className="content-wrap">
      <Breadcrumb menus={breadcrumbMenus} />
      {/* LCP cover: first grid card uses Image `preload` (ProjectGrid isFirstGroup + ProjectItem isHeroCover). */}
      <ProjectGroup projects={projects} />
    </div>
  );
}
