import Breadcrumb from '@/app/components/ui/Breadcrumb';
import { getSkills } from '@/lib/notion/skill';

import SkillGroup from '../components/SkillGroup';

const breadcrumbMenus = [
  { text: '开发', url: '/dev' },
  { text: '开发技能', url: '/dev/projects' },
];

export default async function DevProjects() {
  /* Get All Skills */
  const skills: Skill[] = await getSkills();

  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />
      <SkillGroup skills={skills} />
    </div>
  );
}
