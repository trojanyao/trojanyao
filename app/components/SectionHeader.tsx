import Link from 'next/link';

import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function SectionHeader({
  url,
  title,
  icon,
  children,
}: {
  url: string;
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full px-[2px] mb-6 flex justify-between items-center">
      {/* Left */}
      <Link href={url} className="group">
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="size-6">{icon}</div>
            <span className="text-xl font-semibold">{title}</span>
          </div>

          <ArrowRightIcon className="size-5 group-hover:animate-bounce-right" />
        </div>
      </Link>

      {/* Right */}
      {children}
    </div>
  );
}
