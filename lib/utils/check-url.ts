export function checkUrlValid(url: string) {
  return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_.~#?&//=]*)$/.test(
    url
  );
}

export async function checkUrlAvailable(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' }); // Use HEAD requests to minimize data transfer

    return response?.ok;
  } catch (error) {
    return false;
  }
}
