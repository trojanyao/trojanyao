/**
 * Client-only: depends on `groupKey` from context, `useTranslations` for section titles under each
 * group, `isEnglish` for skill names, and one `skill.level` map for per-cell status labels.
 *
 * Group ordering mirrors Notion-driven enums in `skill.constants` (status vs category order).
 */
'use client';

import { useMemo } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { skillCategories, skillStatuses } from '@/lib/constants/skill.constants';
import { groupBy } from '@/lib/utils/group-by';

import { buildSkillLevelLabelMap } from '../build-skill-level-label-map';

import SkillGrid from './SkillGrid';
import { useSkillGroup } from './SkillGroupContext';

export default function SkillGroupedLists() {
  const { skills, groupKey } = useSkillGroup();

  const locale = useLocale();
  const isEnglish = locale === 'en';
  const t = useTranslations('skill');
  const tLevel = useTranslations('skill.level');

  // This component is `use client`, so we cannot call `getSkillLevelLabelMap` (server `getTranslations`).
  // Build the same map once with `useTranslations('skill.level')` and pass it to `SkillGrid` so cells
  // avoid per-row intl hooks (same goal as `getSkillLevelLabelMap` on RSC pages).
  const statusLabels = useMemo(() => buildSkillLevelLabelMap((key) => tLevel(key)), [tLevel]);

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
          <SkillGrid skills={groupItem?.items} isEnglish={isEnglish} statusLabels={statusLabels} />
        </div>
      ))}
    </div>
  );
}
