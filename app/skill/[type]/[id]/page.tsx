import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';

import Breadcrumb from '@/app/components/ui/Breadcrumb';
import ProjectList from '@/app/project/components/ProjectList';
import { getProjects } from '@/lib/notion/project';
import { getSkill } from '@/lib/notion/skill';

import SkillStatus from '../../components/SkillStatus';

export default async function SkillDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense>
      <SkillContent id={id} />
    </Suspense>
  );
}

async function SkillContent({ id }: { id: string }) {
  const skill: SkillItem = await getSkill(id);

  const breadcrumbMenus = [
    { text: '开发', url: '/dev' },
    { text: '开发技能', url: '/skill/dev' },
    { text: skill?.name },
  ];

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
    <div>
      <Breadcrumb menus={breadcrumbMenus} />

      <div className="flex flex-col gap-8">
        <BasicInfo skill={skill} />

        <ProjectList projects={projects} title="相关项目" />
      </div>
    </div>
  );
}

function BasicInfo({ skill }: { skill: SkillItem }) {
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
          <SkillStatus status={skill?.status} size="large" />
        </div>
      </div>
    </div>
  );
}
