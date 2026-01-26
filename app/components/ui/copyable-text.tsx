'use client';

import { useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { Square2StackIcon } from '@heroicons/react/24/outline';

function isEmail(text: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
}

export default function CopyableText({ text, ariaLabel }: { text: string; ariaLabel?: string }) {
  const [copied, setCopied] = useState(false);

  /* Event Handler: Copy Text */
  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isEmailAddress = isEmail(text);

  return (
    <div className="flex items-center gap-1 text-small">
      {isEmailAddress ? (
        <a href={`mailto:${text}`} className="relative z-10 hover:underline cursor-pointer">
          {text}
        </a>
      ) : (
        <span className="relative z-10">{text}</span>
      )}

      {!copied ? (
        <button
          onClick={handleCopy}
          className="cursor-pointer hover:opacity-70 transition-opacity"
          aria-label={isEmailAddress ? '复制邮箱地址' : ariaLabel || '复制文本'}
        >
          <Square2StackIcon className="size-4 text-secondary" />
        </button>
      ) : (
        <div className="flex items-center gap-1 text-emerald-500 text-mini">
          <CheckCircleIcon className="size-4" />
          {/* <span className="whitespace-nowrap">已复制</span> */}
        </div>
      )}
    </div>
  );
}
