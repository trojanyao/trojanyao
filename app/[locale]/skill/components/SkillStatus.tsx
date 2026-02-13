import { useTranslations } from 'next-intl';

export default function SkillStatus({ status }: { status: SkillStatus }) {
  const t = useTranslations('skill.level');

  let bg = '';
  let color = '';

  switch (status) {
    case 'learning':
      bg = 'bg-blue';
      color = 'text-blue';
      break;
    case 'proficient':
      bg = 'bg-green';
      color = 'text-green';
      break;
    case 'familiar':
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

      <span className={`text-mini leading-none whitespace-nowrap ${color}`}>{t(status)}</span>
    </div>
  );
}
