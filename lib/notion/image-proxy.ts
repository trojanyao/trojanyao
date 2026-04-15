const NOTION_S3_HOST = 'prod-files-secure.s3.us-west-2.amazonaws.com';

/**
 * 判断是否为 Notion 的 S3 图片 URL（预签名链接）。
 * 这类链接 X-Amz-Expires 通常为 3600，无法由我们设置长期缓存，
 * 需要通过本站代理并加上合适的 Cache-Control。
 */
export function isNotionImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const u = new URL(url);
    return u.hostname === NOTION_S3_HOST;
  } catch {
    return false;
  }
}

export type ProxiedImageFormat = 'avif' | undefined;

function isSvgUrl(url: string): boolean {
  try {
    return new URL(url).pathname.toLowerCase().endsWith('.svg');
  } catch {
    return false;
  }
}

/**
 * 将 Notion 图片 URL 转为本站代理 URL，以便响应头带上长期缓存（如 1 年），
 * 满足 Lighthouse "Use efficient cache lifetimes" 要求。
 * 非 Notion 的 URL 原样返回。
 * @param format 若为 'avif'，代理会转换为 AVIF 后返回（需保持 unoptimized 时封面图用 AVIF 时使用）
 */
export function getProxiedImageUrl(
  url: string | null | undefined,
  options?: { format?: ProxiedImageFormat }
): string | undefined {
  if (!url || typeof url !== 'string') return undefined;
  if (!isNotionImageUrl(url)) return url;
  const base = `/api/image-proxy?url=${encodeURIComponent(url)}`;
  // SVG is vector format; AVIF conversion is unnecessary and may reduce compatibility.
  if (options?.format === 'avif' && !isSvgUrl(url)) return `${base}&format=avif`;
  return base;
}
