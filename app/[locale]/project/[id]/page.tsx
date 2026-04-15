import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import SkillGridSkeleton from '@/app/[locale]/skill/components/skeleton/SkillGridSkeleton';
import SkillGrid from '@/app/[locale]/skill/components/SkillGrid';
import { getSkillLevelLabelMap } from '@/app/[locale]/skill/get-skill-level-labels';
import { getProject, getSkills } from '@/lib/notion';
import { checkIsPortrait } from '@/lib/utils/check-portrait';
import { checkUrlValid } from '@/lib/utils/check-url';

import PreviewGrid from '../components/primitives/PreviewGrid';
import ProductType from '../components/primitives/ProductType';
import Responsibilities from '../components/primitives/Responsibilities';
import StatusDown from '../components/primitives/StatusDown';

/* Metadata */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: 'project' });

  const project = await getProject(id);

  return {
    title: `${t('case')} - ${locale === 'zh' ? project?.name : project?.nameEN || project?.name}`,
    description: locale === 'zh' ? project?.desc : project?.descEN || project?.desc,
  };
}

/* Function Component */
export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectPromise = getProject(id);

  return (
    <div className="content-wrap">
      <ProjectBreadCrumb dataPromise={projectPromise} />
      <ProjectContent dataPromise={projectPromise} />
    </div>
  );
}

async function ProjectBreadCrumb({ dataPromise }: { dataPromise: Promise<Project> }) {
  const locale = await getLocale();
  const t = await getTranslations('dev');

  const project = await dataPromise;

  const menus = [
    { text: t('common') }, // TODO: open /dev url
    { text: t('dev-project'), url: '/project' },
    { text: locale === 'zh' ? project?.name : project?.nameEN || project?.name },
  ];

  return <Breadcrumb menus={menus} />;
}

