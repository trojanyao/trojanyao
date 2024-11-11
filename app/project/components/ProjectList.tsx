'use client';

import { ClockIcon, RectangleGroupIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { ProjectType } from '../page';
import { groupBy } from '@/lib/utils/groupBy';

import Breadcrumb from '@/app/components/Breadcrumb';
import GroupBy from '@/app/components/GroupBy';
import Line from '@/app/components/Line';
import SectionHeader from '@/app/components/SectionHeader';
import ProjectGrid from '@/app/project/components/ProjectGrid';

const breadcrumbMenus = [
  { text: '开发', url: '/dev' },
  { text: '开发项目', url: '/dev/projects' },
];

const groupByOptions = [
  { icon: <ClockIcon />, text: '按时间', key: 'time' },
  { icon: <RectangleGroupIcon />, text: '按形态', key: 'type' },
];

// export enum ProjectType {
//   'Web App · 桌面端' = 'Web App · 桌面端',
//   'Web App · 移动端' = 'Web App · 移动端',
//   'Web 官网 · 桌面端' = 'Web 官网 · 桌面端',
//   'Web 官网 · 移动端' = 'Web 官网 · 移动端',
//   'PWA' = 'PWA',
//   'App (iOS)' = 'iOS',
//   '微信小程序' = '微信小程序',
// }

export default function ProjectList({ projects }: { projects: ProjectItem[] }) {
  const [groupKey, setGroupKey] = useState('time');

  const projectTypeValues: string[] = Object.values(ProjectType);

  const groupedProjects = groupBy(
    projects,
    groupKey === 'type' ? 'type' : (item: ProjectItem) => item?.date?.split('-')?.[0],
    groupKey === 'type'
      ? (a: GroupedItem<(typeof projects)[number]>, b: GroupedItem<(typeof projects)[number]>) => {
          const indexA = projectTypeValues.indexOf(a.groupKey);
          const indexB = projectTypeValues.indexOf(b.groupKey);

          return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
        }
      : (a: GroupedItem<(typeof projects)[number]>, b: GroupedItem<(typeof projects)[number]>) => {
          return new Date(b.items[0].date).getTime() - new Date(a.items[0].date).getTime();
        }
  );

  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />

      <SectionHeader title="开发项目" icon={<Squares2X2Icon />}>
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
            <div className="title-small text-secondary">{groupItem?.groupKey}</div>
            <ProjectGrid list={groupItem.items} />
          </div>
        ))}
      </div>
    </div>
  );
}
