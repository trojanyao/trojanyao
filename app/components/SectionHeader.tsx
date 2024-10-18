import Link from 'next/link';

import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';

export default function SectionHeader({
  url,
  title,
  icon,
  children,
  size = 'middle',
}: {
  url?: string;
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  size?: 'middle' | 'small';
}) {
  const showArrow = !!url;

  function content() {
    return (
      <div
        className={`flex items-center gap-1 ${showArrow && 'cursor-pointer'}`}
      >
        <div className="flex items-center gap-2">
          <div className="size-6">{icon}</div>
          <span className={size === 'small' ? 'title-small' : 'title-middle'}>
            {title}
          </span>
        </div>

        {showArrow && (
          <ChevronDoubleRightIcon className="size-5 group-hover:animate-bounce-right" />
        )}
      </div>
    );
  }

  return (
    <div
      className={`w-full px-[2px] ${
        size === 'small' ? 'mb-4' : 'mb-6'
      } flex justify-between items-center`}
    >
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
