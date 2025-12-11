'use client';

import { useState } from 'react';

import {
  CodeBracketSquareIcon,
  FolderOpenIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';

import SectionHeader from '@/app/components/common/SectionHeader';
import GroupBy from '@/app/components/ui/GroupBy';
import Line from '@/app/components/ui/Line';
import { skillCategories, skillStatuses } from '@/lib/constants/skill.constants';
import { groupBy } from '@/lib/utils/group-by';

import SkillGrid from './SkillGrid';

const groupByOptions: GroupOptionItem[] = [
  { icon: <RectangleStackIcon />, key: 'status', text: '按熟练度' },
  { icon: <FolderOpenIcon />, key: 'category', text: '按类别' },
];

export default function SkillGroup({ skills }: { skills: Skill[] }) {
  const [groupKey, setGroupKey] = useState<keyof Skill>('status');

  /* Group skill list by groupKey */
  const groupedSkills = groupBy<Skill>(skills, groupKey, (a, b) => {
    // 自定义分组顺序
    // 按 status（熟练度）分组时按照 sillStatuses 顺序（学习中 - 熟练 - 使用过）
    // 按 category（类别）分组时按照 skillCategories 顺序（前端 - 服务端 - App - 其他）
    const indexA =
      groupKey === 'status'
        ? skillStatuses.indexOf(a?.groupName as SkillStatus)
        : skillCategories.indexOf(a?.groupName as SkillCategory);
    const indexB =
      groupKey === 'status'
        ? skillStatuses.indexOf(b.groupName as SkillStatus)
        : skillCategories.indexOf(b?.groupName as SkillCategory);
    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  });

  return (
    <div>
      <SectionHeader title="开发技能" icon={<CodeBracketSquareIcon />}>
        <GroupBy
          options={groupByOptions}
          groupKey={groupKey}
          onChange={(key: string) => setGroupKey(key as keyof Skill)}
        />
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {/* List */}
        {groupedSkills?.map((groupItem, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="title-small text-secondary">
              {groupItem?.groupName}（{groupItem?.items?.length}）
            </div>
            <SkillGrid skills={groupItem?.items} />
          </div>
        ))}
      </div>
    </div>
  );
}
