import { IdentificationIcon, WalletIcon } from '@heroicons/react/24/outline';
import { RocketLaunchIcon, UserGroupIcon } from '@heroicons/react/24/outline';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';

const modes = [
  {
    icon: <RocketLaunchIcon />,
    zh: '项目制',
  },
  {
    icon: <UserGroupIcon />,
    zh: '短期雇佣',
  },
  {
    icon: <IdentificationIcon />,
    zh: '长期雇佣',
  },
];

export default function CooperationModes() {
  return (
    <div>
      <SectionHeader title="合作模式" icon={<WalletIcon />} />

      <div className="mt-8 flex item-center justify-between gap-0">
        {modes.map((mode, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-4">
            <div className="size-8 text-primary">{mode.icon}</div>
            <div className="text-small">{mode.zh}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
