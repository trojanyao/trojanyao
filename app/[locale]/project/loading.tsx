import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { getTranslations } from 'next-intl/server';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import Line from '@/app/[locale]/components/ui/Line';
import ProjectCardSkeleton from '@/app/[locale]/project/components/ProjectItemSkeleton';

export default async function ProjectListLoading() {
  const t = await getTranslations('dev');
  const skeletonArray = Array.from({ length: 3 });

  const breadcrumbMenus = [{ text: t('common') }, { text: t('dev-project'), url: '/project' }];

  return (
    <div className="content-wrap">
      <Breadcrumb menus={breadcrumbMenus} />

      <div>
        <SectionHeader title={t('dev-project')} icon={<Squares2X2Icon />}>
          <div className="h-7" />
        </SectionHeader>

        <div className="flex flex-col gap-6">
          <Line type="secondary" />

          {skeletonArray.map((_, index) => (
            <div key={index} className="flex flex-col items-start gap-4">
              <div className="w-20 h-6 bg-middle-gray rounded-md" />

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 - index }).map((_, idx) => (
                  <ProjectCardSkeleton key={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
