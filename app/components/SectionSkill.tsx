import { CommandLineIcon } from '@heroicons/react/24/outline';
import SkillGrid from '../skill/SkillGrid';
import SectionHeader from './SectionHeader';
import { getSkills } from '@/lib/notion';

export default async function SectionSkill() {
  const skills = await getSkills();

  return (
    <section>
      <SectionHeader url="/skill" icon={<CommandLineIcon />} title="技能" />
      <SkillGrid data={skills} />
    </section>
  );
}
