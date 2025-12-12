import { Squares2X2Icon, CodeBracketSquareIcon } from '@heroicons/react/24/outline';

import { getProjects, getSkills } from '@/lib/notion';

import SectionHeader from '../components/common/SectionHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProjectItem from '../project/components/ProjectItem';
import SkillGrid from '../skill/components/SkillGrid';

export default async function Develop() {
  const projects = await getProjects([{ property: '首页精选', checkbox: { equals: true } }]);
  const skills = await getSkills([
    {
      property: '首页精选',
      checkbox: { equals: true },
    },
  ]);

  return (
    <div>
      <Breadcrumb menus={[{ text: '开发' }]} />
      <div className="section-list">
        {/* Develop Service */}
        {/* <section className="section-item">
        <SectionHeader title="开发服务" icon={<CommandLineIcon />} />

        <ul className="grid grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((item, index) => (
            <ServiceItem key={index} />
          ))}
        </ul>
      </section> */}

        {/* Develop Project */}
        <section className="section-item">
          <SectionHeader title="开发项目" url="/project" icon={<Squares2X2Icon />} />

          <div className="max-w-full flex gap-6 overflow-x-scroll">
            {projects.map((item, index) => (
              <ProjectItem key={index} data={item} />
            ))}
          </div>
        </section>

        {/* Develop Skills */}
        <section className="section-item">
          <SectionHeader url="/skill/dev" icon={<CodeBracketSquareIcon />} title="开发技能" />
          <SkillGrid skills={skills} />
        </section>
      </div>
    </div>
  );
}
