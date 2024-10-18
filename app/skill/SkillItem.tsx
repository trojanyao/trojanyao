import Image from 'next/image';
import Link from 'next/link';

import NextLogo from '@/public/next_logo.png';
import SkillStatus from './SkillStatus';

function getRandomAngle(angle: number) {
  return Math.random() < 0.5 ? `-rotate-[${angle}deg]` : `rotate-[${angle}deg]`;
}

export default function SkillItem() {
  const angle = getRandomAngle(15);

  return (
    <Link
      href="/skill/dev/next.js"
      className="col-span-2 bg-light-gray p-4 rounded-2xl flex items-center gap-3 group"
    >
      <Image
        src={NextLogo}
        alt="Next"
        className={`size-10 group-hover:${angle} transition-all duration-300`}
      />

      <div className="flex flex-col gap-2">
        <div className="font-medium">Next.js</div>
        <SkillStatus status="学习中" />
      </div>
    </Link>
  );
}
