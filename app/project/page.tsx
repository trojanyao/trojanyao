import Breadcrumb from '@/app/components/Breadcrumb';
import GroupBy from '@/app/components/GroupBy';
import Line from '@/app/components/Line';
import SectionHeader from '@/app/components/SectionHeader';
import ProjectGrid from '@/app/project/ProjectGrid';
import {
  ClockIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

const breadcrumbMenus = [
  { text: '开发', url: '/dev' },
  { text: '开发项目', url: '/dev/projects' },
];

const groupByOptions = [
  { icon: <ClockIcon />, text: '按时间' },
  { icon: <RectangleGroupIcon />, text: '按形态' },
];

export default function DevProjects() {
  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />

      <SectionHeader title="开发项目" icon={<Squares2X2Icon />}>
        <GroupBy options={groupByOptions} />
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {/* List */}
        {Array.from({ length: 3 }).map((item, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="title-small text-secondary">2024</div>
            <ProjectGrid />
          </div>
        ))}
      </div>
    </div>
  );
}
