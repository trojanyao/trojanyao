import { skillStatuses } from '@/lib/constants/skill.constants';

import SkillItem from './SkillItem';

export default function SkillGrid({ skills }: { skills: Skill[] }) {
  skills.sort((a, b) => {
    const indexA = skillStatuses.indexOf(a?.status);
    const indexB = skillStatuses.indexOf(b?.status);
    return indexA - indexB;
  });

  return (
    <div className="grid grid-cols-6 gap-4">
      {skills?.map((item) => (
        <SkillItem key={item?.id} data={item} />
      ))}
    </div>
  );
}
