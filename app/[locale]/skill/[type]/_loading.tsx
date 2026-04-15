import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import { getSkillListBreadcrumbMenus } from '@/app/[locale]/skill/get-skill-list-breadcrumbs';

import SkillGroupSkeleton from '../components/skeleton/SkillGroupSkeleton';

export default async function Loading() {
  const breadcrumbMenus = await getSkillListBreadcrumbMenus();

  return (
    <div className="content-wrap">
      <Breadcrumb menus={breadcrumbMenus} />
      <SkillGroupSkeleton />
    </div>
  );
}
