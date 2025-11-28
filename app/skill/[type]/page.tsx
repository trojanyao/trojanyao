import {
  CodeBracketSquareIcon,
  FolderOpenIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';

import Breadcrumb from '@/app/components/Breadcrumb';
import GroupBy from '@/app/components/GroupBy';
import Line from '@/app/components/Line';
import SectionHeader from '@/app/components/SectionHeader';

import SkillGrid from '../components/SkillGrid';

const breadcrumbMenus = [
  { text: '开发', url: '/dev' },
  { text: '开发技能', url: '/dev/projects' },
];

const groupByOptions: GroupOptionItem[] = [
  { icon: <RectangleStackIcon />, key: 'proficiency', text: '按熟练度' },
  { icon: <FolderOpenIcon />, key: 'category', text: '按类别' },
];

// TODO: 整个页面需要开发
export default function DevProjects() {
  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />

      <SectionHeader title="开发技能" icon={<CodeBracketSquareIcon />}>
        {/* <GroupBy options={groupByOptions} /> */}
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {/* List */}
        {Array.from({ length: 3 }).map((item, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="title-small text-secondary">学习中</div>
            {/* <SkillGrid /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
