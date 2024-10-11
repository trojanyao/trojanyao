import SkillItem from './SkillItem';

export default function SkillGrid() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {Array.from({ length: 10 }).map((item, index) => (
        <SkillItem key={index} />
      ))}
    </div>
  );
}
