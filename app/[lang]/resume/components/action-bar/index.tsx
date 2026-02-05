'use client';

import AddWeChat from './add-wechat';
import DownloadResume from './download-resume';
import SendMail from './send-mail';

export const buttonClass = `bg-middle-blue
[@media(hover:hover)]:hover:bg-primary/20
active:bg-primary/20
px-3 sm:px-3 py-2
rounded-full relative
flex items-center sm:gap-1
text-secondary text-small cursor-pointer whitespace-nowrap
`;
export const btnTextClass = 'hidden sm:inline';

export default function ActionBar() {
  return (
    <div
      className="bg-white/50 p-2 sm:p-3 rounded-full shadow-blur z-50
    flex justify-between items-center"
    >
      {/* Left */}
      <div className="flex flex-row-reverse sm:flex-row items-center gap-1 sm:gap-2">
        {/* Add WeChat */}
        <AddWeChat />

        {/* Send Email */}
        <SendMail />
      </div>

      {/* Right: Download Resume */}
      <DownloadResume />
    </div>
  );
}
