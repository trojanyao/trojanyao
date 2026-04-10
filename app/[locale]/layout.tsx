import '../globals.css';
import { notFound } from 'next/navigation';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { inter } from '@/lib/fonts';

import DeferredAnalytics from './components/common/DeferredAnalytics';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import LazyScrollToTop from './components/common/LazyScrollToTop';
import SmoothScroll from './smooth-scroll';

import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const keywordsZH = [
  // 技术
  '前端',
  '全栈',
  'Next.js',
  'React Native',
  'Expo',
  '小程序',
  // 商务
  '外包',
  '前端外包',
  '全栈外包',
  'React Native 外包',
  'Expo 外包',
  '小程序外包',
  // 角色
  'Freelancer',
  '自由职业',
  '灵活外包',
  '独立开发',
  '个人外包',
  '独立外包',
  '设计审美',
  '前端工程师',
];

const keywordsEN = [
  // 技术
  'Frontend',
  'Full-stack',
  'Next.js',
  'React Native',
  'Expo',
  'Mini Program',
  // 商务
  'Outsourcing',
  'Frontend Outsourcing',
  'Full-stack Outsourcing',
  'React Native Outsourcing',
  'Expo Outsourcing',
  'Mini Program Outsourcing',
  // 角色
  'Freelancer',
  'Flexible Outsourcing',
  'Independent Developer',
  'Personal Outsourcing',
  'Design Aesthetic',
  'Frontend Engineer',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // 使用显式 locale，避免触发 getRequestConfig 的 requestLocale（否则会强制 dynamic）
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('app')}`,
    },
    description: t('desc'),
    generator: 'Next.js',
    creator: 'Trojan Yao',
    authors: [{ name: 'trojanyao', url: 'https://minimalistrojan.com' }],
    keywords: locale === 'zh' ? keywordsZH : keywordsEN,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} ${inter.variable} max-w-[1200px] min-h-screen bg-white m-auto overflow-x-hidden flex flex-col items-center text-black font-normal leading-none`}
      >
        <NextIntlClientProvider locale={locale}>
          <SmoothScroll>
            <Header />
            <main className="w-full flex-1 mt-20 flex flex-col">{children}</main>
            <Footer />

            {/* 1280px(xl breakpoint) + 72px(40px width + 2 * 16px padding) = 1352px as the breakpoint to fix ScrollToTop */}
            <LazyScrollToTop className="fixed bottom-3 right-3 min-[1352px]:left-[calc(50vw+600px+16px)]" />
            {process.env.NODE_ENV === 'production' && process.env.VERCEL === '1' ? (
              <DeferredAnalytics />
            ) : null}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
