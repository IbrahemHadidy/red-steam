import { useAppSelector } from '@store/hooks';
import isVideoEntry from '@utils/checkMediaEntry';
import { useEffect } from 'react';
import useMediaSwapHandlers from '../../hooks/useMediaSwapHandlers';

import type { RefObject } from 'react';

/**
 * Handles the auto screenshot swap
 */
const useAutoScreenshotSwap = (
  isPageVisible: boolean,
  slideAreaRef: RefObject<HTMLDivElement | null>
) => {
  const { currentMediaLink, orderedMediaEntries, isScreenshotModalOpen, isMouseOverScreenshot } =
    useAppSelector((state) => state.game);

  const { handleRightSwap } = useMediaSwapHandlers({ slideAreaRef });

  useEffect(() => {
    const screenshotIntervalId = setInterval(() => {
      const isCurrentMediaScreenshot =
        currentMediaLink &&
        !isVideoEntry(orderedMediaEntries.find((entry) => entry.link === currentMediaLink));

      if (
        isCurrentMediaScreenshot &&
        !isScreenshotModalOpen &&
        !isMouseOverScreenshot &&
        isPageVisible
      ) {
        handleRightSwap();
      }
    }, 5000);

    return () => {
      clearInterval(screenshotIntervalId);
    };
  }, [
    currentMediaLink,
    handleRightSwap,
    isMouseOverScreenshot,
    isPageVisible,
    isScreenshotModalOpen,
    orderedMediaEntries,
  ]);
};

export default useAutoScreenshotSwap;
