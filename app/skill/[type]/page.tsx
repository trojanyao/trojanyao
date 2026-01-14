import { Metadata } from 'next';

import Breadcrumb from '@/app/components/ui/Breadcrumb';
import { getSkills } from '@/lib/notion/skill';

import SkillGroup from '../components/SkillGroup';

const breadcrumbMenus = [
  { text: '开发', url: '/dev' },
  { text: '开发技能', url: '/dev/projects' },
];

export const metadata: Metadata = {
  title: '开发技能',
  description: '已掌握、使用过和学习中的开发技能，包括前端、服务端、App 及其他。',
};

export default async function Skills() {
  /* Get All Skills */
  const skills: Skill[] = await getSkills();

  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />
      <SkillGroup skills={skills} />
    </div>
  );
}
