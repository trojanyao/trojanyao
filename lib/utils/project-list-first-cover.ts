import { groupBy } from '@/lib/utils/group-by';

/**
 * Matches ProjectGroup default "by time" grouping + ProjectGrid's dateEnd-desc sort.
 * Used for first-cover <link rel="preload"> on /project so discovery is not blocked by client trees.
 */
export function getProjectListFirstGridCoverHref(projects: Project[]): string | null {
  if (!projects.length) return null;

  const grouped = groupBy<Project>(
    projects,
    (item: Project) => item?.dateStart?.split('-')?.[0] ?? '',
    (a, b) => new Date(b.items[0].dateStart).getTime() - new Date(a.items[0].dateStart).getTime(),
  );

  const firstGroupItems = grouped[0]?.items;
  if (!firstGroupItems?.length) return null;

  const sorted = [...firstGroupItems].sort(
    (a, b) => new Date(b.dateEnd).getTime() - new Date(a.dateEnd).getTime(),
  );

  const first = sorted[0];
  const href = first.coverAvif ?? first.cover;
  return href || null;
}
