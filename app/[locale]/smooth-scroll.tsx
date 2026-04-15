'use client';

import { useEffect, useState } from 'react';

const LENIS_OPTIONS = {
  duration: 0.75,
  easing: (t: number) => 1 - Math.pow(1 - t, 3),
};

/** Load Lenis after idle to reduce main-thread work on first paint. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [LenisWrapper, setLenisWrapper] = useState<React.ComponentType<{ children: React.ReactNode }> | null>(null);

  /*
   * Defer Lenis until idle; handle chunk import failures so we never leave a rejected promise
   * dangling and optionally retry once for transient network/cache issues.
   */
  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const loadLenis = (attempt = 0) => {
      import('lenis/react')
        .then(({ ReactLenis }) => {
          if (cancelled) return;
          const Wrapper = (props: { children: React.ReactNode }) => (
            <ReactLenis root options={LENIS_OPTIONS}>
              {props.children}
            </ReactLenis>
          );
          Wrapper.displayName = 'LenisWrapper';
          setLenisWrapper(() => Wrapper);
        })
        .catch((error: unknown) => {
          if (cancelled) return;
          // One delayed retry: dynamic chunk loads can fail transiently.
          if (attempt < 1) {
            retryTimer = setTimeout(() => loadLenis(attempt + 1), 1000);
            return;
          }
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console -- dev-only diagnostic for failed dynamic import
            console.warn(
              '[SmoothScroll] Lenis failed to load after retry; using native scroll.',
              error
            );
          }
        });
    };

    // Safari lacks requestIdleCallback; fall back to setTimeout.
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(() => loadLenis(), { timeout: 2500 });
      return () => {
        cancelled = true;
        if (retryTimer) clearTimeout(retryTimer);
        cancelIdleCallback(id);
      };
    }
    const timer = setTimeout(loadLenis, 100);
    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      clearTimeout(timer);
    };
  }, []);

  if (!LenisWrapper) return <>{children}</>;
  return <LenisWrapper>{children}</LenisWrapper>;
}
