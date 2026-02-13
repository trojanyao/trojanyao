import { useState } from 'react';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useLocale, useTranslations } from 'next-intl';

import { btnTextClass, buttonClass } from '.';

export default function DownloadResume() {
  const locale = useLocale();
  const t = useTranslations('resume.action-bar');

  const [isBouncing, setIsBouncing] = useState(false);

  const handleDownloadClick = () => {
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
    }, 500);
  };

  return (
    <a
      href={
        locale === 'zh'
          ? '/files/姚陶钧-七年前端-三年远程-有设计审美-专注打造优秀产品.pdf'
          : '/files/Trojan_Yao_Frontend_Engineer_Resume.pdf'
      }
      download
      className={`${buttonClass} group`}
      onClick={handleDownloadClick}
    >
      <ArrowDownTrayIcon
        className={`size-5 sm:size-4
        [@media(hover:hover)]:group-hover:animate-[bounce_0.75s_linear_infinite]
        ${isBouncing ? 'animate-bounce' : ''}`}
      />
      <span className={btnTextClass}>{t('download')}</span>
    </a>
  );
}
