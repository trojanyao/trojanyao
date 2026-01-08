'use client';

import { useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { Square2StackIcon } from '@heroicons/react/24/outline';

const email = 'ytj1996@gmail.com';

export default function CopyableEmail() {
  const [copied, setCopied] = useState(false);

  /* Event Handler: Copy Email */
  async function handleCopy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <a href={`mailto:${email}`} className="relative z-10 hover:underline cursor-pointer">
        {email}
      </a>

      <button
        onClick={handleCopy}
        className="cursor-pointer hover:opacity-70 transition-opacity"
        aria-label="复制邮箱地址"
      >
        <Square2StackIcon className="size-4 text-secondary" />
      </button>

      {copied && (
        <div className="flex items-center gap-1 text-emerald-500 text-mini">
          <CheckCircleIcon className="size-4" />
          <span>已复制</span>
        </div>
      )}
    </div>
  );
}
