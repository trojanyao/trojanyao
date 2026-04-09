'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useLocale, useTranslations } from 'next-intl';
import { Fragment } from 'react/jsx-runtime';

import { Link } from '@/i18n/navigation';
import Logo from '@/public/logo.svg';

import GitHubLink from './GitHubLink';
import LinkedInLink from './LinkedInLink';

const headerHeightClass = 'h-20';

export default function Nav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('common');

  const isResumePage = pathname.includes('/resume');

  const menus = [
    [
      {
        name: t('project'),
        path: '/project',
      },
      {
        name: t('skill'),
        path: '/skill/dev',
      },
      {
        name: t('resume'),
        path: '/resume',
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
    <>
      <header
        className={`w-full max-w-[1200px] ${headerHeightClass} mx-auto px-4 md:px-6 xl:px-0 box-border absolute z-50 flex justify-between items-center`}
      >
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center gap-1">
            <Image src={Logo} alt="Logo" className="w-auto h-10 object-left" preload />

            <div className="hidden sm:block text-lg text-black font-[450]">{t('app')}</div>
          </Link>
        </div>

        {/* Right: Tools */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* <Link href="/rss">
          <RssIcon className="size-5 text-orange cursor-pointer" />
        </Link> */}
          {isResumePage ? <LinkedInLink /> : <GitHubLink />}
        </div>
      </header>

      {/* Nav */}
      <nav
        className={`${headerHeightClass} z-9999 fixed top-0 left-1/2 -translate-x-1/2 flex items-center`}
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
                        pathname.startsWith(`/${locale}${menu.path}`) &&
                        'font-medium bg-gradient-link'
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
    </>
  );
}
