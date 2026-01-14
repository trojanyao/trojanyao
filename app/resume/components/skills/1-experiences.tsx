import Image from 'next/image';

import { ErrorBoundary } from 'react-error-boundary';
import { GitHubCalendar } from 'react-github-calendar';

import GitHubHeatmap from '@/public/imgs/resume/github-heatmap.webp';

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
  return <Image src={GitHubHeatmap} alt="GitHub Heatmap" />;
}
