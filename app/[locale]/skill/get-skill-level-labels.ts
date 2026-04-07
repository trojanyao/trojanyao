import { getTranslations } from 'next-intl/server';

import { buildSkillLevelLabelMap } from './build-skill-level-label-map';

/**
 * Server-only helper for RSC pages that render `SkillGrid`.
 *
 * Resolves every `skill.level.*` string once via `getTranslations` and returns a map keyed by
 * `SkillStatus`. Parents pass this into `SkillGrid` so each `SkillItem` can render `SkillStatusView`
 * with a plain string instead of calling `useTranslations` per cell (fewer client hooks / work).
 */
export async function getSkillLevelLabelMap(): Promise<Record<SkillStatus, string>> {
  const t = await getTranslations('skill.level');
  return buildSkillLevelLabelMap((key) => t(key));
}