async function ProjectContent({ dataPromise }: { dataPromise: Promise<Project> }) {
  const locale = await getLocale();
  const tProject = await getTranslations('project');

  const project = await dataPromise;

  return (
    <div className="flex flex-col gap-10">
      {/* <ProjectBasicSkeleton /> */}
      <BasicInfo project={project} />

      {/* Responsibilities & Achievements */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <Responsibilities
          color={project?.color}
          responsibilities={
            locale === 'zh'
              ? project?.responsibilities || []
              : project?.responsibilitiesEN || project?.responsibilities || []
          }
          key="responsibilities"
        />
        <div className="w-full h-px border-b lg:w-px lg:h-auto lg:border-r border-dashed border-secondary"></div>
        <Responsibilities
          color={project?.color}
          achievements={
            locale === 'zh'
              ? project?.achievements || []
              : project?.achievementsEN || project?.achievements || []
          }
          key="achievements"
        />
      </div>

      <Suspense
        fallback={
          <TechStackSkeleton
            title={tProject('tech-stack')}
            color={project?.color ? `#${project.color}` : 'var(--color-primary)'}
          />
        }
      >
        <TechStack project={project} />
      </Suspense>
      <Preview project={project} />
    </div>
  );
}

/* Component: BasicInfo */
function BasicInfo({ project }: { project: Project }) {
  const locale = useLocale();
  const tType = useTranslations('project.type');

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-10">
      {/* Details */}
      <div className="md:flex-1 pb-0 flex flex-col gap-6 md:py-2 md:gap-12 overflow-hidden">
        {/* Top */}
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Image src={project?.logo} alt={`${project?.name} Logo`} width={64} height={64} />

            <div className="flex flex-col gap-3">
              {/* Title + Labels */}
              <div className="flex items-center gap-2">
                <h1 className="title-small" style={{ color: `#${project?.color}` }}>
                  {locale === 'zh' ? project?.name : project?.nameEN || project?.name}
                </h1>

                <div className="flex items-center gap-1">
                  {project?.platform?.map((t: ProjectPlatformVisible, i) => (
                    <ProductType key={i} platform={t} label={tType(t)} />
                  ))}
                </div>
              </div>

              {/* Description */}
              <span className="text-small text-light">
                {locale === 'zh' ? project?.desc : project?.descEN || project?.desc}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 xl:gap-8">
          {/* Link */}
          {project?.preview && (
            <div className="flex flex-col lg:flex-row justify-start lg:items-center gap-2">
              {/* URL */}
              <div
                className="w-fit rounded-lg group"
                style={{
                  background: `#${project?.color}1A`, // '1A' stand for 10% transparency in HEX
                  color: `#${project?.color}`, // '99' stand for 60% transparency in HEX
                }}
              >
                {checkUrlValid(project?.preview) ? (
                  <Link
                    href={project?.preview}
                    target="_blank"
                    className="px-3 py-2 flex items-center gap-1 opacity-80 group-hover:opacity-100"
                  >
                    <ArrowTopRightOnSquareIcon className="size-4" />
                    <span className="text-small">{project?.preview}</span>
                  </Link>
                ) : (
                  <div className="px-3 py-2 flex text-small">
                    <span className="whitespace-pre-wrap leading-normal">
                      {locale === 'zh'
                        ? project?.preview
                        : project?.previewEN?.replaceAll('<br/>', '\n') || project?.preview}
                    </span>
                  </div>
                )}
              </div>

              {project?.status && (
                <StatusDown preview={project?.preview} status={project?.status} />
              )}
            </div>
          )}

          {project?.qrcode && project?.qrcode?.length > 0 && (
            <Image src={project?.qrcode[0]} alt={project?.name} width={100} height={100} />
          )}

          {/* Date */}
          <div className="ml-1 text-light text-mini">
            {project?.dateStart != project?.dateEnd
              ? `${project?.dateStart?.replaceAll('-', '.')} - ${project?.dateEnd?.replaceAll(
                  '-',
                  '.',
                )}`
              : project?.dateStart}
          </div>
        </div>
      </div>

      {/* Cover (LCP): preload injects <link rel="preload"> in <head> to cut resource-load-delay. */}
      <Image
        src={project?.coverAvif ?? project?.cover}
        alt={project?.name}
        width={600}
        height={450}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="w-full md:flex-1 aspect-4/3 self-start rounded-2xl border border-secondary overflow-hidden"
        preload
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}

/* Component: TechStack */
async function TechStack({ project }: { project: Project }) {
  const locale = await getLocale();
  const isEnglish = locale === 'en';
  // Tech stack grid: resolve status labels on the server once, then pass through `SkillGrid`.
  const statusLabels = await getSkillLevelLabelMap();
  const t = await getTranslations('project');

  // Returns unsorted skills
  const skills = await getSkills([
    {
      property: '相关项目',
      relation: {
        contains: project?.id,
      },
    },
  ]);

  // Returns skills' id manually sorted in Notion
  const relatedSkills = project?.skills ?? [];

  // Turn skills to expected order
  skills.sort((a: Skill, b: Skill) => {
    const indexA = relatedSkills.indexOf(a?.id);
    const indexB = relatedSkills.indexOf(b?.id);

    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  });

  return (
    <div>
      <SectionHeader
        title={t('tech-stack')}
        icon={<CodeBracketIcon />}
        color={`#${project?.color}`}
      />
      <SkillGrid skills={skills} isEnglish={isEnglish} statusLabels={statusLabels} />
    </div>
  );
}

/* Component: Preview */
function Preview({ project }: { project: Project }) {
  const t = useTranslations('project');

  const isPortrait = checkIsPortrait(project?.width ?? 0, project?.height ?? 0);

  return (
    <div>
      <SectionHeader
        title={t('screenshots')}
        icon={isPortrait ? <DevicePhoneMobileIcon /> : <ComputerDesktopIcon />}
        color={`#${project?.color}`}
      />
      <PreviewGrid
        list={project?.screenshots ?? []}
        width={project?.width ?? 1200}
        height={project?.height ?? 800}
        showBorder={project?.screenshotBorder ?? false}
      />
    </div>
  );
}

function TechStackSkeleton({ title, color }: { title: string; color: string }) {
  return (
    <div className="animate-pulse">
      <SectionHeader title={title} icon={<CodeBracketIcon />} color={color}>
        <div className="h-7" />
      </SectionHeader>
      <div className="mt-6">
        <SkillGridSkeleton length={6} />
      </div>
    </div>
  );
}
