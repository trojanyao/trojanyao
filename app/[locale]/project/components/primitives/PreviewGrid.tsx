import Image from 'next/image';

import { checkIsLongScreen, checkIsPortrait } from '@/lib/utils/check-portrait';

export default function PreviewGrid({
  list,
  width,
  height,
  showBorder,
}: {
  list: string[];
  width: number;
  height: number;
  showBorder: boolean;
}) {
  const isPortrait = checkIsPortrait(width, height);
  const isLongScreen = checkIsLongScreen(width, height);

  const widthPortrait = 288 - (showBorder ? 2 : 0); // (1200-16*3)/4
  const heightPortrait = Math.floor((height / width) * widthPortrait);

  const widthLandscape = 1200;
  const heightLandscape = Math.floor((height / width) * widthLandscape);

  return (
    <div
      className={`grid ${isPortrait ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-4`}
    >
      {list.map((item) => (
        <Image
          key={item}
          src={item}
          alt="Preview"
          width={isPortrait ? 288 : 1200}
          height={isPortrait ? heightPortrait : heightLandscape}
          className={`w-full ${!isLongScreen && 'max-h-[800px]'} rounded-2xl ${showBorder ? 'border border-third' : ''}`}
          fetchPriority="low"
        />
      ))}
    </div>
  );
}
