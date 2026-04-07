/**
 * Shared client state for the skill list: one `groupKey` drives both the header `GroupBy` control
 * and the grouped grids under the divider.
 *
 * Toolbar labels (`optionProficiency` / `optionCategory`) are resolved in `SkillGroupServer` via
 * `getTranslations` so this file does not need extra intl setup for those two strings.
 */
'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type SkillGroupContextValue = {
  skills: Skill[];
  groupKey: keyof Skill;
  setGroupKey: (key: keyof Skill) => void;
  optionProficiency: string;
  optionCategory: string;
};

const SkillGroupContext = createContext<SkillGroupContextValue | null>(null);

export function SkillGroupProvider({
  skills,
  optionProficiency,
  optionCategory,
  children,
}: {
  skills: Skill[];
  optionProficiency: string;
  optionCategory: string;
  children: ReactNode;
}) {
  // Default matches previous single-file SkillGroup behavior (proficiency / status first).
  const [groupKey, setGroupKey] = useState<keyof Skill>('status');
  const value = useMemo(
    () => ({
      skills,
      groupKey,
      setGroupKey,
      optionProficiency,
      optionCategory,
    }),
    [skills, groupKey, optionProficiency, optionCategory],
  );

  return <SkillGroupContext.Provider value={value}>{children}</SkillGroupContext.Provider>;
}

export function useSkillGroup() {
  const ctx = useContext(SkillGroupContext);
  if (!ctx) {
    throw new Error('useSkillGroup must be used within SkillGroupProvider');
  }
  return ctx;
}
