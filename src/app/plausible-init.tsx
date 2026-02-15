"use client";

import { useEffect } from "react";

export function PlausibleInit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const domain =
      process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || window.location.hostname;
    if (!domain) return;
    import("@plausible-analytics/tracker").then(({ init }) => {
      init({
        domain,
        captureOnLocalhost: false,
      });
    });
  }, []);

  return null;
}
