import Image from 'next/image';
import Link from 'next/link';

import SkillStatus from './SkillStatus';
import NextLogo from '@/public/next_logo.png';

function getRandomAngle(angle: number) {
  return Math.random() < 0.5
    ? `group-hover:rotate-[-${angle}deg]`
    : `group-hover:rotate-[${angle}deg]`;
}

export default function SkillItem({ data }: { data: SkillItem }) {
  const angle = getRandomAngle(15);

  return (
    <Link
      href={`/skill/dev/${data?.id}`}
      className="col-span-2 bg-light-gray p-4 rounded-2xl flex items-center gap-3 group"
    >
      <Image
        src={data?.logo}
        alt={data?.name}
        width={40}
        height={40}
        className={`size-10 ${angle} transition-all duration-300`}
      />

      <div className="flex flex-col gap-2">
        <div className="font-medium">{data?.name}</div>
        <SkillStatus status={data?.status} />
      </div>
    </Link>
  );
}
