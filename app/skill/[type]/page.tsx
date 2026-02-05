import { Suspense } from 'react';

import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

import SectionHeader from '@/app/components/common/SectionHeader';
import Breadcrumb from '@/app/components/ui/Breadcrumb';
import Line from '@/app/components/ui/Line';
import { getSkills } from '@/lib/notion/skill';

import SkillGroup from '../components/SkillGroup';
import SkillItemSkeleton from '../components/SkillItemSkeleton';

const breadcrumbMenus = [
  { text: '开发', url: '/dev' },
  { text: '开发技能', url: '/dev/projects' },
];

export const metadata: Metadata = {
  title: '开发技能',
  description: '已掌握、使用过和学习中的开发技能，包括前端、服务端、App 及其他。',
};

export default async function Skills() {
  return (
    <div className="content-wrap">
      <Breadcrumb menus={breadcrumbMenus} />

      {/* <SkillListSkeleton /> */}

      <Suspense fallback={<SkillListSkeleton />}>
        <SkillListContent />
      </Suspense>
    </div>
  );
}

async function SkillListContent() {
  /* Get All Skills */
  const skills: Skill[] = await getSkills();

  return <SkillGroup skills={skills} />;
}

function SkillListSkeleton() {
  const skeletonArray = [
    { text: '较熟练', count: 15 },
    { text: '使用过', count: 12 },
  ];

  return (
    <div>
      <SectionHeader title="开发技能" icon={<CodeBracketSquareIcon />}>
        {/* Avoid CLS */}
        <div className="h-7"></div>
      </SectionHeader>

      <div className="flex flex-col gap-6">
        <Line type="secondary" />

        {skeletonArray.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-4">
            <div className="title-small text-secondary">{item.text}</div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: item.count }).map((_, idx) => (
                <SkillItemSkeleton key={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
