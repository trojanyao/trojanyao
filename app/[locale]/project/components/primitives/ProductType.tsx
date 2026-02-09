'use client';

import { useTranslations } from 'next-intl';

export default function ProductType({ platform }: { platform: ProjectPlatformVisible }) {
  const t = useTranslations('project.type');

  let color = '';

  switch (platform) {
    case 'web-desktop':
    case 'web-mobile':
      color = 'bg-blue/10 text-blue';
      break;
    case 'website-desktop':
    case 'website-mobile':
    case 'android':
      color = 'bg-green/10 text-green';
      break;
    case 'pwa':
    case 'weapp':
      color = 'bg-purple/10 text-purple';
      break;
    case 'ios':
      color = 'bg-orange/10 text-orange';
      break;
    default:
      color = 'bg-primary/10 text-primary';
      break;
  }

  return (
    <div
      className={`px-2 py-1 ${color} rounded-full text-center text-[0.625rem] whitespace-nowrap`}
    >
      {t(platform)}
    </div>
  );
}
