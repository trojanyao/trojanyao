import ProjectItem from './ProjectItem';

export default function ProjectGrid({ list }: { list: Project[] }) {
  list.sort((a, b) => new Date(b.dateEnd)?.getTime() - new Date(a?.dateEnd)?.getTime());

  return (
    <ul className="grid grid-cols-3 gap-6">
      {list.map((item, index) => (
        <ProjectItem key={index} data={item} />
      ))}
    </ul>
  );
}
