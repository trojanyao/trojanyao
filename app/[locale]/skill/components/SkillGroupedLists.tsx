/**
 * Client-only: depends on `groupKey` from context, `useTranslations` for section titles under each
 * group, and `isEnglish` for `SkillGrid` / `SkillItem` name fields.
 *
 * Group ordering mirrors Notion-driven enums in `skill.constants` (status vs category order).
 */
'use client';

import { useMemo } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { skillCategories, skillStatuses } from '@/lib/constants/skill.constants';
import { groupBy } from '@/lib/utils/group-by';

import SkillGrid from './SkillGrid';
import { useSkillGroup } from './SkillGroupContext';

export default function SkillGroupedLists() {
  const { skills, groupKey } = useSkillGroup();

  const locale = useLocale();
  const isEnglish = locale === 'en';
  const t = useTranslations('skill');

  // Recompute when skills, grouping dimension, or locale messages change (`t` updates on locale switch).
  const groupedSkills = useMemo(
    () =>
      groupBy<Skill>(skills, groupKey, (a, b) => {
        let getIndex: (item: typeof a) => number;

        if (groupKey === 'status') {
          getIndex = (item) => skillStatuses.indexOf(item?.groupName as SkillStatus);
        } else {
          getIndex = (item) => skillCategories.indexOf(item?.groupName as SkillCategory);
        }

        const indexA = getIndex(a);
        const indexB = getIndex(b);

        return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
      }).map((groupItem) => {
        let localizedGroupName = groupItem.groupName;

        if (groupKey === 'status') {
          localizedGroupName = t(`level.${groupItem.groupName}` as Parameters<typeof t>[0]);
        } else if (groupKey === 'category') {
          localizedGroupName =
            t(`category.${groupItem.groupName}` as Parameters<typeof t>[0]) || groupItem.groupName;
        }
        return {
          ...groupItem,
          groupName: localizedGroupName,
        };
      }),
    [skills, groupKey, t],
  );

  return (
    <div className="flex flex-col gap-6">
      {groupedSkills?.map((groupItem, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="title-small text-secondary">{groupItem?.groupName}</div>
          <SkillGrid skills={groupItem?.items} isEnglish={isEnglish} />
        </div>
      ))}
    </div>
  );
}
