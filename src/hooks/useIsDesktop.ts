"use client";

import { useState, useEffect } from "react";

/**
 * A custom React hook that detects if the current viewport width is greater than
 * or equal to a specified breakpoint, typically representing a desktop view.
 *
 * @param breakpoint The width in pixels to check against. Defaults to 768px (Tailwind's 'md' breakpoint).
 * @returns A boolean value: 'true' if the window width is >= breakpoint, otherwise 'false'.
 */
const useIsDesktop = (breakpoint = 768) => {
  // 1. Create a state to store the boolean result (true for desktop, false for mobile/tablet).
  //    We initialize it to 'false' by default.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // 2. This function checks the current window width and updates the state accordingly.
    const handleResize = () => {
      if (window.innerWidth >= breakpoint) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };

    // 3. Call the handler immediately when the component mounts.
    //    This ensures the state is set correctly on the initial page load.
    handleResize();

    // 4. Add an event listener that calls 'handleResize' every time the browser window is resized.
    window.addEventListener("resize", handleResize);

    // 5. This is the cleanup function. It runs when the component is unmounted.
    //    It's crucial to remove the event listener to prevent memory leaks.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]); // 6. This effect will re-run only if the 'breakpoint' prop changes.

  // 7. Return the current state (true or false).
  return isDesktop;
};

export default useIsDesktop;
