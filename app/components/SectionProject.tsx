import { CheckBadgeIcon } from '@heroicons/react/24/outline';

import ProjectItem from '../project/components/ProjectItem';
import SectionHeader from './SectionHeader';
import { getProjects } from '@/lib/notion';

export default async function SectionProject() {
  const projects = await getProjects([{ property: '首页精选', checkbox: { equals: true } }]);

  return (
    <section>
      <SectionHeader url="/project" title="精选项目" icon={<CheckBadgeIcon />} />

      <div className="max-w-full flex gap-6 overflow-x-scroll">
        {projects.map((item, index) => (
          <ProjectItem key={index} data={item} />
        ))}
      </div>
    </section>
  );
}
