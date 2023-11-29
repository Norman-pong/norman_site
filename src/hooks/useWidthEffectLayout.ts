import {useEffect, useState} from 'react';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const windowWidthSizes = {
  large: 'large',
  middle: 'middle',
  small: 'small',
  ssr: 'ssr',
} as const;

type WindowSize = keyof typeof windowWidthSizes;

const LargeWidth = 996;
const MiddleWidth = 660;

function getWindowSize() {
  if (!ExecutionEnvironment.canUseDOM) {
    throw new Error(
      'getWindowSize() should only be called after React hydration',
    );
  }
  return window.innerWidth > LargeWidth
    ? windowWidthSizes.large
    : window.innerWidth > MiddleWidth
    ? windowWidthSizes.middle
    : windowWidthSizes.small;
}

/**
 * Gets the current window size as an enum value. We don't want it to return the
 * actual width value, so that it only re-renders once a breakpoint is crossed.
 *
 * It may return `"ssr"`, which is very important to handle hydration FOUC or
 * layout shifts. You have to handle it explicitly upfront. On the server, you
 * may need to render BOTH the mobile/desktop elements (and hide one of them
 * with mediaquery). We don't return `undefined` on purpose, to make it more
 * explicit.
 */
export function useWidthEffectLayout(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(
    () =>
      // super important to return a constant value to avoid hydration mismatch
      // see https://github.com/facebook/docusaurus/issues/9379
      'ssr',
  );

  useEffect(() => {
    function updateWindowSize() {
      setWindowSize(getWindowSize());
    }

    updateWindowSize();

    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return windowSize;
}
