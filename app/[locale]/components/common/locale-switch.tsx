'use client';

import { usePathname, useRouter } from 'next/navigation';

import { US, CN } from 'country-flag-icons/react/3x2';
import { useLocale } from 'next-intl';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const router = useRouter();

  const locales = [
    {
      locale: 'zh',
      label: '中文',
      flag: <CN title="ENG" className="w-5!" />,
    },
    {
      locale: 'en',
      label: 'ENG',
      flag: <US title="中文" className="w-5!" />,
    },
  ];

  function handleValueChange(value: string) {
    const newPath = pathname.replace(`/${locale}`, `/${value}`);
    router.replace(newPath);
  }

  return (
    <div className="shadcn-root">
      <Tabs defaultValue={locale} value={locale} onValueChange={handleValueChange}>
        <TabsList>
          {locales.map(({ locale, label, flag }) => (
            <TabsTrigger key={locale} value={locale} className="flex items-center gap-1">
              <div className="w-5 h-4 rounded-sm overflow-hidden">{flag}</div>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
