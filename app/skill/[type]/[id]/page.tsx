import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';

import Breadcrumb from '@/app/components/ui/Breadcrumb';
import ProjectList from '@/app/project/components/ProjectList';
import { getProjects } from '@/lib/notion/project';
import { getSkill } from '@/lib/notion/skill';

import SkillStatus from '../../components/SkillStatus';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const skill = await getSkill(id);

  return {
    title: skill?.name,
    description: skill?.description,
  };
}

export default async function SkillDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <SkillBreadcrumb dataPromise={getSkill(id)} />

      <Suspense fallback={<BasicInfoSkeleton />}>
        <SkillContent dataPromise={getSkill(id)} />
      </Suspense>
    </div>
  );
}

async function SkillBreadcrumb({ dataPromise }: { dataPromise: Promise<Skill> }) {
  const skill = await dataPromise;

  const breadcrumbMenus = [
    { text: '开发', url: '/dev' },
    { text: '开发技能', url: '/skill/dev' },
    { text: skill?.name },
  ];

  return <Breadcrumb menus={breadcrumbMenus} />;
}

async function SkillContent({ dataPromise }: { dataPromise: Promise<Skill> }) {
  const skill = await dataPromise;

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
      <BasicInfo skill={skill} />

      <ProjectList projects={projects} title="相关项目" />
    </div>
  );
}

function BasicInfo({ skill }: { skill: Skill }) {
  return (
    <div className="pt-8 flex justify-between items-center">
      {/* Left */}
      <div className="w-2/3 flex gap-6">
        <Image src={skill?.logo} alt={skill?.name} width={96} height={96} className="size-24" />

        <div className="py-1 flex flex-col justify-center gap-2">
          {/* Name & Link */}
          <div className="flex items-center gap-3">
            <h1 className="title-large">{skill?.name}</h1>

            {skill?.site && (
              <Link href={skill?.site} target="_blank" className="p-1 group">
                <ArrowTopRightOnSquareIcon className="size-4 text-light group-hover:text-primary" />
              </Link>
            )}
          </div>

          {/* Desc */}
          {skill?.description && (
            <div className="text-small text-light leading-normal">{skill?.description}</div>
          )}

          {/* Status */}
          <SkillStatus status={skill?.status} />
        </div>
      </div>
    </div>
  );
}

function BasicInfoSkeleton() {
  return (
    <div className="pt-8 flex justify-between items-center animate-pulse">
      {/* Left */}
      <div className="w-2/3 flex gap-6">
        <div className="bg-middle-gray size-24 aspect-square rounded-full" />

        <div className="py-1 flex flex-col justify-center gap-1 w-full">
          {/* Name & Link */}
          <div className="flex items-center gap-3">
            <div className="bg-middle-gray h-6 w-32 rounded-md" />
          </div>

          {/* Desc */}
          <div className="bg-middle-gray h-4 w-full rounded-md mt-2" />

          {/* Status */}
          <div className="bg-middle-gray h-4 w-24 rounded-md mt-4" />
        </div>
      </div>
    </div>
  );
}
