import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';

import SectionHeader from '@/app/components/common/SectionHeader';
import Breadcrumb from '@/app/components/ui/Breadcrumb';
import GroupBy from '@/app/components/ui/GroupBy';
import Line from '@/app/components/ui/Line';
import { getSkill, getSkills } from '@/lib/notion/skill';
import { groupBy } from '@/lib/utils/group-by';

import SkillGroup from '../components/SkillGroup';

const breadcrumbMenus = [
  { text: '开发', url: '/dev' },
  { text: '开发技能', url: '/dev/projects' },
];

export default async function DevProjects() {
  /* Get All Skills */
  const skills: SkillItem[] = await getSkills();

  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />
      <SkillGroup skills={skills} />
    </div>
  );
}
