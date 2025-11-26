import SkillItem from './SkillItem';

export default function SkillGrid({ data }: { data: SkillItem[] }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {data?.map((item) => (
        <SkillItem key={item?.id} data={item} />
      ))}
    </div>
  );
}
