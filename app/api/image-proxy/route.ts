import { NextRequest, NextResponse } from 'next/server';

import sharp from 'sharp';

export const runtime = 'nodejs';

/** Notion 图片实际存储的 S3 域名，仅允许代理此来源 */
const NOTION_S3_HOST = 'prod-files-secure.s3.us-west-2.amazonaws.com';
/** 响应头 Cache-Control max-age（秒），约 1 年，满足 Lighthouse 缓存建议 */
const CACHE_MAX_AGE = 31536000;
/** 服务端内存缓存 TTL：50 分钟，低于 Notion 预签名 URL 的 1 小时有效期 */
const SERVER_CACHE_TTL_MS = 50 * 60 * 1000;
/** 服务端缓存最多保留条数，超出时按最久未用淘汰 */
const SERVER_CACHE_MAX = 80;

type CacheEntry = { body: ArrayBuffer; contentType: string; cachedAt: number };

/** 按 pathname + format 缓存，同一张图不同格式分别缓存 */
const serverCache = new Map<string, CacheEntry>();

function isAllowedUrl(url: URL): boolean {
  return url.hostname === NOTION_S3_HOST && url.pathname.startsWith('/');
}

function getCacheKey(url: URL, format: string | null): string {
  return url.pathname + (format ? `:${format}` : '');
}

/** 缓存条数达到上限时，淘汰约 20% 最久未使用的条目 */
function evictOldEntries(): void {
  if (serverCache.size < SERVER_CACHE_MAX) return;
  const sorted = [...serverCache.entries()].sort((a, b) => a[1].cachedAt - b[1].cachedAt);
  const toRemove = serverCache.size - Math.floor(SERVER_CACHE_MAX * 0.8);
  for (let i = 0; i < toRemove && i < sorted.length; i++) {
    serverCache.delete(sorted[i][0]);
  }
}

/**
 * GET /api/image-proxy?url=<编码后的 Notion 图片 URL>[&format=avif]
 * 从 Notion S3 拉取图片并返回，响应带长期 Cache-Control。
 * format=avif 时在服务端用 sharp 转为 AVIF（在不开启 Next 图片优化时仍可让封面用 AVIF）。
 * 50 分钟内同一张图（相同 pathname + format）会从内存缓存返回。
 */
export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get('url');
  const format = request.nextUrl.searchParams.get('format');

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

  const cacheKey = getCacheKey(targetUrl, format);
  const cached = serverCache.get(cacheKey);
  const now = Date.now();
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
      return NextResponse.json({ error: `Upstream returned ${res.status}` }, { status: 502 });
    }
    let body: ArrayBuffer = await res.arrayBuffer();
    let contentType = res.headers.get('Content-Type') ?? 'image/png';

    if (format === 'avif') {
      try {
        const avif = await sharp(Buffer.from(body)).avif({ quality: 60 }).toBuffer();
        body = avif.buffer.slice(avif.byteOffset, avif.byteOffset + avif.byteLength) as ArrayBuffer;
        contentType = 'image/avif';
      } catch {
        // 转换失败则返回原图
      }
    }

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
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
  }
}
