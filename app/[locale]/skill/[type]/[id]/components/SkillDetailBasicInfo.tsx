'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';
import { useLocale } from 'next-intl';

import SkillStatusView from '@/app/[locale]/skill/components/SkillStatusView';

/**
 * Detail route only: hero block. `statusLabel` is pre-resolved in the RSC parent (`getTranslations`)
 * so this client component can render `SkillStatusView` without `useTranslations` for the status line.
 */
export default function SkillDetailBasicInfo({
  skill,
  statusLabel,
}: {
  skill: Skill;
  statusLabel: string;
}) {
  const locale = useLocale();

  return (
    <div className="flex justify-between items-center">
      <div className="w-full lg:w-2/3 flex gap-6">
        <Image
          src={skill?.logo}
          alt={skill?.name}
          width={96}
          height={96}
          className="size-24"
          priority
          fetchPriority="high"
        />

        <div className="py-1 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-3">
            <h1 className="title-large">
              {locale === 'en' ? skill?.nameEN || skill?.name : skill?.name}
            </h1>

            {skill?.site && (
              <Link href={skill?.site} target="_blank" className="p-1 group" aria-label="Open skill website">
                <ArrowTopRightOnSquareIcon className="size-4 text-light group-hover:text-primary" />
              </Link>
            )}
          </div>

          {skill?.description && locale === 'zh' && (
            <div className="text-small text-light text-pretty leading-normal">{skill?.description}</div>
          )}

          <SkillStatusView status={skill?.status} label={statusLabel} />
        </div>
      </div>
    </div>
  );
}
