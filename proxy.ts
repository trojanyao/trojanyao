import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { locales, defaultLocale } from './app/i18n/dictionaries';

/**
 * 根据请求的 Accept-Language 标头来判断系统 locale
 * 因为修改浏览器的首选语言会相应修改 Accept-Language
 * @param request {传入的请求}
 * @return 最终应该显示的 locale（如：zh、en、en-US）
 */
function getLocale(request: NextRequest) {
  // 从 request.headers 提取 accept-language 构造单纯的 headers
  const headers: Negotiator.Headers = {
    'accept-language': request.headers.get('accept-language')!,
  };

  // 从 headers 的 accept-language 中提取 locale
  const languages = new Negotiator({ headers }).languages();

  // 根据以下三项匹配最终的 locale
  // - languages（浏览器 locale）
  // - locales（支持的 locale 列表）
  // - defaultLocale（不支持浏览器 locale 时的默认 locale）
  const locale = match(languages, locales, defaultLocale);

  return locale;
}

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  // 检查 pathname 中是否有 locales 列表中支持的 locale
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  /* a. 如果有，直接继续导航 */
  if (pathnameHasLocale) return;

  /* b. 没有的话进行重定向 */
  // 从 headers 中获取最终 locale
  const locale = getLocale(request);

  // 重定向至最终的 locale（比如：传入的 URL 是 /products，则重定向到 /en-US/products）
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: '/about/:path*',
};
