export async function checkUrl(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' }); // Use HEAD requests to minimize data transfer

    return response?.ok;
  } catch (error) {
    return false;
  }
}
