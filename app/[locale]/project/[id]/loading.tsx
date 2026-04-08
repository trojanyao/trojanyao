'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import {
  CodeBracketIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import Breadcrumb from '@/app/[locale]/components/ui/Breadcrumb';
import Line from '@/app/[locale]/components/ui/Line';
import SkillGridSkeleton from '@/app/[locale]/skill/components/SkillGridSkeleton';

interface ProjectLoadingHint {
  color: string | null;
  isPortrait: boolean;
}

const defaultHint: ProjectLoadingHint = { color: null, isPortrait: false };

function readHint(pathname: string): ProjectLoadingHint {
  if (typeof window === 'undefined') return defaultHint;

  try {
    const id = pathname.split('/').pop();
    if (!id) return defaultHint;

    const raw = sessionStorage.getItem(`project_hint_${id}`);
    if (!raw) return defaultHint;

    const { color, width, height } = JSON.parse(raw);
    const w = Number(width);
    const h = Number(height);
    const isPortrait = w > 0 && h > 0 && h > w && h < w * 3;
    const validColor = /^[0-9A-Fa-f]{6}$/.test(color) ? `#${color}` : null;
    return { color: validColor, isPortrait };
  } catch {
    return defaultHint;
  }
}

export default function ProjectDetailLoading() {
  const devT = useTranslations('dev');
  const projectT = useTranslations('project');
  const pathname = usePathname();

  const hint = useMemo(() => readHint(pathname), [pathname]);

  const menus = [
    { text: devT('common') },
    { text: devT('dev-project'), url: '/project' },
    { text: '...' },
  ];

  return (
    <div className="content-wrap">
      <Breadcrumb menus={menus} />

      <div className="flex flex-col gap-10 animate-pulse">
        <ProjectBasicSkeleton />

        <div className="flex flex-col gap-6 lg:flex-row">
          <ResponsibilitiesSkeleton />
          <div className="w-full h-px border-b lg:w-px lg:h-auto lg:border-r border-dashed border-secondary" />
          <ResponsibilitiesSkeleton />
        </div>

        <div>
          <SectionHeader
            title={projectT('tech-stack')}
            icon={<CodeBracketIcon />}
            color={hint.color ?? 'var(--color-primary)'}
          />
          <Line type="secondary" />
          <div className="mt-6">
            <SkillGridSkeleton length={6} />
          </div>
        </div>

        <div>
          <SectionHeader
            title={projectT('screenshots')}
            icon={hint.isPortrait ? <DevicePhoneMobileIcon /> : <ComputerDesktopIcon />}
            color={hint.color ?? 'var(--color-primary)'}
          />
          <Line type="secondary" />
          <div
            className={`mt-6 grid ${hint.isPortrait ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-4`}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`${hint.isPortrait ? 'aspect-3/4' : 'aspect-4/3'} rounded-2xl bg-middle-gray`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectBasicSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-10">
      <div className="md:flex-1 pb-0 flex flex-col gap-6 md:py-2 md:gap-12">
        <div className="flex items-center gap-3">
          <div className="size-16 rounded-md bg-middle-gray" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-28 rounded-sm bg-middle-gray" />
              <div className="h-5 w-12 rounded-full bg-middle-gray" />
            </div>

            <div className="h-4 w-64 rounded-sm bg-middle-gray" />
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:gap-8">
          <div className="h-8 w-56 rounded-lg bg-middle-gray" />
          <div className="h-4 w-24 rounded-sm bg-middle-gray" />
        </div>
      </div>

      <div className="w-full md:flex-1 aspect-4/3 self-start rounded-2xl border border-secondary overflow-hidden bg-middle-gray" />
    </div>
  );
}

function ResponsibilitiesSkeleton() {
  return (
    <div className="flex-1 flex items-center gap-6">
      <div className="min-w-26 lg:w-fit flex flex-col items-center gap-3">
        <div className="size-6 rounded-full bg-middle-gray" />
        <div className="h-4 w-20 rounded-sm bg-middle-gray" />
      </div>

      <div className="w-full flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-middle-gray" />
            <div className="h-4 w-full max-w-[380px] rounded-sm bg-middle-gray" />
          </div>
        ))}
      </div>
    </div>
  );
}
