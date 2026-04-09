import { Suspense } from 'react';

import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import ProjectGroup from '@/app/[locale]/project/components/ProjectGroup';
import { getProjects } from '@/lib/notion/project';
import { getSkill } from '@/lib/notion/skill';

import SkillDetailBasicInfo from './components/SkillDetailBasicInfo';
import {
  BasicInfoSkeleton,
  RelatedProjectsSkeleton,
  SkillBreadcrumbSkeleton,
} from './components/SkillDetailSkeleton';

/* Metadata */
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

  const skillPromise = getSkill(id);
  const projectsPromise = getProjects([
    {
      property: '技术栈 *',
      relation: {
        contains: id,
      },
    },
  ]);

  return (
    <div className="content-wrap">
      <Suspense fallback={<SkillBreadcrumbSkeleton />}>
        <SkillBreadcrumb skillPromise={skillPromise} />
      </Suspense>

      <SkillContent skillPromise={skillPromise} projectsPromise={projectsPromise} />
    </div>
  );
}

async function SkillBreadcrumb({ skillPromise }: { skillPromise: Promise<Skill> }) {
  const skill = await skillPromise;
  const locale = await getLocale();
  const t = await getTranslations();

  const breadcrumbMenus = [
    { text: t('common.dev'), url: '/dev' },
    { text: t('skill.dev-skill'), url: '/skill/dev' },
    { text: locale === 'en' ? skill?.nameEN || skill?.name : skill?.name },
  ];

  return <Breadcrumb menus={breadcrumbMenus} />;
}

async function SkillContent({
  skillPromise,
  projectsPromise,
}: {
  skillPromise: Promise<Skill>;
  projectsPromise: Promise<Project[]>;
}) {
  const t = await getTranslations();

  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<BasicInfoSkeleton />}>
        <SkillDetailBasicInfoSection skillPromise={skillPromise} />
      </Suspense>

      {/* Keep basic info interactive while related projects are still fetching. */}
      <Suspense fallback={<RelatedProjectsSkeleton />}>
        <RelatedProjectsSection
          projectsPromise={projectsPromise}
          title={t('skill.related-project')}
        />
      </Suspense>
    </div>
  );
}

async function SkillDetailBasicInfoSection({ skillPromise }: { skillPromise: Promise<Skill> }) {
  const skill = await skillPromise;
  const tLevel = await getTranslations('skill.level');
  // Resolve the one `skill.level.*` string on the server for `SkillDetailBasicInfo` (client) so the
  // status row does not need `useTranslations` there—same idea as `getSkillLevelLabelMap` for grids.
  const statusLabel = tLevel(skill.status);

  return <SkillDetailBasicInfo skill={skill} statusLabel={statusLabel} />;
}

async function RelatedProjectsSection({
  projectsPromise,
  title,
}: {
  projectsPromise: Promise<Project[]>;
  title: string;
}) {
  const projects = await projectsPromise;

  return <ProjectGroup projects={projects} title={title} />;
}
