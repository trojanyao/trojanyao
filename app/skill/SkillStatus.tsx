type SkillStatusType = '学习中';

export default function SkillStatus({ status }: { status: SkillStatusType }) {
  let color = '';

  switch (status) {
    case '学习中':
      color = 'primary';
  }

  return (
    <div className="flex items-center gap-1">
      <span className={`size-2 bg-${color} rounded-full`}></span>
      <span className={`text-${color} text-[0.625rem] leading-none`}>
        {status}
      </span>
    </div>
  );
}
