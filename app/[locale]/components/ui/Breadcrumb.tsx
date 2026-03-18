import { Fragment } from 'react';
import Link from 'next/link';

import { HomeIcon } from '@heroicons/react/24/outline';

interface MenuItem {
  text: string;
  url?: string;
}

export default function Breadcrumb({ menus }: { menus: MenuItem[] }) {
  return (
    <div className="pt-4 pb-8 flex items-center gap-2">
      <Link href="/" aria-label="Home">
        <HomeIcon className="size-4 text-light" />
      </Link>

      {menus?.map((menu: MenuItem, index: number) => (
        <Fragment key={index.toString()}>
          <span className="text-small text-light">/</span>
          <div
            className={`${
              index === menus?.length - 1 ? 'text-secondary' : 'text-light'
            } text-small ${menu?.url ? 'hover:text-secondary' : ''}`}
          >
            {menu?.url ? (
              <Link href={menu?.url}>{menu?.text}</Link>
            ) : (
              <span className="cursor-not-allowed">{menu?.text}</span>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
