import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import CopyableText from '@/app/components/ui/copyable-text';
import WeChatLogo from '@/public/icons/wechat.webp';
import WeChatQRCode from '@/public/imgs/wechat-qrcode.webp';

import { btnTextClass, buttonClass } from '.';

export default function AddWeChat() {
  const [modalVisible, setModalVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Event Handler: Click Button */
  const handleClick = () => {
    if (window.matchMedia('(hover: none)').matches) {
      setModalVisible(!modalVisible);
    }
  };

  /* Effect: Click outside to close modal */
  useEffect(() => {
    if (!modalVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!wrapperRef.current?.contains(target)) {
        setModalVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modalVisible]);

  return (
    <div ref={wrapperRef} className="relative z-50 group">
      <button
        className={`${buttonClass} ${modalVisible ? 'bg-primary/20' : ''}`}
        onClick={handleClick}
      >
        <Image src={WeChatLogo} alt="WeChat" className="size-5 min-w-5 sm:size-4" />
        <span className={btnTextClass}>添加微信</span>
      </button>

      {/* QR Code */}
      <div
        className={`
			pb-2 absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-full
			transition-all duration-300 ease-out
    
      ${
        modalVisible
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-95 pointer-events-none'
      }
      
      [@media(hover:hover)]:group-hover:opacity-100
      [@media(hover:hover)]:group-hover:scale-100
      [@media(hover:hover)]:group-hover:pointer-events-auto
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
  );
}
