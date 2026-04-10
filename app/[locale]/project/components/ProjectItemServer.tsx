import { getLocale, getTranslations } from 'next-intl/server';

import ProjectHintLink from './ProjectHintLink';
import ProjectItemCard from './ProjectItemCard';

export default async function ProjectItemServer({
  data,
  /** Only one cover per page/section should be the LCP candidate; parents must set this (not just map index). */
  isHeroCover = false,
}: {
  data: Project;
  isHeroCover?: boolean;
}) {
  const locale = await getLocale();
  const isEN = locale === 'en';
  const tType = await getTranslations('project.type');

  const cardClassName =
    'flex-1 aspect-4/3 bg-light-gray border border-third rounded-[20px] overflow-hidden relative flex flex-col';

  const content = (
    <ProjectItemCard
      data={data}
      isEN={isEN}
      isHeroCover={isHeroCover}
      platformLabel={(platform) => tType(platform)}
    />
  );

  // Keep the card body in RSC and pass that subtree to a thin client wrapper via `children`.
  // The wrapper only handles click-time hint persistence for the detail-page loading skeleton.
  return (
    <ProjectHintLink
      href={`/project/${data?.id}`}
      className={cardClassName}
      hint={{
        id: data?.id,
        color: data?.color ?? '',
        width: data?.width ?? 0,
        height: data?.height ?? 0,
      }}
    >
      {content}
    </ProjectHintLink>
  );
}
