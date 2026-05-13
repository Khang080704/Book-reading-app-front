"use client";

import { useState, useEffect } from "react";

/**
 * Debounce a value by a given delay.
 * Use a higher delay (800ms+) for search inputs that trigger expensive API calls
 * to avoid third-party rate limiting.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
