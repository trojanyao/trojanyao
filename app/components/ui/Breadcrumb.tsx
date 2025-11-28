import { Fragment } from 'react';
import Link from 'next/link';

import { HomeIcon } from '@heroicons/react/16/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface MenuItem {
  text: string;
  url?: string;
}

export default function Breadcrumb({ menus }: { menus: MenuItem[] }) {
  return (
    <div className="pt-4 pb-8 flex items-center gap-2">
      <Link href="/">
        <HomeIcon className="size-4 text-light" />
      </Link>

      <div className="flex items-center gap-1">
        {menus?.map((menu: MenuItem, index: number) => (
          <Fragment key={index.toString()}>
            <ChevronRightIcon className="size-4 text-light" />
            <div
              className={`${
                index === menus?.length - 1 ? 'text-secondary' : 'text-light'
              } text-small ${menu?.url ? 'hover:text-secondary' : ''}`}
            >
              {menu?.url ? <Link href={menu?.url}>{menu?.text}</Link> : <span>{menu?.text}</span>}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
