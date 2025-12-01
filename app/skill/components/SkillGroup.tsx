'use client';

import {
  CodeBracketSquareIcon,
  FolderOpenIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';

import SectionHeader from '@/app/components/common/SectionHeader';
import Line from '@/app/components/ui/Line';
import { groupBy } from '@/lib/utils/groupBy';

import SkillGrid from './SkillGrid';

const groupByOptions: GroupOptionItem[] = [
  { icon: <RectangleStackIcon />, key: 'status', text: '按熟练度' },
  { icon: <FolderOpenIcon />, key: 'category', text: '按类别' },
];

export default function SkillGroup({ skills }: { skills: SkillItem[] }) {
  const [groupKey, setGroupKey] = useState('status');

  /* Pass a function to groupBy to fix type error */
  const statusOrder = ['学习中', '熟练', '使用过'];
  const groupedSkills = groupBy(skills, 'status', (a, b) => {
    const indexA = statusOrder.indexOf(a.groupKey);
    const indexB = statusOrder.indexOf(b.groupKey);
    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  });

  return (
    <div>
      <SectionHeader title="开发技能" icon={<CodeBracketSquareIcon />}>
        {/* <GroupBy options={groupByOptions} /> */}
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {/* List */}
        {groupedSkills?.map((groupItem, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="title-small text-secondary">
              {groupItem?.groupKey}（{groupItem?.items?.length}）
            </div>
            <SkillGrid skills={groupItem?.items} />
          </div>
        ))}
      </div>
    </div>
  );
}
