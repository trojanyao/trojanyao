import { CheckBadgeIcon } from '@heroicons/react/24/outline';

import SectionHeader from './SectionHeader';
import ProjectItem from '../project/ProjectItem';

export default function SectionProject() {
  return (
    <section>
      <SectionHeader
        url="/project"
        title="精选项目"
        icon={<CheckBadgeIcon />}
      ></SectionHeader>

      <div className="max-w-full flex gap-6 overflow-x-scroll">
        {Array.from({ length: 6 }).map((item, index) => (
          <ProjectItem key={index} />
        ))}
      </div>
    </section>
  );
}
