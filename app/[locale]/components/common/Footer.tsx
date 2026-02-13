'use client';

import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from './locale-switcher';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer
      className="w-full mx-auto py-6 px-4 xl:px-0 border-t border-secondary
    flex flex-col sm:flex-row justify-between items-center gap-6
    text-sm leading-none"
    >
      <div className="flex-1">
        <LocaleSwitcher />
      </div>

      {/* Center */}
      <div className="flex-1 text-center text-light whitespace-nowrap">
        {/* eslint-disable-next-line no-irregular-whitespace */}
        © 2024–{new Date().getFullYear()} {t('app')} All Rights Reserved.
      </div>

      {/* Right */}
      {/* <div>
        你是第<span className="mx-1 text-primary font-medium">12</span>位访客
        </div> */}
      <div className="flex-1"></div>
    </footer>
  );
}
