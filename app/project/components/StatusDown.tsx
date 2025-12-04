import { NoSymbolIcon } from '@heroicons/react/16/solid';

import { checkUrl } from '@/lib/utils/check-url';

export default async function StatusDown({ url }: { url: string }) {
  const isAvailable = await checkUrl(url);

  return (
    !isAvailable && (
      <div className="flex items-center gap-1 rounded-full cursor-pointer text-gray-300">
        <NoSymbolIcon className="size-4" />

        {/* Tooltip */}
        <span className="text-center text-xs whitespace-nowrap">甲方已自主下线</span>
      </div>
    )
  );
}
