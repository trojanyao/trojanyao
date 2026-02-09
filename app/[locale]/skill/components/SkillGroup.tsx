'use client';

import { useState } from 'react';

import {
  CodeBracketSquareIcon,
  FolderOpenIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import GroupBy from '@/app/[locale]/components/ui/GroupBy';
import Line from '@/app/[locale]/components/ui/Line';
import { skillCategories, skillStatuses } from '@/lib/constants/skill.constants';
import { groupBy } from '@/lib/utils/group-by';

import SkillGrid from './SkillGrid';

const groupByOptions: GroupOptionItem[] = [
  { icon: <RectangleStackIcon />, key: 'status', text: '按熟练度' },
  { icon: <FolderOpenIcon />, key: 'category', text: '按类别' },
];

export default function SkillGroup({ skills }: { skills: Skill[] }) {
  const t = useTranslations('skill.level');

  const [groupKey, setGroupKey] = useState<keyof Skill>('status');

  /* Group skill list by groupKey */
  const groupedSkills = groupBy<Skill>(skills, groupKey, (a, b) => {
    // 自定义分组顺序
    // 按 status（熟练度）分组时按照 sillStatuses 顺序（学习中 - 熟练 - 使用过）
    // 按 category（类别）分组时按照 skillCategories 顺序（前端 - 服务端 - App - 其他）

    let getIndex: (item: typeof a) => number;

    if (groupKey === 'status') {
      // 当 groupKey 为 'status' 时，使用 skillStatuses 进行排序
      getIndex = (item) => skillStatuses.indexOf(item?.groupName as SkillStatus);
    } else {
      // 当 groupKey 为 'category' 时，使用 skillCategories 进行排序
      getIndex = (item) => skillCategories.indexOf(item?.groupName as SkillCategory);
    }

    const indexA = getIndex(a);
    const indexB = getIndex(b);

    // 如果未找到索引，则将其视为 Infinity，以确保它们排在最后
    // 否则按索引顺序排序
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
            <div className="title-small text-secondary">{t(groupItem?.groupName)}</div>
            <SkillGrid skills={groupItem?.items} />
          </div>
        ))}
      </div>
    </div>
  );
}
