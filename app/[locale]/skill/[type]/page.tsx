import { Suspense } from 'react';

import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import Line from '@/app/[locale]/components/ui/Line';
import { getSkills } from '@/lib/notion/skill';

import SkillGridSkeleton from '../components/SkillGridSkeleton';
import SkillGroup from '../components/SkillGroup';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'skill' });

  return {
    title: t('dev-skill'),
    description:
      locale === 'zh'
        ? '已掌握、使用过和学习中的开发技能，包括前端、服务端、App 及其他。'
        : 'Development skills that I have mastered, used, or am currently learning, including frontend, backend, app, and others.',
  };
}

export default async function Skills() {
  const t = await getTranslations();

  const breadcrumbMenus = [
    { text: t('common.dev'), url: '/dev' },
    { text: t('skill.dev-skill'), url: '/dev/projects' },
  ];

  return (
    <div className="content-wrap">
      <Breadcrumb menus={breadcrumbMenus} />
      <Suspense fallback={<SkillListSkeleton />}>
        <SkillListContent />
      </Suspense>
    </div>
  );
}

async function SkillListContent() {
  const skills: Skill[] = await getSkills();

  return <SkillGroup skills={skills} />;
}

function SkillListSkeleton() {
  const t = useTranslations('skill');

  const skeletonArray = [
    { text: t('level.proficient'), count: 15 },
    { text: t('level.familiar'), count: 12 },
  ];

  return (
    <div>
      <SectionHeader title={t('dev-skill')} icon={<CodeBracketSquareIcon />}>
        {/* Avoid CLS */}
        <div className="h-7" />
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {skeletonArray.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-4">
            <div className="title-small text-secondary">{item.text}</div>

            <SkillGridSkeleton length={item.count} />
          </div>
        ))}
      </div>
    </div>
  );
}
