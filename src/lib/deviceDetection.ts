// src/lib/deviceDetection.ts
/**
 * Detects if the current session is running inside a standalone PWA,
 * an installed Android APK (WebView/TWA), or a fullscreen app container.
 */
export const isStandaloneApp = (): boolean => {
  if (typeof window === 'undefined') return false;

  const isStandaloneMediaQuery = window.matchMedia('(display-mode: standalone)').matches;
  const isFullscreenMediaQuery = window.matchMedia('(display-mode: fullscreen)').matches;
  const isIosStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  const isAndroidReferrer = typeof document !== 'undefined' && document.referrer.includes('android-app://');
  
  const ua = window.navigator.userAgent.toLowerCase();
  const isWebView = /wv|ebna-apk|twa/i.test(ua);
  const urlParamApk = typeof window.location !== 'undefined' && (
    window.location.search.includes('source=apk') || 
    window.location.search.includes('source=pwa') ||
    window.location.search.includes('mode=apk')
  );

  return isStandaloneMediaQuery || isFullscreenMediaQuery || isIosStandalone || isAndroidReferrer || isWebView || urlParamApk;
};
