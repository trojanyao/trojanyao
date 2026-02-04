import { useState, useRef, useEffect } from 'react';

import { EnvelopeIcon } from '@heroicons/react/24/outline';

import CopyableText from '@/app/components/ui/copyable-text';

import { btnTextClass, buttonClass } from '.';

const mailAddress = 'ytj1996@gmail.com';

export default function SendMail() {
  const [expanded, setExpanded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Event Handler: Click Button */
  const handleClick = () => {
    if (window.matchMedia('(hover: none)').matches) {
      setExpanded(!expanded);
    }
  };

  /* Effect: Click outside to collapse */
  useEffect(() => {
    if (!expanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!wrapperRef.current?.contains(target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expanded]);

  return (
    <div
      ref={wrapperRef}
      className={`${buttonClass} gap-0!
      w-fit z-10
      ${expanded ? 'bg-primary/20' : ''}
      grid grid-cols-[auto_auto] transition-all duration-500 group`}
    >
      <button className="flex items-center gap-1" onClick={handleClick}>
        <EnvelopeIcon className="size-5 sm:size-4 shrink-0" />
        <span className={`${btnTextClass} shrink-0`}>发送邮件</span>
      </button>

      {/* Detail */}
      <div
        className={`
              overflow-hidden
              transition-[max-width,opacity,margin] duration-500

              ${expanded ? 'max-w-[200px] opacity-100 ml-1' : 'max-w-0 opacity-50'}

              [@media(hover:hover)]:group-hover:ml-1
              [@media(hover:hover)]:group-hover:max-w-[200px]
              [@media(hover:hover)]:group-hover:opacity-100
            `}
        style={{ gridColumn: 3 }}
      >
        <CopyableText text={mailAddress} />
      </div>
    </div>
  );
}
