import { NoSymbolIcon } from '@heroicons/react/16/solid';

export default async function StatusDown() {
  return (
    <div className="flex items-center gap-1 rounded-full text-gray-300">
      <NoSymbolIcon className="size-4" />

      {/* Tooltip */}
      <span className="text-center text-xs whitespace-nowrap">甲方已自主下线</span>
    </div>
  );
}
