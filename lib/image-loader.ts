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
export default function proxyImageLoader({ src, width }: ImageLoaderProps): string {
  if (src.startsWith('/api/image-proxy')) {
    return `${src}&w=${width}`;
  }
  return src;
}
