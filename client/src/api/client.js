/**
 * Studio GTA API Client Configuration
 * 
 * Provides centralized API base URL resolution and standard request headers.
 * Connects the Vercel frontend to the production Render backend (https://studiogta.onrender.com).
 */

/**
  * Resolves the API base URL without trailing slashes.
  * Ensures endpoints like `${API_BASE_URL}/api/contact` are never malformed.
  */
export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // Safe fallback for production deployments
  if (import.meta.env.PROD) {
    return 'https://studiogta.onrender.com';
  }

  // Local development fallback (proxied to http://localhost:5000 via vite.config.js)
  return '';
}

export const API_BASE_URL = getApiBaseUrl();

/**
 * Standard request headers for JSON API communications.
 * Preserves custom headers and potential JWT/auth tokens.
 */
export function getDefaultHeaders(extraHeaders = {}) {
  return {
    'Content-Type': 'application/json',
    ...extraHeaders
  };
}
