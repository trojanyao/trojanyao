import { skillStatuses } from '@/lib/constants/skill.constants';

import SkillItem from './SkillItem';

export default function SkillGrid({
  skills,
  isEnglish,
  statusLabels,
}: {
  skills: Skill[];
  isEnglish: boolean;
  /**
   * When set, each row receives the matching string as `SkillItem.statusLabel` so status UI skips
   * per-cell intl (`SkillStatusView` only). Omitted rows use `SkillStatusClient` (dynamic fallback).
   */
  statusLabels?: Record<SkillStatus, string>;
}) {
  skills.sort((a, b) => {
    const indexA = skillStatuses.indexOf(a?.status);
    const indexB = skillStatuses.indexOf(b?.status);
    return indexA - indexB;
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {skills?.map((item) => (
        <SkillItem
          key={item?.id}
          data={item}
          isEnglish={isEnglish}
          statusLabel={statusLabels?.[item.status]}
        />
      ))}
    </div>
  );
}
