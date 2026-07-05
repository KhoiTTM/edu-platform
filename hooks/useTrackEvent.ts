"use client";

import { useCallback } from "react";
import { AnyLearningEvent } from "@/types/events";

/**
 * A hook to track learning events across the application.
 * Events are fired-and-forgotten to minimize UI impact.
 */
export function useTrackEvent() {
  const trackEvent = useCallback(async (event: AnyLearningEvent & { session_id?: string }) => {
    try {
      // Fire and forget
      fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }).catch(err => {
        console.warn("Event tracking failed (background):", err);
      });
    } catch (err) {
      console.warn("Event tracking failed (foreground):", err);
    }
  }, []);

  return trackEvent;
}
