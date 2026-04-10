
import { ErrorBoundary } from 'react-error-boundary';
import { GitHubCalendar } from 'react-github-calendar';


export default function Experiences() {
  return (
    <ErrorBoundary fallback={<StaticGitHubHeatmap />}>
      <GitHubCalendar
        username="trojanyao"
        blockSize={8}
        blockMargin={2}
        fontSize={12}
        maxLevel={10}
        throwOnError
      />
    </ErrorBoundary>
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
