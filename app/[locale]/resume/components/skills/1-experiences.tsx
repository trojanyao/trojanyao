'use client';

import { useEffect, useState } from 'react';

type GitHubCalendarComponent = typeof import('react-github-calendar').GitHubCalendar;

type IdleDeadline = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: (deadline: IdleDeadline) => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function Experiences() {
  const [Calendar, setCalendar] = useState<GitHubCalendarComponent | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  /*
   * Lazy-load the calendar bundle after mount and schedule it as low-priority work.
   * This keeps initial rendering responsive and provides static fallback on load failure.
   */
  useEffect(() => {
    // Skip scheduling when module has already resolved to success or failure.
    if (Calendar || loadFailed) return;

    // Cancellation flag avoids state updates after unmount or effect re-run.
    let cancelled = false;
    const win = window as WindowWithIdleCallback;
    // Handle for requestIdleCallback scheduling when supported.
    let idleHandle: number | null = null;
    // Handle for fallback timeout when requestIdleCallback is unavailable.
    let timeoutHandle: number | null = null;
    // Handle for outer defer timeout before any loading attempt starts.
    let deferHandle: number | null = null;

    // Lazy import keeps the heavy calendar bundle out of the initial critical path.
    const loadCalendar = () => {
      void import('react-github-calendar')
        .then((mod) => {
          if (cancelled) return;
          setCalendar(() => mod.GitHubCalendar);
        })
        .catch(() => {
          if (cancelled) return;
          setLoadFailed(true);
        });
    };

    // Add a short defer to reduce contention with first-screen rendering work.
    deferHandle = window.setTimeout(() => {
      if (typeof win.requestIdleCallback === 'function') {
        // Prefer browser idle time; timeout guarantees eventual load on busy threads.
        idleHandle = win.requestIdleCallback(loadCalendar, { timeout: 2400 });
      } else {
        // Fallback for browsers without requestIdleCallback support.
        timeoutHandle = window.setTimeout(loadCalendar, 200);
      }
    }, 1500);

    return () => {
      cancelled = true;
      // Clear every possible scheduled task to prevent leaked callbacks.
      if (deferHandle !== null) {
        window.clearTimeout(deferHandle);
      }
      if (idleHandle !== null && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [Calendar, loadFailed]);

  return (
    <div>
      {Calendar ? (
        <Calendar
          username="trojanyao"
          blockSize={8}
          blockMargin={2}
          fontSize={12}
          maxLevel={10}
          throwOnError
        />
      ) : loadFailed ? (
        <StaticGitHubHeatmap />
      ) : (
        <HeatmapSkeleton />
      )}
    </div>
  );
}

function StaticGitHubHeatmap() {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet="/imgs/resume/github-heatmap-528.avif 528w"
        sizes="(max-width: 576px) calc(100vw - 48px), 528px"
      />
      <source
        type="image/webp"
        srcSet="/imgs/resume/github-heatmap-528.webp 528w"
        sizes="(max-width: 576px) calc(100vw - 48px), 528px"
      />
      {/* Keep native responsive sources to match the page's unoptimized image strategy. */}
      <img
        src="/imgs/resume/github-heatmap-528.webp"
        srcSet="/imgs/resume/github-heatmap-528.webp 528w"
        sizes="(max-width: 576px) calc(100vw - 48px), 528px"
        alt="GitHub Heatmap"
        width={528}
        height={84}
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

function HeatmapSkeleton() {
  return (
    <div
      className="w-full h-[84px] rounded-md bg-linear-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse"
      aria-hidden
    />
  );
}
