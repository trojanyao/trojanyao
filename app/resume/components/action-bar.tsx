'use client';

import { useState } from 'react';
import Image from 'next/image';

import { ArrowDownTrayIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

import WeChatLogo from '@/public/icons/wechat.webp';
import WeChatQRCode from '@/public/imgs/wechat-qrcode.webp';

import CopyableText from '../../components/ui/copyable-text';

const buttonClass =
  'bg-light-blue hover:bg-primary/10 px-3 py-2 rounded-full relative flex items-center gap-1 text-secondary text-small cursor-pointer';

export default function ActionBar() {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleDownloadClick = () => {
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
    }, 500);
  };

  return (
    <div className="bg-white/80 p-3 rounded-full shadow-blur z-50 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-2">
        {/* Send Email */}
        <div
          className={`${buttonClass} grid grid-cols-[auto_auto] transition-all duration-500 group`}
        >
          <EnvelopeIcon className="size-4 flex-shrink-0" />
          <span className="flex-shrink-0">发送邮件</span>
          <div
            className={`
              ml-1 overflow-hidden
              transition-[max-width,opacity,margin] duration-500
              max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100
            `}
            style={{ gridColumn: 3 }}
          >
            <CopyableText text="ytj1996@gmail.com" />
          </div>
        </div>

        {/* Add WeChat */}
        <div className="relative group">
          <button className={buttonClass}>
            <Image src={WeChatLogo} alt="WeChat" className="size-4" />
            <span>添加微信</span>
          </button>

          {/* QR Code */}
          <div
            className={`
							pb-2 absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-full
							opacity-0 scale-95 pointer-events-none
              group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
              transition-all duration-300 ease-out
						`}
          >
            <div
              className={`
              bg-white px-3 py-4 rounded-xl shadow-sm
              flex flex-col items-center gap-2
              text-secondary
            `}
              style={{ zIndex: 20 }}
            >
              <Image
                src={WeChatQRCode}
                alt="WeChat QR Code"
                width={112}
                height={112}
                className="size-28 min-w-28 min-h-28"
              />
              <CopyableText text="trojanyao" ariaLabel="复制微信号" />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Download Resume */}
      <a
        href="/files/resume.pdf"
        download="姚陶钧-七年前端-三年远程-有设计审美-专注打造优秀产品.pdf"
        className={buttonClass}
        onClick={handleDownloadClick}
      >
        <ArrowDownTrayIcon className={`size-4 ${isBouncing ? 'animate-bounce' : ''}`} />
        <span>下载简历</span>
      </a>
    </div>
  );
}
