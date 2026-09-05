// API URL helper to route requests to backend server
// Handles web environments (relative path) and Capacitor/WebView runtime.

export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (typeof window !== 'undefined') {
    const isCapacitor =
      window.location.protocol === 'capacitor:' ||
      window.location.protocol === 'ionic:' ||
      Boolean((window as any).Capacitor?.isNativePlatform?.());

    if (isCapacitor) {
      // In native app environment, route to origin if available or configured backend
      const capacitorBackend = (window as any).__BACKEND_URL__ || window.location.origin;
      if (capacitorBackend && !capacitorBackend.startsWith('capacitor:') && !capacitorBackend.startsWith('ionic:')) {
        return `${capacitorBackend.replace(/\/$/, '')}${cleanEndpoint}`;
      }
    }
  }

  return cleanEndpoint;
}
