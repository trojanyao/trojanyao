import {
  CommandLineIcon,
  Squares2X2Icon,
  CodeBracketSquareIcon,
} from '@heroicons/react/24/outline';

import { getProjects } from '@/lib/notion';

import SectionHeader from '../components/common/SectionHeader';
import ProjectItem from '../project/components/ProjectItem';
import ServiceItem from '../service/components/ServiceItem';
import SkillItem from '../skill/components/SkillItem';

export default async function Develop() {
  const projects = await getProjects([{ property: '首页精选', checkbox: { equals: true } }]);

  return (
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
        <SectionHeader title="开发项目" url="/dev/projects" icon={<Squares2X2Icon />} />

        <div className="max-w-full flex gap-6 overflow-x-scroll">
          {projects.map((item, index) => (
            <ProjectItem key={index} data={item} />
          ))}
        </div>
      </section>

      {/* Develop Skills */}
      <section className="section-item">
        <SectionHeader url="/skill/dev" icon={<CodeBracketSquareIcon />} title="开发技能" />

        <div className="grid grid-cols-12 gap-6">
          {/* {Array.from({ length: 10 }).map((item, index) => (
            <SkillItem key={index} />
          ))} */}
        </div>
      </section>
    </div>
  );
}
