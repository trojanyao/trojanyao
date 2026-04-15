/**
 * Skill list shell: keeps static UI on the server and interactive pieces under one client provider.
 *
 * Why split:
 * - `SectionHeader` and `Line` have no client hooks; rendering them from this RSC avoids pulling that
 *   markup into the same client bundle as `GroupBy` + the grid (smaller JS / clearer boundaries).
 * - `SkillGroupProvider` is the single client boundary that shares `groupKey` between the toolbar
 *   (inside the header slot) and `SkillGroupedLists` below.
 *
 * Next.js note: server components passed as `children` of a client provider are still rendered on
 * the server; only the client leaves hydrate.
 */
import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import { getTranslations } from 'next-intl/server';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Line from '@/app/[locale]/components/ui/Line';

import SkillGroupByToolbar from './SkillGroupByToolbar';
import { SkillGroupProvider } from './SkillGroupContext';
import SkillGroupedLists from './SkillGroupedLists';

export default async function SkillGroupServer({ skills }: { skills: Skill[] }) {
  const t = await getTranslations('skill');

  return (
    <SkillGroupProvider
      skills={skills}
      optionProficiency={t('group.proficiency')}
      optionCategory={t('group.category')}
    >
      <SectionHeader title={t('dev-skill')} icon={<CodeBracketSquareIcon />}>
        <SkillGroupByToolbar />
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />
        <SkillGroupedLists />
      </div>
    </SkillGroupProvider>
  );
}
