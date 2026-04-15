/**
 * True when `url` is a syntactically valid absolute http(s) URL.
 * Prefer WHATWG `URL` over ASCII-only regex so Unicode paths (e.g. App Store slugs) and trimming match browser behavior.
 */
export function checkUrlValid(url: string | null | undefined) {
  if (url == null || typeof url !== 'string') return false;

  const trimmed = url.trim();
  if (!trimmed) return false;

  try {
    // Only a valid URL will be successfully parsed by the URL constructor
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function checkUrlAvailable(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' }); // Use HEAD requests to minimize data transfer

    return response?.ok;
  } catch {
    return false;
  }
}
