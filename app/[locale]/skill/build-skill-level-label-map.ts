import { skillStatuses } from '@/lib/constants/skill.constants';

/**
 * Builds `Record<SkillStatus, string>` from any `t` that resolves `skill.level.*` keys.
 *
 * Used by `getSkillLevelLabelMap` (server) and by `SkillGroupedLists` (client): both must build
 * the same shape but cannot share the same `getTranslations` / `useTranslations` API across the boundary.
 */
export function buildSkillLevelLabelMap(t: (key: SkillStatus) => string): Record<SkillStatus, string> {
  return Object.fromEntries(skillStatuses.map((status) => [status, t(status)])) as Record<
    SkillStatus,
    string
  >;
}
