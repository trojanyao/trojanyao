import { Suspense } from 'react';

import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import ProjectList from '@/app/[locale]/project/components/ProjectGroup';
import { getProjects } from '@/lib/notion/project';
import { getSkill } from '@/lib/notion/skill';

import SkillDetailBasicInfo from './components/SkillDetailBasicInfo';
import { SkillDetailBodySkeleton } from './components/SkillDetailSkeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const skill = await getSkill(id);

  return {
    title: locale === 'zh' ? skill?.name : skill?.nameEN || skill?.name,
    // TODO: replace with English description when available
    description: locale === 'zh' ? skill?.description : '',
  };
}

export default async function SkillDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="content-wrap">
      <SkillBreadcrumb dataPromise={getSkill(id)} />

      <Suspense fallback={<SkillDetailBodySkeleton />}>
        <SkillContent dataPromise={getSkill(id)} />
      </Suspense>
    </div>
  );
}

async function SkillBreadcrumb({ dataPromise }: { dataPromise: Promise<Skill> }) {
  const locale = await getLocale();
  const t = await getTranslations();

  const skill = await dataPromise;

  const breadcrumbMenus = [
    { text: t('common.dev'), url: '/dev' },
    { text: t('skill.dev-skill'), url: '/skill/dev' },
    { text: locale === 'en' ? skill?.nameEN || skill?.name : skill?.name },
  ];

  return <Breadcrumb menus={breadcrumbMenus} />;
}

async function SkillContent({ dataPromise }: { dataPromise: Promise<Skill> }) {
  const t = await getTranslations();
  const tLevel = await getTranslations('skill.level');

  const skill = await dataPromise;
  // Resolve the one `skill.level.*` string on the server for `SkillDetailBasicInfo` (client) so the
  // status row does not need `useTranslations` there—same idea as `getSkillLevelLabelMap` for grids.
  const statusLabel = tLevel(skill.status);

  /* <RelatedProjects> must be a client component, so we need to fetch the projects here */
  const projects = await getProjects([
    {
      property: '技术栈 *',
      relation: {
        contains: skill?.id,
      },
    },
  ]);

  return (
    <div className="flex flex-col gap-8">
      <SkillDetailBasicInfo skill={skill} statusLabel={statusLabel} />

      <ProjectList projects={projects} title={t('skill.related-project')} />
    </div>
  );
}
