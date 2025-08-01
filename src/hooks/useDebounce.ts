"use client";

import { useState, useEffect } from "react";

/**
 * A custom React hook that debounces a value.
 * It delays updating the returned value until a specified amount of time has passed
 * without the source value changing. This is useful for performance optimization,
 * for example, to prevent firing an API call on every keystroke in a search input.
 *
 * @param value The value to be debounced (e.g., the current text from a search input).
 * @param delay The debounce delay in milliseconds (e.g., 500).
 * @returns The debounced value, which only updates after the delay has passed.
 */
function useDebounce<T>(value: T, delay: number): T {
  // 1. Create a state to store the debounced value.
  //    This state will only be updated after the specified 'delay'.
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 2. Set up a timer (setTimeout) whenever the source 'value' changes.
    //    This timer will update the debouncedValue after the 'delay' has passed.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 3. This is the cleanup function. It runs BEFORE the next effect starts,
    //    or when the component is unmounted.
    //    Its job is to cancel the previously set timer.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 4. This effect will re-run only if the 'value' or 'delay' changes.

  // 5. Return the debounced value. Components using this hook will re-render
  //    only when this 'debouncedValue' changes, not on every keystroke.
  return debouncedValue;
}

export default useDebounce;
