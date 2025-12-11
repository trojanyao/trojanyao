import SkillItem from './SkillItem';

export default function SkillGrid({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {skills?.map((item) => (
        <SkillItem key={item?.id} data={item} />
      ))}
    </div>
  );
}
