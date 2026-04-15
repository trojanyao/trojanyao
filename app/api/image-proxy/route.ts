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
/** Max output width – matches Next.js largest default deviceSize */
const MAX_WIDTH = 3840;

type CacheEntry = { body: ArrayBuffer; contentType: string; cachedAt: number };

/** 按 pathname + format 缓存，同一张图不同格式分别缓存 */
const serverCache = new Map<string, CacheEntry>();

function isAllowedUrl(url: URL): boolean {
  return url.hostname === NOTION_S3_HOST && url.pathname.startsWith('/');
}

function getCacheKey(url: URL, format: string | null, w: number): string {
  let key = url.pathname;
  if (format) key += `:${format}`;
  if (w) key += `:w${w}`;
  return key;
}

function redirectToOrigin(targetUrl: URL): NextResponse {
  return NextResponse.redirect(targetUrl.toString(), 307);
}

function inferImageContentTypeFromPathname(pathname: string): string | null {
  const ext = pathname.split('.').pop()?.toLowerCase();
  if (!ext) return null;
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'avif') return 'image/avif';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'svg') return 'image/svg+xml';
  return null;
}

function normalizeContentType(raw: string | null, pathname: string): string {
  const normalizedRaw = raw?.split(';')?.[0]?.trim().toLowerCase();
  if (normalizedRaw?.startsWith('image/')) return normalizedRaw;
  return inferImageContentTypeFromPathname(pathname) ?? 'application/octet-stream';
}

function isSharpTransformableImage(contentType: string): boolean {
  return (
    contentType === 'image/jpeg' ||
    contentType === 'image/png' ||
    contentType === 'image/webp' ||
    contentType === 'image/gif' ||
    contentType === 'image/tiff' ||
    contentType === 'image/avif'
  );
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
 * GET /api/image-proxy?url=<encoded Notion image URL>[&format=avif][&w=640]
 *
 * Proxies Notion S3 images with long-term Cache-Control.
 * - `format=avif` converts to AVIF via sharp.
 * - `w=<number>` resizes to the given width (capped at MAX_WIDTH, never upscales).
 *   Resize runs before format conversion for better performance.
 * - Results are cached in-memory for 50 min (keyed by pathname + format + width).
 */
export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get('url');
  const format = request.nextUrl.searchParams.get('format');
  const wParam = request.nextUrl.searchParams.get('w');
  const w = wParam ? Math.min(Math.max(parseInt(wParam, 10) || 0, 0), MAX_WIDTH) : 0;

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

  const cacheKey = getCacheKey(targetUrl, format, w);
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
      // Fallback to the origin URL so browser can still try direct fetch.
      return redirectToOrigin(targetUrl);
    }
    let body: ArrayBuffer = await res.arrayBuffer();
    let contentType = normalizeContentType(res.headers.get('Content-Type'), targetUrl.pathname);

    const wantResize = w > 0;
    // SVG should always stay vector; ignore AVIF conversion requests for this source type.
    const wantAvif = format === 'avif' && contentType !== 'image/svg+xml';

    const canTransform = isSharpTransformableImage(contentType);
    if ((wantResize || wantAvif) && canTransform) {
      try {
        let pipeline = sharp(Buffer.from(body));
        if (wantResize) pipeline = pipeline.resize({ width: w, withoutEnlargement: true });
        if (wantAvif) pipeline = pipeline.avif({ quality: 60 });
        const result = await pipeline.toBuffer();
        body = result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength) as ArrayBuffer;
        if (wantAvif) contentType = 'image/avif';
      } catch {
        // Processing failed – fall through with original bytes
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
    // Network/runtime failures on server side should not hard-break rendering.
    return redirectToOrigin(targetUrl);
  }
}
