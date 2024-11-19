type SkillStatusSize = 'middle' | 'large';

export default function SkillStatus({
  status,
  size = 'middle',
}: {
  status: SkillStatusType;
  size?: SkillStatusSize;
}) {
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
      <span className={`${size === 'large' ? 'size-3' : 'size-2'} ${bg} rounded-full`}></span>
      <span
        className={`${color} ${size === 'large' ? 'text-small' : 'text-[0.625rem]'} leading-none`}
      >
        {status}
      </span>
    </div>
  );
}
