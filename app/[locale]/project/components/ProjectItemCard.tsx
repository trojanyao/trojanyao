import { type ReactNode } from 'react';
import Image from 'next/image';

import getProjectPlatformColorClass from './primitives/getProjectPlatformColorClass';

// Shared presentational card for both server and client wrappers.
// Keep this component free of routing, storage, and i18n hooks so both environments can reuse it.
export default function ProjectItemCard({
  data,
  isEN,
  isHeroCover,
  platformLabel,
}: {
  data: Project;
  isEN: boolean;
  isHeroCover: boolean;
  platformLabel: (platform: ProjectPlatformVisible) => ReactNode;
}) {
  return (
    <>
      {/* Cover: prefer AVIF when coverAvif exists (image-proxy when unoptimized). */}
      <div className="flex-1 overflow-hidden">
        <Image
          src={data?.coverAvif ?? data?.cover}
          alt={data?.name}
          width={1472}
          height={1104}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="[@media(hover:hover)]:hover:scale-110 transition-all duration-300 ease-out"
          {...(isHeroCover
            ? /* preload: early discovery (LCP breakdown). fetchPriority is forwarded to ReactDOM.preload() / <link rel="preload"> by Next (see next/dist/client/image-component.js ImagePreload). Do not set loading here (avoid preload+loading per docs). */
              { preload: true as const, fetchPriority: 'high' as const, loading: 'eager' as const }
            : { loading: 'lazy' as const, fetchPriority: 'low' as const })}
        />
      </div>

      {/* Detail */}
      <div className="w-full bg-white/75 p-3 backdrop-blur-xl flex justify-between items-center gap-3 absolute bottom-0">
        {/* Left: Logo */}
        <Image src={data?.logo} alt={data?.name} width={40} height={40} />

        {/* Right */}
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          {/* Title + Type */}
          <div className="flex justify-between items-center overflow-hidden">
            <div
              className="font-medium whitespace-nowrap text-ellipsis overflow-hidden"
              style={{ color: data?.color ? `#${data?.color}` : 'rgb(var(--primary))' }}
            >
              {isEN ? data?.nameEN || data?.name : data?.name}
            </div>

            <div className="flex items-center gap-1">
              {data?.platform?.map((platform: ProjectPlatformVisible, i) => (
                <div
                  key={i}
                  className={`px-2 py-1 ${getProjectPlatformColorClass(platform)} rounded-full text-center text-[0.625rem] whitespace-nowrap`}
                >
                  {platformLabel(platform)}
                </div>
              ))}
            </div>
          </div>

          {/* Desc + Time */}
          <div className="flex justify-between items-center gap-2">
            <div className="text-secondary text-xs leading-none overflow-hidden whitespace-nowrap text-ellipsis">
              {isEN ? data?.descEN || data?.desc : data?.desc}
            </div>

            <div className="pr-[2px] text-right text-light text-[0.625rem] whitespace-nowrap">
              {data?.dateStart !== data?.dateEnd
                ? `${data?.dateStart?.replaceAll('-', '.')} - ${data?.dateEnd?.replaceAll(
                    '-',
                    '.',
                  )}`
                : data?.dateStart?.replaceAll('-', '.')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
