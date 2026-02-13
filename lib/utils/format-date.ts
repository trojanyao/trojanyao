export function formatYearMonth(date: Date, locale: string) {
  // 拿到格式化后每一部分
  const parts = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(date);

  // 以中文 locale 为例我们拼接成 `YYYY.MM`
  if (locale.startsWith('zh')) {
    const year = parts.find((p) => p.type === 'year')?.value;
    const month = parts.find((p) => p.type === 'month')?.value.padStart(2, '0');
    return `${year}.${month}`;
  }

  // 对于英文等 locale 使用 month short + year
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
  }).format(date);
}
