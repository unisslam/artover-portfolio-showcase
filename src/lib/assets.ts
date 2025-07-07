/**
 * Get the correct path for assets in different environments
 * @param path - The asset path relative to public folder
 * @returns The correct path for the current environment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production (GitHub Pages), use the base path
  const base = import.meta.env.BASE_URL || '/';
  
  return `${base}${cleanPath}`;
}

/**
 * Get image path helper
 * @param imageName - The image filename in lovable-uploads folder
 * @returns The correct image path
 */
export function getImagePath(imageName: string): string {
  return getAssetPath(`lovable-uploads/${imageName}`);
}
