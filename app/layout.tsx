import './globals.css';
import { Analytics } from '@vercel/analytics/next';

import Footer from './components/common/Footer';
import Header from './components/common/Header';
import ScrollToTop from './components/common/ScrollToTop';
import SmoothScroll from './smooth-scroll';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '极简一生 | TROJAN 的个人网站',
    template: '%s | 极简一生',
  },
  description: '全职远程 Freelancer，有设计审美的前端工程师，极简主义者',
  generator: 'Next.js',
  creator: 'Trojan Yao',
  authors: [{ name: 'trojanyao', url: 'https://minimalistrojan.com' }],
  keywords: [
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
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="max-w-[1200px] min-h-screen bg-white m-auto overflow-x-hidden flex flex-col items-center text-black font-normal leading-none">
        <SmoothScroll>
          <Header />
          <main className="w-full flex-1 mt-20 flex flex-col">{children}</main>
          <Footer />

          {/* 1280px(xl breakpoint) + 72px(40px width + 2 * 16px padding) = 1352px as the breakpoint to fix ScrollToTop */}
          <ScrollToTop className="fixed bottom-3 right-3 min-[1352px]:left-[calc(50vw+600px+16px)]" />
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  );
}
