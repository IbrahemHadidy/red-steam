'use client';

// React
import { useEffect, useRef } from 'react';

// NextJS
import Image from 'next/image';

// React Spring
import { animated, useSpring } from 'react-spring';

// Google ReCAPTCHA
import ReCAPTCHA from 'react-google-recaptcha';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { checkExistingEmail, checkNameAndPassword } from '@store/features/user/signup/signupThunks';

// Redux Handlers
import { fetchCountry, setSecondPage } from '@store/features/user/signup/signupSlice';

// Contstants
import { SIGNUP_BG } from '@config/constants/backgrounds';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Components
import ExistingAccount from './ExistingAccount';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';

// Images
import back from '@images/back.png';

// Types
import type { FormEvent } from 'react';

export default function SignUpPage() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();
  useDynamicBackground(SIGNUP_BG);

  //--------------------------- State Selectors ---------------------------//
  const { isSecondPage, isEmailAvailable, errorMessages } = useAppSelector(
    (state) => state.user.signup
  );

  //--------------------------- On Mount Effects --------------------------//
  useEffect(() => {
    // Fetch User Country on mount
    dispatch(fetchCountry());
  }, [dispatch]);

  //--------------------------- Ref for ReCAPTCHA -------------------------//
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  //-------------------------- Spring Animations --------------------------//
  const springProps = useSpring({
    from: { backgroundColor: 'rgba(244, 183, 134, 1)' },
    to: {
      backgroundColor: errorMessages.length !== 0 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(244, 183, 134, 1)',
      display: errorMessages.length !== 0 ? 'block' : 'none',
    },
    config: { duration: 1000 },
  });

  //---------------------------- Event Handlers ----------------------------//
  const handleSubmitFirstForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(checkExistingEmail(recaptchaRef));
  };

  const handleSubmitSecondForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(checkNameAndPassword());
  };

  const handleBackButtonClick = (): void => {
    dispatch(setSecondPage(false));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <>
      <div className="page-content-sign signup">
        <div className="joinsteam-content">
          <animated.div className="error-display" style={springProps}>
            {errorMessages.map((message, idx) => (
              <div key={idx}>{message}</div>
            ))}
          </animated.div>

          {isEmailAvailable ? (
            <div className="create-account-container">
              <form
                action=""
                onSubmit={isSecondPage ? handleSubmitSecondForm : handleSubmitFirstForm}
              >
                <div className="join-form">
                  <div className="section-title">
                    {isSecondPage && (
                      <Image src={back} alt="Back Icon" onClick={handleBackButtonClick} />
                    )}
                    Create Your Account
                  </div>

                  {!isSecondPage ? <FirstForm recaptchaRef={recaptchaRef} /> : <SecondForm />}
                </div>
              </form>
            </div>
          ) : (
            <ExistingAccount />
          )}
        </div>
      </div>
    </>
  );
}
