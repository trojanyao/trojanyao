import ProjectItem from "./ProjectItem";

export default function ProjectGrid() {
  return (
    <ul className="grid grid-cols-3 gap-6">
      {Array.from({ length: 4 }).map((item, index) => (
        <ProjectItem key={index} />
      ))}
    </ul>
  );
}
