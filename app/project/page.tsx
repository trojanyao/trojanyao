import Breadcrumb from '@/app/components/ui/Breadcrumb';
import { getProjects } from '@/lib/notion';

import ProjectList from './components/ProjectList';

export const revalidate = 600; // use ISR, revalidate every 10 minutes to avoid Notion's 1hr expiry

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
