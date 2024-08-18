'use client';

// React
import { useState } from 'react';

// Components
import LeftSection from './LeftSection';
import RightSection from './RightSection';

// Types
import type { FC, JSX } from 'react';

const HomeTabs: FC = (): JSX.Element => {
  // States
  const [openedTab, setOpenedTab] = useState<string | number>('New & Trending');
  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);

  const handleTabClick = (tab: string): void => {
    setOpenedTab(tab);
  };

  const handleTabHover = (idx: number | null): void => {
    setHoveredTabIndex(idx);
  };

  return (
    <div className="tab-container">
      <div className="tab-contents">
        <LeftSection
          openedTab={openedTab}
          handleTabClick={handleTabClick}
          hoveredTabIndex={hoveredTabIndex}
          onTabHover={handleTabHover}
        />
        <RightSection openedTab={openedTab} hoveredTabIndex={hoveredTabIndex} />
      </div>
    </div>
  );
};

export default HomeTabs;