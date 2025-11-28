import Image from 'next/image';
import Link from 'next/link';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import { DocumentTextIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

import Breadcrumb from '@/app/components/Breadcrumb';
import Button from '@/app/components/Button';
import Line from '@/app/components/Line';
import ProjectList from '@/app/project/components/ProjectList';
import { getProjects } from '@/lib/notion/project';
import { getSkill } from '@/lib/notion/skill';

import SkillStatus from '../../components/SkillStatus';

export default async function SkillDetail({ params }: { params: { id: string } }) {
  const skill: SkillItem = await getSkill(params?.id);

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

  function BasicInfo() {
    return (
      <div className="pt-8 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Image src={skill?.logo} alt={skill?.name} width={96} height={96} className="size-24" />

          <div className="flex flex-col gap-3">
            {/* Name & Link */}
            <div className="flex items-center gap-2">
              <h1 className="title-large">{skill?.name}</h1>
              {skill?.site && (
                <Link href={skill?.site} target="_blank">
                  <Button variant="default" shape="square" className="size-8">
                    <ArrowTopRightOnSquareIcon className="size-4 text-light hover:text-primary" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Desc */}
            <div className="text-small text-light">{skill?.description}</div>

            {/* Status */}
            <SkillStatus status={skill?.status} size="large" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />

      <div className="flex flex-col gap-8">
        <BasicInfo />

        <ProjectList projects={projects} title="相关项目" />
      </div>
    </div>
  );
}
