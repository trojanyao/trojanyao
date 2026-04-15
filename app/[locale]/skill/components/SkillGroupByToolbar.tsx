/**
 * Right slot of `SectionHeader`: toggles `groupKey` (status vs category). Must stay client because
 * `GroupBy` uses click handlers; it reads/writes context shared with `SkillGroupedLists`.
 */
'use client';

import { FolderOpenIcon, RectangleStackIcon } from '@heroicons/react/24/outline';

import GroupBy from '@/app/[locale]/components/ui/GroupBy';

import { useSkillGroup } from './SkillGroupContext';

export default function SkillGroupByToolbar() {
  const { groupKey, setGroupKey, optionProficiency, optionCategory } = useSkillGroup();

  const groupByOptions: GroupOptionItem[] = [
    { icon: <RectangleStackIcon />, key: 'status', text: optionProficiency },
    { icon: <FolderOpenIcon />, key: 'category', text: optionCategory },
  ];

  return (
    <GroupBy
      options={groupByOptions}
      groupKey={groupKey}
      onChange={(key: string) => setGroupKey(key as keyof Skill)}
    />
  );
}
