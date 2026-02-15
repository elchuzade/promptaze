/**
 * Track a custom event. Uses @plausible-analytics/tracker (loaded only in browser).
 * Safe to call before Plausible is initialized; failures are ignored.
 */
export function track(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  import("@plausible-analytics/tracker")
    .then(({ track: plausibleTrack }) => {
      try {
        plausibleTrack(event, props ? { props } : {});
      } catch {
        // init() not called yet
      }
    })
    .catch(() => {
      // Tracker failed to load
    });
}
