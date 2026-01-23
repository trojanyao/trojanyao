import Image from 'next/image';

import CopyableText from '@/app/components/ui/copyable-text';
import WeChatLogo from '@/public/icons/wechat.webp';
import WeChatQRCode from '@/public/imgs/wechat-qrcode.webp';

import { btnTextClass, buttonClass } from '.';

export default function AddWeChat() {
  return (
    <div className="relative group">
      <button className={buttonClass}>
        <Image src={WeChatLogo} alt="WeChat" className="size-5 sm:size-4" />
        <span className={btnTextClass}>添加微信</span>
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
  );
}
