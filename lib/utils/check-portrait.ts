/**
 * Check if the image is portrait
 * @param width - The width of the image
 * @param height - The height of the image
 * @returns - True if the image is portrait, false otherwise
 */
export function checkIsPortrait(width: number, height: number): boolean {
  // Check if width and height are defined and if height is greater than width and less than width * 3
  return Boolean(width) && Boolean(height) && height > width && height < width * 3;
}
