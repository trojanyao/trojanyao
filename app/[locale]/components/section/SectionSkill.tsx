import { Suspense } from 'react';

import { CommandLineIcon } from '@heroicons/react/24/outline';
import { getLocale, getTranslations } from 'next-intl/server';

import SkillGrid from '@/app/[locale]/skill/components/SkillGrid';
import SkillGridSkeleton from '@/app/[locale]/skill/components/SkillGridSkeleton';
import { getSkills } from '@/lib/notion';

import SectionHeader from '../common/SectionHeader';

export default async function SectionSkill() {
  const t = await getTranslations('skill');

  return (
    <section className="w-full!">
      <SectionHeader url="/skill/dev" icon={<CommandLineIcon />} title={t('plural')} />
      <div className="mt-4">
        <Suspense fallback={<SkillGridSkeleton />}>
          <SkillList />
        </Suspense>
      </div>
    </section>
  );
}

async function SkillList() {
  const locale = await getLocale();
  const isEnglish = locale === 'en';
  const skills = await getSkills([
    {
      property: '首页精选',
      checkbox: { equals: true },
    },
  ]);

  const order = ['学习中', '熟练', '使用过'];
  skills.sort((a, b) => {
    const indexA = order.indexOf(a.status);
    const indexB = order.indexOf(b.status);
    return indexA - indexB;
  });

  return <SkillGrid skills={skills} isEnglish={isEnglish} />;
}
