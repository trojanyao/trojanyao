import { CommandLineIcon } from '@heroicons/react/24/outline';

import SkillGrid from '@/app/skill/components/SkillGrid';
import { getSkills } from '@/lib/notion';

import SectionHeader from '../common/SectionHeader';

export default async function SectionSkill() {
  const skills = await getSkills();

  return (
    <section>
      <SectionHeader url="/skill" icon={<CommandLineIcon />} title="技能" />
      <SkillGrid data={skills} />
    </section>
  );
}
