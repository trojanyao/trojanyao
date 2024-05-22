import { CommandLineIcon } from '@heroicons/react/24/outline';
import SectionHeader from './SectionHeader';
import SkillItem from '../skill/SkillItem';

export default function SectionSkill() {
  return (
    <section>
      <SectionHeader url="/skill" icon={<CommandLineIcon />} title="技能" />

      <div className="grid grid-cols-12 gap-6">
        {Array.from({ length: 10 }).map((item, index) => (
          <SkillItem key={index} />
        ))}
      </div>
    </section>
  );
}
