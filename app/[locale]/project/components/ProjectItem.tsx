import Image from 'next/image';
import Link from 'next/link';

import ProductType from './primitives/ProductType';

export default function ProjectItem({ data }: { data: Project }) {
  return (
    <Link
      href={`/project/${data?.id}`}
      className="flex-1 aspect-4/3 bg-light-gray border border-third rounded-[20px] overflow-hidden relative flex flex-col"
    >
      {/* Cover */}
      <div className="flex-1 overflow-hidden">
        <Image
          src={data?.cover}
          alt={data?.name}
          width={1472}
          height={1104}
          className="[@media(hover:hover)]:hover:scale-110 transition-all duration-300 ease-out"
          loading="eager"
          fetchPriority="high"
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
              {data?.name}
            </div>

            <div className="flex items-center gap-1">
              {data?.platform?.map((t: ProjectPlatformVisible, i) => (
                <ProductType key={i} platform={t} />
              ))}
            </div>
          </div>

          {/* Desc + Time */}
          <div className="flex justify-between items-center gap-2">
            <div className="text-secondary text-xs leading-none overflow-hidden whitespace-nowrap text-ellipsis">
              {data?.desc}
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
    </Link>
  );
}
