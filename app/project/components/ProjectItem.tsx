import Image from 'next/image';
import Link from 'next/link';

import { ProjectValueType } from '@/lib/notion';

import ProductType from './ProductType';

export default function ProjectItem({ data }: { data: ProjectItem }) {
  return (
    <Link
      href={`/project/${data?.id}`}
      className="w-96 min-w-96 aspect-[4/3] bg-light-gray border-[1px] border-third rounded-[20px] overflow-hidden relative flex flex-col"
    >
      {/* Cover */}
      <div className="flex-1 overflow-hidden">
        <Image
          src={data?.cover}
          alt={data?.name}
          width={1472}
          height={1104}
          className="hover:scale-110 transition-all duration-300 ease-out"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Detail */}
      <div className="w-full bg-white/75 p-3 backdrop-blur-xl flex justify-between items-center gap-3 absolute bottom-0">
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Logo */}
          <Image src={data?.logo} alt={data?.name} width={40} height={40} />
          {/* Title + Text */}
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <div
              className="font-medium"
              style={{ color: data?.color ? `#${data?.color}` : 'rgb(var(--primary))' }}
            >
              {data?.name}
            </div>
            <div className="text-secondary text-xs leading-none overflow-hidden whitespace-nowrap text-ellipsis">
              {data?.slogan}
            </div>
          </div>
        </div>

        {/* Time + Type */}
        <div className="flex flex-col items-end gap-2">
          <div className="pr-[2px] text-right text-light text-[0.625rem]">
            {data?.dateStart != data?.dateEnd
              ? `${data?.dateStart} - ${data?.dateEnd}`
              : data?.dateStart}
          </div>
          <div className="flex items-center gap-1">
            {data?.type?.map((t: ProjectValueType, i) => (
              <ProductType key={i} type={t} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
