import { NextRequest, NextResponse } from 'next/server';

/** Notion 图片实际存储的 S3 域名，仅允许代理此来源 */
const NOTION_S3_HOST = 'prod-files-secure.s3.us-west-2.amazonaws.com';
/** 响应头 Cache-Control max-age（秒），约 1 年，满足 Lighthouse 缓存建议 */
const CACHE_MAX_AGE = 31536000;
/** 服务端内存缓存 TTL：50 分钟，低于 Notion 预签名 URL 的 1 小时有效期 */
const SERVER_CACHE_TTL_MS = 50 * 60 * 1000;
/** 服务端缓存最多保留条数，超出时按最久未用淘汰 */
const SERVER_CACHE_MAX = 80;

type CacheEntry = { body: ArrayBuffer; contentType: string; cachedAt: number };

/** 按 S3 pathname 缓存图片二进制，同一张图不同预签名 URL 会命中同一缓存 */
const serverCache = new Map<string, CacheEntry>();

function isAllowedUrl(url: URL): boolean {
  return url.hostname === NOTION_S3_HOST && url.pathname.startsWith('/');
}

/** 用 pathname 做 key，这样预签名参数变化（同一张图）仍能命中缓存 */
function getCacheKey(url: URL): string {
  return url.pathname;
}

/** 缓存条数达到上限时，淘汰约 20% 最久未使用的条目 */
function evictOldEntries(): void {
  if (serverCache.size < SERVER_CACHE_MAX) return;
  const sorted = [...serverCache.entries()].sort(
    (a, b) => a[1].cachedAt - b[1].cachedAt
  );
  const toRemove = serverCache.size - Math.floor(SERVER_CACHE_MAX * 0.8);
  for (let i = 0; i < toRemove && i < sorted.length; i++) {
    serverCache.delete(sorted[i][0]);
  }
}

/**
 * GET /api/image-proxy?url=<编码后的 Notion 图片 URL>
 * 从 Notion S3 拉取图片并返回，响应带长期 Cache-Control，解决 Lighthouse「Use efficient cache lifetimes」。
 * 50 分钟内同一张图（相同 pathname）会直接从本站内存缓存返回，不再请求 Notion。
 */
export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get('url');
  if (!urlParam) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(urlParam);
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  if (!isAllowedUrl(targetUrl)) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 400 });
  }

  const cacheKey = getCacheKey(targetUrl);
  const cached = serverCache.get(cacheKey);
  const now = Date.now();
  // 命中服务端缓存：直接返回，不再请求 Notion
  if (cached && now - cached.cachedAt < SERVER_CACHE_TTL_MS) {
    return new NextResponse(cached.body, {
      status: 200,
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, immutable`,
      },
    });
  }

  try {
    const res = await fetch(targetUrl.toString(), {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Notion-Image-Proxy/1)' },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: 502 }
      );
    }
    const body = await res.arrayBuffer();
    const contentType = res.headers.get('Content-Type') ?? 'image/png';

    evictOldEntries();
    serverCache.set(cacheKey, { body, contentType, cachedAt: now });

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, immutable`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 502 }
    );
  }
}
