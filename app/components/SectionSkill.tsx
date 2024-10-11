import { CommandLineIcon } from '@heroicons/react/24/outline';
import SectionHeader from './SectionHeader';
import SkillItem from '../skill/SkillItem';
import SkillGrid from '../skill/SkillGrid';

export default function SectionSkill() {
  return (
    <section>
      <SectionHeader url="/skill" icon={<CommandLineIcon />} title="技能" />
      <SkillGrid />
    </section>
  );
}
