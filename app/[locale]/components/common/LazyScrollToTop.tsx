'use client';

import type { ComponentProps } from 'react';
import dynamic from 'next/dynamic';

const ScrollToTop = dynamic(() => import('./ScrollToTop'), { ssr: false });

export default function LazyScrollToTop(props: ComponentProps<'button'>) {
  return <ScrollToTop {...props} />;
}
