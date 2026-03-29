import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import { getSkillListBreadcrumbMenus } from '@/app/[locale]/skill/get-skill-list-breadcrumbs';

import SkillListSkeleton from '../components/SkillListSkeleton';

export default async function Loading() {
  const breadcrumbMenus = await getSkillListBreadcrumbMenus();

  return (
    <div className="content-wrap">
      <Breadcrumb menus={breadcrumbMenus} />
      <SkillListSkeleton />
    </div>
  );
}
