import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // 从请求中解析 locale
  const requested = await requestLocale;

  // 如果请求的 locale 存在则使用；否则使用默认 locale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  // 提供 locale 和 messages 多语言
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
