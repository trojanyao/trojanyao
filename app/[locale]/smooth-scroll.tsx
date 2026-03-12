'use client';

import { useEffect, useState } from 'react';

const LENIS_OPTIONS = {
  duration: 0.75,
  easing: (t: number) => 1 - Math.pow(1 - t, 3),
};

/** 延迟到 idle 再加载 Lenis，减轻首屏主线程压力（Script Evaluation / Other） */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [LenisWrapper, setLenisWrapper] = useState<React.ComponentType<{ children: React.ReactNode }> | null>(null);

  useEffect(() => {
    const id = requestIdleCallback(
      () => {
        import('lenis/react').then(({ ReactLenis }) => {
          const Wrapper = (props: { children: React.ReactNode }) => (
            <ReactLenis root options={LENIS_OPTIONS}>
              {props.children}
            </ReactLenis>
          );
          Wrapper.displayName = 'LenisWrapper';
          setLenisWrapper(() => Wrapper);
        });
      },
      { timeout: 2500 }
    );
    return () => cancelIdleCallback(id);
  }, []);

  if (!LenisWrapper) return <>{children}</>;
  return <LenisWrapper>{children}</LenisWrapper>;
}
