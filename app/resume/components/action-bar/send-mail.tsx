import { EnvelopeIcon } from '@heroicons/react/24/outline';

import CopyableText from '../../../components/ui/copyable-text';

import { btnTextClass, buttonClass } from '.';

const mailAddress = 'ytj1996@gmail.com';

export default function SendMail() {
  return (
    <div className={`${buttonClass} grid grid-cols-[auto_auto] transition-all duration-500 group`}>
      <EnvelopeIcon className="size-5 sm:size-4 flex-shrink-0" />
      <span className={`${btnTextClass} flex-shrink-0`}>发送邮件</span>
      <div
        className={`
              sm:ml-1 overflow-hidden
              transition-[max-width,opacity,margin] duration-500
              max-w-0 opacity-0 [@media(hover:hover)]:group-hover:max-w-[200px] [@media(hover:hover)]:group-hover:opacity-100
            `}
        style={{ gridColumn: 3 }}
      >
        <CopyableText text={mailAddress} />
      </div>
    </div>
  );
}
