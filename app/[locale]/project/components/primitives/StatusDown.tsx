import { NoSymbolIcon } from '@heroicons/react/16/solid';
import { getTranslations } from 'next-intl/server';

import { checkUrlAvailable, checkUrlValid } from '@/lib/utils/check-url';

export default async function StatusDown({ preview, status }: { preview: string; status: string }) {
  const t = await getTranslations('project');

  const manualDown = status?.includes('下线');
  const previewUrlNotAvailable = checkUrlValid(preview) && !checkUrlAvailable(preview);

  const totallyDown = manualDown || previewUrlNotAvailable;

  return (
    totallyDown && (
      <div className="flex items-center gap-1 rounded-full text-gray-300">
        <NoSymbolIcon className="size-4" />

        {/* Tooltip */}
        <span className="text-center text-xs whitespace-nowrap">{t('offline')}</span>
      </div>
    )
  );
}
