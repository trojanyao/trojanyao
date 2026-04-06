import { Suspense } from 'react';

import { getLocale, getTranslations } from 'next-intl/server';

import { SkillItemSkeleton } from '@/app/[locale]/skill/components/SkillGridSkeleton';
import SkillItem from '@/app/[locale]/skill/components/SkillItem';
import { skillCategories, skillProficiencies } from '@/lib/constants/skill.constants';
import { getSkills } from '@/lib/notion';
import { groupBy } from '@/lib/utils/group-by';

export default function TechStacks() {
  return (
    <Suspense fallback={<TechStacksSkeleton />}>
      <TechStacksContent />
    </Suspense>
  );
}

/* Component: TechStacksContent */
async function TechStacksContent() {
  const locale = await getLocale();
  const isEnglish = locale === 'en';
  const t = await getTranslations('skill.category');

  const skills: Skill[] = await getSkills();

  const groupedSkills = groupBy<Skill>(skills, 'category', (a, b) => {
    // 按照 skillCategories 顺序（前端 - 服务端 - App - 其他）
    const getIndex = (item: typeof a) => skillCategories.indexOf(item?.groupName as SkillCategory);
    const indexA = getIndex(a);
    const indexB = getIndex(b);

    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  });

  return groupedSkills?.map((groupItem, index) => (
    <div key={index} className="flex flex-col gap-4">
      <div className="pl-1 text-primary text-middle font-medium">{t(groupItem?.groupName)}</div>
      <SkillGrid skills={groupItem?.items} isEnglish={isEnglish} />
    </div>
  ));
}

function SkillGrid({ skills, isEnglish }: { skills: Skill[]; isEnglish: boolean }) {
  skills.sort((a, b) => {
    const indexA = skillProficiencies.indexOf(a?.status);
    const indexB = skillProficiencies.indexOf(b?.status);
    return indexA - indexB;
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {skills.map((item) => (
        <SkillItem key={item?.id} data={item} className="bg-white" isEnglish={isEnglish} />
      ))}
    </div>
  );
}

function TechStacksSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {skillCategories.map((name) => (
        <div key={name} className="flex flex-col gap-4">
          <div className="pl-1 h-4 w-16 bg-gray-100 rounded-sm animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkillItemSkeleton key={i} className="bg-white" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
