import { useState } from 'react';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

import { btnTextClass, buttonClass } from '.';

export default function DownloadResume() {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleDownloadClick = () => {
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
    }, 500);
  };

  return (
    <a
      href="/files/姚陶钧-七年前端-三年远程-有设计审美-专注打造优秀产品.pdf"
      download
      className={buttonClass}
      onClick={handleDownloadClick}
    >
      <ArrowDownTrayIcon className={`size-5 sm:size-4 ${isBouncing ? 'animate-bounce' : ''}`} />
      <span className={btnTextClass}>下载简历</span>
    </a>
  );
}
