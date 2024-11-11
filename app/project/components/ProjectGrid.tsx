import ProjectItem from './ProjectItem';

export default function ProjectGrid({ list }: { list: ProjectItem[] }) {
  return (
    <ul className="grid grid-cols-3 gap-6">
      {list.map((item, index) => (
        <ProjectItem key={index} data={item} />
      ))}
    </ul>
  );
}
