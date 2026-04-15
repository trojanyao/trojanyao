'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import ProjectHintLink from './ProjectHintLink';
import ProjectItemCard from './ProjectItemCard';

export default function ProjectItemClient({
  data,
  /** Only one cover per page/section should be the LCP candidate; parents must set this (not just map index). */
  isHeroCover = false,
}: {
  data: Project;
  isHeroCover?: boolean;
}) {
  const locale = useLocale();
  const tType = useTranslations('project.type');
  const isEN = locale === 'en';
  const cardClassName =
    'flex-1 aspect-4/3 bg-light-gray border border-third rounded-[20px] overflow-hidden relative flex flex-col';

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
      <ProjectItemCard
        data={data}
        isEN={isEN}
        isHeroCover={isHeroCover}
        platformLabel={(platform) => tType(platform)}
      />
    </ProjectHintLink>
  );
}
