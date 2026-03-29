import { Suspense } from 'react';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import { getSkills } from '@/lib/notion/skill';

import SkillGroup from '../components/SkillGroup';
import SkillListSkeleton from '../components/SkillListSkeleton';

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
