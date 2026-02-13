import { IdentificationIcon, WalletIcon } from '@heroicons/react/24/outline';
import { RocketLaunchIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useLocale, useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';

const modes = [
  {
    icon: <RocketLaunchIcon />,
    zh: '项目制',
    en: 'Project-based',
  },
  {
    icon: <UserGroupIcon />,
    zh: '短期雇佣',
    en: 'Short-term Contract',
  },
  {
    icon: <IdentificationIcon />,
    zh: '长期雇佣',
    en: 'Long-term Contract',
  },
];

export default function CooperationModes() {
  const locale = useLocale();
  const t = useTranslations('resume.title');

  const lang = locale === 'zh' ? 'zh' : 'en';

  return (
    <div>
      <SectionHeader title={t('modes')} icon={<WalletIcon />} />

      <div className="mt-8 flex item-center justify-between gap-0">
        {modes.map((mode, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-4">
            <div className="size-8 text-primary">{mode.icon}</div>
            <div className="text-center text-small leading-normal">{mode[lang]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
