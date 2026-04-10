'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';

interface ProjectHintLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  hint: {
    id: string;
    color: string;
    width: number;
    height: number;
  };
}

export default function ProjectHintLink({ href, className, children, hint }: ProjectHintLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        try {
          sessionStorage.setItem(`project_hint_${hint.id}`, JSON.stringify(hint));
        } catch {
          // Ignore storage failures (e.g. private mode / quota exceeded).
        }
      }}
    >
      {children}
    </Link>
  );
}
