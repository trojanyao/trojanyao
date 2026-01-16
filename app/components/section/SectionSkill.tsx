import { CommandLineIcon } from '@heroicons/react/24/outline';

import SkillGrid from '@/app/skill/components/SkillGrid';
import { getSkills } from '@/lib/notion';

import SectionHeader from '../common/SectionHeader';

export default async function SectionSkill() {
  const skills = await getSkills([
    {
      property: '首页精选',
      checkbox: { equals: true },
    },
  ]);

  const order = ['学习中', '熟练', '使用过'];
  skills.sort((a, b) => {
    const indexA = order.indexOf(a.status);
    const indexB = order.indexOf(b.status);
    return indexA - indexB;
  });

  return (
    <section>
      <SectionHeader url="/skill/dev" icon={<CommandLineIcon />} title="技能" />
      <SkillGrid skills={skills} />
    </section>
  );
}
