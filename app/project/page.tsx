import { Metadata } from 'next';

import Breadcrumb from '@/app/components/ui/Breadcrumb';
import { getProjects } from '@/lib/notion';

import ProjectList from './components/ProjectList';

export const dynamic = 'force-dynamic'; // use SSR to avoid Notion's image expiry

export const metadata: Metadata = {
  title: '开发项目案例',
  description: '参与和主导的历史开发项目案例，包括 Web、App、小程序等。',
};

export default async function DevProjects() {
  const breadcrumbMenus = [
    { text: '开发' }, // TODO: open /dev url
    // { text: '开发', url: '/dev' },
    { text: '开发项目', url: '/project' },
  ];

  const projects = await getProjects();

  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />
      <ProjectList projects={projects} />
    </div>
  );
}
