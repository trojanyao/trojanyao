'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useTranslations } from 'next-intl';
import { Fragment } from 'react/jsx-runtime';

import { Link } from '@/i18n/navigation';
import LogoText from '@/public/logo+text.svg';
import Logo from '@/public/logo.svg';

import GitHubLink from './GitHubLink';
import LinkedInLink from './LinkedInLink';

const headerHeightClass = 'h-20';

export default function Nav() {
  const pathname = usePathname();
  const t = useTranslations('common');

  const menus = [
    [
      {
        name: t('service'),
        path: '/resume',
      },
      {
        name: t('project'),
        path: '/project',
      },
      {
        name: t('skill'),
        path: '/skill/dev',
      },
    ],
    // [
    //   {
    //     name: '关于',
    //     path: '/about',
    //   },
    //   {
    //     name: '留言板',
    //     path: 'guestbook',
    //   },
    // ],
  ];

  return (
    <header
      className={`w-full max-w-[1200px] ${headerHeightClass} mx-auto px-4 md:px-6 xl:px-0 box-border absolute z-50 flex justify-between items-center`}
    >
      {/* Logo */}
      <div>
        <Link href="/">
          <Image src={Logo} alt="Logo" className="sm:hidden w-auto h-10 object-left" priority />

          <Image
            src={LogoText}
            alt="Logo"
            className="hidden sm:block w-auto h-10 lg:h-12 object-left"
            priority
          />
        </Link>
      </div>

      {/* Nav */}
      <nav
        className={`${headerHeightClass} fixed top-0 left-1/2 -translate-x-1/2 flex items-center`}
      >
        <div className="bg-white/75 p-2 rounded-full shadow-[0_1px_6px_rgba(0,0,0,0.05)] backdrop-blur-[6px] flex items-center gap-2">
          {menus.map((menuGroup, groupIndex) => (
            <Fragment key={groupIndex}>
              {/* Group Divider */}
              {groupIndex !== 0 && <div className="w-px h-4 bg-(--border-secondary)" />}

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
                      className={`hover:bg-gradient-link px-5 py-3 rounded-full text-primary leading-none text-nowrap ${
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
        </div>
      </nav>

      {/* Right: Tools */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* <Link href="/rss">
          <RssIcon className="size-5 text-orange cursor-pointer" />
        </Link> */}
        <LinkedInLink />
        <GitHubLink />
      </div>
    </header>
  );
}
