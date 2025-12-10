'use client';

import { useState } from 'react';

import { ClockIcon, RectangleGroupIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

import SectionHeader from '@/app/components/common/SectionHeader';
import GroupBy from '@/app/components/ui/GroupBy';
import Line from '@/app/components/ui/Line';
import ProjectGrid from '@/app/project/components/ProjectGrid';
import { ProjectType } from '@/lib/notion';
import { groupBy } from '@/lib/utils/group-by';

const groupByOptions = [
  { icon: <ClockIcon />, text: '按时间', key: 'time' },
  { icon: <RectangleGroupIcon />, text: '按形态', key: 'type' },
];

export default function ProjectList({
  projects,
  title,
}: {
  projects: ProjectItem[];
  title?: string;
}) {
  const [groupKey, setGroupKey] = useState('time');

  const projectTypeValues: string[] = Object.values(ProjectType);

  /* Group the data */
  const groupedProjects = groupBy(
    projects,
    groupKey === 'type' ? 'type' : (item: ProjectItem) => item?.dateStart?.split('.')?.[0],
    groupKey === 'type'
      ? (a: GroupedItem<(typeof projects)[number]>, b: GroupedItem<(typeof projects)[number]>) => {
          const indexA = projectTypeValues.indexOf(a.groupKey);
          const indexB = projectTypeValues.indexOf(b.groupKey);

          return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
        }
      : (a: GroupedItem<(typeof projects)[number]>, b: GroupedItem<(typeof projects)[number]>) => {
          return (
            new Date(b.items[0].dateStart).getTime() - new Date(a.items[0].dateStart).getTime()
          );
        }
  );

  /* Count total number of projects and remove duplicates */
  const allProjects = groupedProjects.flatMap((group) => group?.items || []);
  const uniqueProjects = Array.from(new Set(allProjects.map((item) => item.id))).map((id) =>
    allProjects.find((item) => item.id === id)
  );
  const totalProjects = uniqueProjects.length;

  return (
    <div>
      <SectionHeader title={`${title || '开发项目'}（${totalProjects}）`} icon={<Squares2X2Icon />}>
        <GroupBy
          options={groupByOptions}
          groupKey={groupKey}
          onChange={(key: string) => setGroupKey(key)}
        />
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {/* List */}
        {groupedProjects.map((groupItem, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="title-small text-secondary">
              {groupItem?.groupKey}（{groupItem?.items?.length}）
            </div>
            <ProjectGrid list={groupItem?.items} />
          </div>
        ))}
      </div>
    </div>
  );
}
