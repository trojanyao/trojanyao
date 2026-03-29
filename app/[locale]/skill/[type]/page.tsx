import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import { getSkillListBreadcrumbMenus } from '@/app/[locale]/skill/get-skill-list-breadcrumbs';
import { getSkills } from '@/lib/notion/skill';

import SkillGroupDynamic from '../components/SkillGroupDynamic';
import SkillListSkeleton from '../components/SkillListSkeleton';

import type { Metadata } from 'next';

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
  const breadcrumbMenus = await getSkillListBreadcrumbMenus();

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

  return <SkillGroupDynamic skills={skills} />;
}
