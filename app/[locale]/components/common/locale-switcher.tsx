'use client';

import { usePathname, useRouter } from 'next/navigation';

import { US, CN } from 'country-flag-icons/react/3x2';
import { useLocale } from 'next-intl';

import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const router = useRouter();

  const locales = [
    {
      locale: 'zh',
      label: '中文',
      flag: <CN title="中文" className="w-5!" />,
    },
    {
      locale: 'en',
      label: 'ENG',
      flag: <US title="ENG" className="w-5!" />,
    },
  ];

  function handleValueChange(value: string) {
    const newPath = pathname.replace(`/${locale}`, `/${value}`);
    router.replace(newPath);
  }

  return (
    <div className="shadcn-root">
      <Tabs defaultValue={locale} value={locale} onValueChange={handleValueChange}>
        <TabsList aria-label={locale === 'zh' ? '选择语言' : 'Switch language'}>
          {locales.map(({ locale: tabLocale, label, flag }) => (
            <TabsTrigger
              key={tabLocale}
              value={tabLocale}
              className="flex items-center gap-1 cursor-pointer"
              aria-label={
                label === '中文'
                  ? locale === 'zh'
                    ? '切换到中文'
                    : 'Switch to Chinese'
                  : locale === 'zh'
                    ? '切换到英文'
                    : 'Switch to English'
              }
            >
              <div className="w-5 h-4 rounded-sm overflow-hidden">{flag}</div>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Placeholder panels so each trigger's aria-controls id exists in the DOM (a11y). */}
        <TabsContent value="zh" className="sr-only" />
        <TabsContent value="en" className="sr-only" />
      </Tabs>
    </div>
  );
}
