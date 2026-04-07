'use client';

import { useTranslations } from 'next-intl';

import SkillStatusView from './SkillStatusView';

/** Fallback when `SkillItem` omits `statusLabel` (loaded via `next/dynamic` to keep it out of the hot chunk). */
export default function SkillStatusClient({ status }: { status: SkillStatus }) {
  const t = useTranslations('skill.level');
  return <SkillStatusView status={status} label={t(status)} />;
}
