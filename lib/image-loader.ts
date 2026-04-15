import type { ImageLoaderProps } from 'next/image';

/**
 * Custom image loader registered via next.config `images.loaderFile`.
 *
 * Delegates resizing to /api/image-proxy (sharp) instead of Vercel's
 * /_next/image, so we get responsive srcset without consuming the
 * Vercel Image Optimization quota.
 *
 * For non-proxy URLs the src is returned as-is (no breakage, just no
 * multi-width benefit).
 */
export default function proxyImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith('/api/image-proxy')) {
    return `${src}&w=${width}`;
  }

  /*
   * `next/image` requires the loader output to vary with `width` when building `srcset`.
   * Returning the same string for every width triggers "missing loader width" warnings
   * for bundled static assets (e.g. imported SVGs under `/_next/static/media/`).
   *
   * Do not append params to absolute remote URLs: extra query keys can break signed URLs.
   */
  if (src.startsWith('/') && !src.startsWith('//')) {
    const sep = src.includes('?') ? '&' : '?';
    const params = new URLSearchParams({ w: String(width) });
    if (quality !== undefined) params.set('q', String(quality));
    return `${src}${sep}${params.toString()}`;
  }

  return src;
}
