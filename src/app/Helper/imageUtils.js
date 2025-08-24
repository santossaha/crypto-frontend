/**
 * Utility function to format image URLs for Next.js Image component
 * @param {string} imageUrl - The image URL from the API
 * @returns {string} - Properly formatted URL for Next.js Image
 */
export const formatImageUrl = (imageUrl) => {
  if (!imageUrl) return "/p-1.jpg";
  
  // If it's already an absolute URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it starts with a slash, it's a relative path from root
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  // For relative paths from API (e.g., "blog_1744454696_67fa44284b2d8.jpg")
  // We need to construct the full URL based on the API configuration
  // From next.config.mjs, we can see the API hostnames are configured
  
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Try to get the API URL from environment or construct it
    // Since we're in the browser, we'll use the current origin and construct the API path
    const currentOrigin = window.location.origin;
    
    // If the image path doesn't start with a slash, construct the API URL
    if (!imageUrl.startsWith('/')) {
      // Option 1: Use the direct API URL (more efficient)
      // Based on the next.config.mjs, the API hostnames are configured
      const apiBaseUrl = "http://13.233.93.31"; // From next.config.mjs
      return `${apiBaseUrl}/${imageUrl}`;
      
      // Option 2: Use the proxy API route (if you prefer to proxy through Next.js)
      // return `${currentOrigin}/api/images/${imageUrl}`;
    }
    
    return `${currentOrigin}${imageUrl}`;
  }
  
  // Fallback for server-side rendering
  // For SSR, we'll prepend a leading slash for relative paths
  return `/${imageUrl}`;
};

/**
 * Alternative function that takes the API base URL as a parameter
 * @param {string} imageUrl - The image URL from the API
 * @param {string} apiBaseUrl - The base URL of your API
 * @returns {string} - Properly formatted URL for Next.js Image
 */
export const formatImageUrlWithApi = (imageUrl, apiBaseUrl) => {
  if (!imageUrl) return "/p-1.jpg";
  
  // If it's already an absolute URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it starts with a slash, it's a relative path from root
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  // Construct full URL with API base
  if (apiBaseUrl) {
    return `${apiBaseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  }
  
  // Fallback: prepend leading slash for relative paths
  return `/${imageUrl}`;
}; 