export default function SkillStatus({ status }: { status: SkillStatus }) {
  let bg = '';
  let color = '';

  switch (status) {
    case '学习中':
      bg = 'bg-blue';
      color = 'text-blue';
      break;
    case '熟练':
      bg = 'bg-green';
      color = 'text-green';
      break;
    case '使用过':
      bg = 'bg-orange';
      color = 'text-orange';
      break;
    default:
      bg = 'bg-primary';
      color = 'text-primary';
      break;
  }

  return (
    <div className="flex items-center gap-1">
      <div className={`size-2 ${bg} rounded-full`}></div>

      <span className={`text-mini leading-none ${color}`}>{status}</span>
    </div>
  );
}
