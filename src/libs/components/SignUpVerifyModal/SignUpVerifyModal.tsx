'use client';

// React
import { useEffect, useRef, useState } from 'react';

// React Spring
import { animated, useSpring } from 'react-spring';

// Hooks
import { useAppSelector } from '@store/hooks';

// Styles
import '@styles/components/SignUpVerifyModal.scss';

// Types
import type { JSX } from 'react';

export default function VerifyModal(): JSX.Element {
  // States
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalHeight, setTotalHeight] = useState(0);

  // Refs
  const animatedDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animatedDivRef.current) {
      const children: Element[] = Array.from(animatedDivRef.current.children);
      let sum: number = 0;

      children.forEach((child: Element) => {
        if (child instanceof HTMLElement) {
          sum += child.offsetHeight;
        }
      });

      setTotalHeight(sum);
    }
  }, []);

  const divHeight: string = `${totalHeight + 24}px`;

  const expandSpring = useSpring({
    opacity: isExpanded ? 1 : 0,
    height: isExpanded ? divHeight : '0',
    overflow: 'hidden',
  });

  const handleExpandClick = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="modal-overlay" />
      <div className="verify-modal">
        <div className="top-bar" />
        <div className="title-container">
          <div className="title">Verify Your Email</div>
        </div>
        <div className="content-border">
          <div className="content">
            <div className="verify-dialog">
              <div className="verification-header">
                <div className="verification-subheader">
                  Check&nbsp;
                  <span className="verification-email">{currentUserData?.email || ''}</span>
                  &nbsp;for an email from Red Steam to verify and access your account.
                </div>
                <div className="loadding-wrapper">
                  <div className="throbber">
                    <div />
                    <div />
                    <div />
                  </div>
                  <div className="loading-text">Waiting for you to verify...</div>
                </div>
              </div>
              <div className="verification-missing">
                <div className="email-missing">Haven't gotten our email?</div>
                <div className="expand-btn" onClick={handleExpandClick}>
                  <span>
                    Expand&nbsp;
                    <i className={`${isExpanded && 'flipped'}`} />
                  </span>
                </div>
              </div>
              <animated.div
                className="verification-troubleshooting"
                style={{ ...expandSpring }}
                ref={animatedDivRef}
              >
                <div>
                  If you haven't gotten our email please try the below troubleshooting steps:
                </div>
                <ul>
                  <li>
                    Double check that your email&nbsp;
                    <span>{currentUserData?.email || ''}</span>
                    &nbsp;is accurate and doesn't contain any typos.
                  </li>
                  <li>
                    Please check both your spam and trash folder for an email from
                    "steam.redclone@gmail.com". Sometimes emails can be incorrectly identified as
                    spam by your email provider.
                  </li>
                  <li>
                    Wait a few minutes. Sometimes email servers are slow and can take a bit of time
                    to receive an email.
                  </li>
                </ul>
              </animated.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}