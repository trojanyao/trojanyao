import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import ProjectGroup from '@/app/[locale]/project/components/ProjectGroup';
import { getProjects } from '@/lib/notion/project';
import { getSkill } from '@/lib/notion/skill';
import { getProjectListFirstGridCoverHref } from '@/lib/utils/project-list-first-cover';

import SkillDetailBasicInfo from './components/SkillDetailBasicInfo';

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
  const [skill, projects] = await Promise.all([skillPromise, projectsPromise]);
  const firstCoverHref = getProjectListFirstGridCoverHref(projects);

  return (
    <div className="content-wrap">
      <SkillBreadcrumb skill={skill} />

      {skill?.logo ? (
        <link rel="preload" as="image" href={skill.logo} fetchPriority="high" />
      ) : null}

      {firstCoverHref ? (
        <link rel="preload" as="image" href={firstCoverHref} fetchPriority="high" />
      ) : null}

      <SkillContent skill={skill} projects={projects} />
    </div>
  );
}

async function SkillBreadcrumb({ skill }: { skill: Skill }) {
  const locale = await getLocale();
  const t = await getTranslations();

  const breadcrumbMenus = [
    { text: t('common.dev'), url: '/dev' },
    { text: t('skill.dev-skill'), url: '/skill/dev' },
    { text: locale === 'en' ? skill?.nameEN || skill?.name : skill?.name },
  ];

  return <Breadcrumb menus={breadcrumbMenus} />;
}

async function SkillContent({ skill, projects }: { skill: Skill; projects: Project[] }) {
  const t = await getTranslations();
  const tLevel = await getTranslations('skill.level');
  // Resolve the one `skill.level.*` string on the server for `SkillDetailBasicInfo` (client) so the
  // status row does not need `useTranslations` there—same idea as `getSkillLevelLabelMap` for grids.
  const statusLabel = tLevel(skill.status);

  return (
    <div className="flex flex-col gap-8">
      <SkillDetailBasicInfo skill={skill} statusLabel={statusLabel} />
      <ProjectGroup projects={projects} title={t('skill.related-project')} />
    </div>
  );
}
