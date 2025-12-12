'use client';

import Image from 'next/image';
import Link from 'next/link';

import LogoText from '@/public/logo+text.svg';

// const menus = [
//   [
//     {
//       name: '服务',
//       path: '/service',
//     },
//     {
//       name: '开发',
//       path: '/dev',
//     },
//   ],
//   [
//     {
//       name: '关于',
//       path: '/about',
//     },
//     {
//       name: '留言板',
//       path: 'guestbook',
//     },
//   ],
// ];

export default function Nav() {
  // const pathname = usePathname();

  return (
    <header className="w-[1200px] h-24 mx-auto absolute z-10 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image src={LogoText} alt="Logo" height={48} priority />
        </Link>
      </div>

      {/* Nav */}
      {/* <nav className="bg-white/75 px-4 py-3 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.05)] backdrop-blur-[6px] fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {menus.map((menuGroup, groupIndex) => (
          <Fragment key={groupIndex}>
            {groupIndex !== 0 && <div className="w-[1px] h-4 bg-[var(--border-secondary)]" />}
            <ul className="flex items-center">
              {menuGroup.map((menu, index) => (
                <li
                  key={menu.path}
                  className={`${
                    index === 0 ? '-mr-1' : index === menuGroup?.length - 1 ? '-ml-1' : '-mx-1'
                  } flex`}
                >
                  <Link
                    href={menu.path}
                    className={`hover:bg-gradient-link px-4 py-3 rounded-full text-primary leading-none text-nowrap ${
                      pathname === menu.path && 'font-medium bg-gradient-link'
                    }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </nav> */}

      {/* Tools */}
      <div>
        {/* <Link href="/rss">
          <RssIcon className="size-5 text-orange cursor-pointer" />
        </Link> */}
      </div>
    </header>
  );
}
