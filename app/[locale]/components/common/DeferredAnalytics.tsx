'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((mod) => ({ default: mod.Analytics })),
  { ssr: false }
);

/** 在 requestIdleCallback 后再挂载 Analytics，减轻首屏主线程 Script Evaluation */
export default function DeferredAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mount = () => setMounted(true);

    // Safari lacks requestIdleCallback; fall back to setTimeout.
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(mount, { timeout: 4000 });
      return () => cancelIdleCallback(id);
    }
    const timer = setTimeout(mount, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;
  return <Analytics />;
}
