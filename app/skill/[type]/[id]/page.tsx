import Breadcrumb from '@/app/components/Breadcrumb';
import Button from '@/app/components/Button';
import Link from 'next/link';
import Image from 'next/image';

import NextLogo from '@/public/next_logo.png';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import SkillStatus from '../../SkillStatus';
import {
  ClockIcon,
  DocumentTextIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import Line from '@/app/components/Line';
import SectionHeader from '@/app/components/SectionHeader';
import GroupBy from '@/app/components/GroupBy';
import ProjectGrid from '@/app/project/ProjectGrid';

const breadcrumbMenus = [
  { text: '开发', url: '/dev' },
  { text: '开发技能', url: '/dev/projects' },
  { text: 'Next.js' },
];

const groupByOptions = [
  { icon: <ClockIcon />, text: '按时间' },
  { icon: <RectangleGroupIcon />, text: '按形态' },
];

export default function SkillDetail() {
  function BasicInfo() {
    return (
      <div className="pt-8 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-6">
          <Image src={NextLogo} alt="Next.js" className="size-24" />

          <div className="flex flex-col gap-3">
            {/* Name & Link */}
            <div className="flex items-center gap-2">
              <h1 className="title-large">Next.js</h1>
              <Link href="https://nextjs.org/" target="_blank">
                <Button variant="default" shape="square" className="size-8">
                  <ArrowTopRightOnSquareIcon className="size-4 text-light hover:text-primary" />
                </Button>
              </Link>
            </div>

            {/* Desc */}
            <div className="text-small text-light">
              由 Vercel 开发和维护的全栈 React 框架，支持 SSR（服务端渲染）和
              SSG（静态网站生成）
            </div>

            {/* Status */}
            <SkillStatus status="学习中" size="large" />
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4 text-secondary">
          <div className="flex items-center gap-2">
            <Squares2X2Icon className="size-6" />
            <span className="text-middle">相关项目 8 个</span>
          </div>
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="size-6" />
            <span className="text-middle">相关文章 8 篇</span>
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
        <Line type="secondary" />

        <div className="flex flex-col gap-4">
          {/* Title */}
          <SectionHeader
            title="相关项目"
            icon={<Squares2X2Icon />}
            size="small"
          >
            <GroupBy options={groupByOptions} />
          </SectionHeader>

          {/* List */}
          <ul className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((item, index) => (
              <li key={index} className="flex flex-col gap-4">
                <div className="text-middle font-medium text-secondary">
                  2024
                </div>
                <ProjectGrid />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
