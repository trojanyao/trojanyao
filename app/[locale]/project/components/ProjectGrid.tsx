import ProjectItemClient from './ProjectItemClient';

export default function ProjectGrid({
  list,
  /** True for the first group on the page (only its first card may be the LCP cover). */
  isFirstGroup = false,
}: {
  list: Project[];
  isFirstGroup?: boolean;
}) {
  list.sort((a, b) => new Date(b.dateEnd)?.getTime() - new Date(a?.dateEnd)?.getTime());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((item, index) => (
        <ProjectItemClient
          key={item.id}
          data={item}
          isHeroCover={Boolean(isFirstGroup && index === 0)}
        />
      ))}
    </div>
  );
}
