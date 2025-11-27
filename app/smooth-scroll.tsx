'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1,
        easing: (t) => 1 - Math.pow(1 - t, 3), // 自定义缓动，丝滑
      }}
    >
      {children}
    </ReactLenis>
  );
}
