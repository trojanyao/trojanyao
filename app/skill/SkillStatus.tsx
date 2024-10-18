type SkillStatusType = '学习中';
type SkillStatusSize = 'middle' | 'large';

export default function SkillStatus({
  status,
  size = 'middle',
}: {
  status: SkillStatusType;
  size?: SkillStatusSize;
}) {
  let color = '';

  switch (status) {
    case '学习中':
      color = 'primary';
  }

  return (
    <div className="flex items-center gap-1">
      <span
        className={`${
          size === 'large' ? 'size-3' : 'size-2'
        } bg-${color} rounded-full`}
      ></span>
      <span
        className={`text-${color} ${
          size === 'large' ? 'text-small' : 'text-[0.625rem]'
        } leading-none`}
      >
        {status}
      </span>
    </div>
  );
}
