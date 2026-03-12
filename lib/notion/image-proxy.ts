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

/**
 * 将 Notion 图片 URL 转为本站代理 URL，以便响应头带上长期缓存（如 1 年），
 * 满足 Lighthouse "Use efficient cache lifetimes" 要求。
 * 非 Notion 的 URL 原样返回。
 */
export function getProxiedImageUrl(url: string | null | undefined): string | undefined {
  if (!url || typeof url !== 'string') return undefined;
  if (!isNotionImageUrl(url)) return url;
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}
