import { CommandLineIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import SectionHeader from '../components/SectionHeader';
import ServiceItem from '../service/ServiceItem';
import ProjectItem from '../project/ProjectItem';
import SkillItem from '../skill/SkillItem';
import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';

export default function Develop() {
  return (
    <div className="section-list">
      {/* Develop Service */}
      <section className="section-item">
        <SectionHeader title="开发服务" icon={<CommandLineIcon />} />

        <ul className="grid grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((item, index) => (
            <ServiceItem key={index} />
          ))}
        </ul>
      </section>

      {/* Develop Project */}
      <section className="section-item">
        <SectionHeader
          title="开发项目"
          url="/dev/projects"
          icon={<Squares2X2Icon />}
        />

        <div className="max-w-full flex gap-6 overflow-x-scroll">
          {Array.from({ length: 6 }).map((item, index) => (
            <ProjectItem key={index} />
          ))}
        </div>
      </section>

      {/* Develop Skills */}
      <section className="section-item">
        <SectionHeader
          url="/skill/dev"
          icon={<CodeBracketSquareIcon />}
          title="开发技能"
        />

        <div className="grid grid-cols-12 gap-6">
          {Array.from({ length: 10 }).map((item, index) => (
            <SkillItem key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
