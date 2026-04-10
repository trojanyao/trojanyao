'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((mod) => ({ default: mod.Analytics })),
  { ssr: false }
);
const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => ({ default: mod.SpeedInsights })),
  { ssr: false }
);

/**
 * Mount Vercel telemetry scripts after idle time to reduce
 * main-thread script evaluation during initial paint.
 */
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
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
