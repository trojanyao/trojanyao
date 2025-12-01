import { CheckBadgeIcon } from '@heroicons/react/24/outline';

import ProjectItem from '@/app/project/components/ProjectItem';
import { getProjects } from '@/lib/notion';

import SectionHeader from '../common/SectionHeader';

export default async function SectionProject() {
  const projects = await getProjects([{ property: '首页精选', checkbox: { equals: true } }]);

  projects.sort((a, b) => {
    return new Date(b.dateEnd).getTime() - new Date(a.dateEnd).getTime();
  });

  return (
    <section>
      <SectionHeader url="/project" title="精选项目" icon={<CheckBadgeIcon />} />

      <div className="max-w-full flex gap-6 overflow-x-scroll">
        {projects?.map((item, index) => (
          <ProjectItem key={index} data={item} />
        ))}
      </div>
    </section>
  );
}
