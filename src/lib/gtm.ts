import TagManager from "react-gtm-module";

/**
 * Initialize Google Tag Manager
 * @param gtmId - Your GTM Container ID (e.g., "GTM-XXXXXXX")
 */
export const initializeGTM = (gtmId: string) => {
  if (!gtmId) {
    console.warn("GTM ID is not provided. Google Tag Manager will not be initialized.");
    return;
  }

  TagManager.initialize({
    gtmId,
  });
};

/**
 * Push data to GTM dataLayer
 * @param data - Data object to push to dataLayer
 */
export const pushToDataLayer = (data: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

