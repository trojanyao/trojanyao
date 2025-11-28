import Link from 'next/link';

import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';

export default function SectionHeader({
  url,
  title,
  icon,
  color,
  children,
}: {
  url?: string;
  title: string;
  icon: React.ReactNode;
  color?: string;
  children?: React.ReactNode;
}) {
  const showArrow = !!url;

  /* Title */
  function content() {
    return (
      <div className={`flex items-center gap-1 ${showArrow && 'cursor-pointer'}`}>
        <div className="flex items-center gap-2" style={{ color }}>
          <div className="size-6">{icon}</div>
          <span className="title-small">{title}</span>
        </div>

        {showArrow && (
          <ChevronDoubleRightIcon className="size-5 group-hover:animate-bounce-right" />
        )}
      </div>
    );
  }

  return (
    <div className={`w-full px-[2px] mb-4 flex justify-between items-center`}>
      {/* Left */}
      {showArrow ? (
        <Link href={url || '#'} className="group">
          {content()}
        </Link>
      ) : (
        <div>{content()}</div>
      )}

      {/* Right */}
      {children}
    </div>
  );
}
