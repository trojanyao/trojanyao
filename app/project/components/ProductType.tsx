'use client';

import type { ProjectValueType } from '@/lib/notion';

export default function ProductType({ type }: { type: ProjectValueType }) {
  let color = '';

  switch (type) {
    case 'Web App · 桌面端':
    case 'Web App · 移动端':
      color = 'bg-blue/10 text-blue';
      break;
    case 'Web 官网 · 桌面端':
    case 'Web 官网 · 移动端':
    case 'Android':
      color = 'bg-green/10 text-green';
      break;
    case 'PWA':
    case '微信小程序':
      color = 'bg-purple/10 text-purple';
      break;
    case 'iOS':
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
      {type}
    </div>
  );
}
