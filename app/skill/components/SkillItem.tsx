import Image from 'next/image';
import Link from 'next/link';

import SkillStatus from './SkillStatus';

function getAngleFromId(id: string) {
  let hash = 0;
  for (const ch of id) {
    hash = (hash << 5) - hash + ch.charCodeAt(0);
    hash |= 0; // 转成 32 位有符号
  }
  return hash % 2 === 0 ? 'group-hover:rotate-[-10deg]' : 'group-hover:rotate-[10deg]';
}

export default function SkillItem({ data }: { data: Skill }) {
  const angle = getAngleFromId(data?.id);

  return (
    <Link
      href={`/skill/dev/${data?.id}`}
      className="bg-light-gray p-4 rounded-2xl flex items-center gap-3 group"
    >
      <Image
        src={data?.logo}
        alt={data?.name}
        width={40}
        height={40}
        className={`size-10 min-w-10 min-h-10 rounded-xl squircle overflow-hidden ${angle} transition-all duration-300`}
      />

      <div className="h-full py-[2px] flex flex-col justify-between overflow-hidden">
        <div className="font-medium leading-tight overflow-x-hidden whitespace-nowrap text-ellipsis">
          {data?.name}
        </div>

        <SkillStatus status={data?.status} />
      </div>
    </Link>
  );
}
