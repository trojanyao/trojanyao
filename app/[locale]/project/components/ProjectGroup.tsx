'use client';

import { useState } from 'react';

import {
  ArchiveBoxIcon,
  ClockIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import GroupBy from '@/app/[locale]/components/ui/GroupBy';
import Line from '@/app/[locale]/components/ui/Line';
import ProjectCount from '@/app/[locale]/components/ui/ProjectCount';
import ProjectGrid from '@/app/[locale]/project/components/ProjectGrid';
import { ProjectPlatform } from '@/lib/constants/project.constants';
import { groupBy } from '@/lib/utils/group-by';

export default function ProjectGroup({ projects, title }: { projects: Project[]; title?: string }) {
  const t = useTranslations('project');

  const groupByOptions = [
    { icon: <ClockIcon />, text: t('group.by-time'), key: 'dateStart' },
    { icon: <RectangleGroupIcon />, text: t('group.by-platform'), key: 'platform' },
  ];

  const [groupKey, setGroupKey] = useState<keyof Project>('dateStart');

  const projectPlatformValues: string[] = Object.values(ProjectPlatform);

  /* Group the data */
  const groupedProjects = groupBy<Project>(
    projects,
    groupKey === 'platform' ? 'platform' : (item: Project) => item?.dateStart?.split('-')?.[0],
    groupKey === 'platform'
      ? (a: GroupedItem<(typeof projects)[number]>, b: GroupedItem<(typeof projects)[number]>) => {
          const indexA = projectPlatformValues.indexOf(a.groupName);
          const indexB = projectPlatformValues.indexOf(b.groupName);

          return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
        }
      : (a: GroupedItem<(typeof projects)[number]>, b: GroupedItem<(typeof projects)[number]>) => {
          return (
            new Date(b.items[0].dateStart).getTime() - new Date(a.items[0].dateStart).getTime()
          );
        },
  );
  // 按平台 group 时，给 groupName 使用 localization
  const localizedGroupedProjects =
    groupKey === 'platform'
      ? groupedProjects.map((groupItem) => ({
          ...groupItem,
          groupName: t?.(`type.${groupItem.groupName}`) || groupItem.groupName,
        }))
      : groupedProjects;

  /* Count total number of projects and remove duplicates */
  const allProjects = groupedProjects.flatMap((group) => group?.items || []);
  const uniqueProjects = Array.from(new Set(allProjects.map((item) => item.id))).map((id) =>
    allProjects.find((item) => item.id === id),
  );
  const totalProjects = uniqueProjects.length;

  return (
    <div>
      <SectionHeader
        title={`${title || t('dev-project')}`}
        count={totalProjects}
        icon={<Squares2X2Icon />}
      >
        {totalProjects > 0 && (
          <GroupBy
            options={groupByOptions}
            groupKey={groupKey}
            onChange={(key: string) => setGroupKey(key as keyof Project)}
          />
        )}
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {/* List */}
        {totalProjects > 0 ? (
          localizedGroupedProjects.map((groupItem, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex items-center gap-1 title-small text-secondary">
                <div>{groupItem?.groupName}</div>
                <ProjectCount count={groupItem?.items?.length} />
              </div>
              <ProjectGrid list={groupItem?.items} isFirstGroup={index === 0} />
            </div>
          ))
        ) : (
          <ProjectEmpty />
        )}
      </div>
    </div>
  );
}

function ProjectEmpty() {
  const t = useTranslations('project');

  return (
    <div className="py-24 flex flex-col items-center gap-4">
      <ArchiveBoxIcon className="size-6 text-light" />
      <span className="text-light text-small">{t('empty')}</span>
    </div>
  );
}
