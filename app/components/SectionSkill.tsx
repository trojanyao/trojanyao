import { CommandLineIcon } from '@heroicons/react/24/outline';

import { getSkills } from '@/lib/notion';

import SectionHeader from './SectionHeader';
import SkillGrid from '../skill/components/SkillGrid';

export default async function SectionSkill() {
  const skills = await getSkills();

  return (
    <section>
      <SectionHeader url="/skill" icon={<CommandLineIcon />} title="技能" />
      <SkillGrid data={skills} />
    </section>
  );
}
