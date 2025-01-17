// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enums
import { ApiMethod } from '@enums/api';

const userPhoneApi = createApi({
  reducerPath: 'api/user/phone',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/phone`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    sendOTP: builder.mutation<{ message: string }, { phoneNumber: string }>({
      query: ({ phoneNumber }) => ({
        url: '/send-otp',
        method: ApiMethod.POST,
        body: { phoneNumber },
      }),
    }),

    resendOTP: builder.mutation<{ message: string }, { phoneNumber: string }>({
      query: ({ phoneNumber }) => ({
        url: '/resend-otp',
        method: ApiMethod.POST,
        body: { phoneNumber },
      }),
    }),

    verifyOTP: builder.mutation<{ message: string }, { phoneNumber: string; otp: string }>({
      query: ({ phoneNumber, otp }) => ({
        url: '/verify-otp',
        method: ApiMethod.POST,
        body: { phoneNumber, otp },
      }),
    }),

    verifyVerificationCode: builder.mutation<
      { message: string },
      { phoneNumber: string; verificationCode: string }
    >({
      query: ({ phoneNumber, verificationCode }) => ({
        url: '/verify-verification-code',
        method: ApiMethod.POST,
        body: { phoneNumber, verificationCode },
      }),
    }),

    changePhoneNumber: builder.mutation<{ message: string }, { newPhoneNumber: string }>({
      query: ({ newPhoneNumber }) => ({
        url: '/change-phone-number',
        method: ApiMethod.PATCH,
        body: { newPhoneNumber },
      }),
    }),

    removePhoneNumber: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/remove-phone-number',
        method: ApiMethod.DELETE,
      }),
    }),

    verifyPhoneNumber: builder.mutation<{ message: string }, { phoneNumber: string }>({
      query: ({ phoneNumber }) => ({
        url: '/verify-phone-number',
        method: ApiMethod.POST,
        body: { phoneNumber },
      }),
    }),

    sendVerificationCode: builder.mutation<{ message: string }, { phoneNumber: string }>({
      query: ({ phoneNumber }) => ({
        url: '/send-verification-code',
        method: ApiMethod.POST,
        body: { phoneNumber },
      }),
    }),
  }),
});

export const {
  useSendOTPMutation,
  useResendOTPMutation,
  useVerifyOTPMutation,
  useVerifyVerificationCodeMutation,
  useChangePhoneNumberMutation,
  useRemovePhoneNumberMutation,
  useVerifyPhoneNumberMutation,
  useSendVerificationCodeMutation,
} = userPhoneApi;

export const {
  sendOTP: sendOTPService,
  resendOTP: resendOTPService,
  verifyOTP: verifyOTPService,
  verifyVerificationCode: verifyVerificationCodeService,
  changePhoneNumber: changePhoneNumberService,
  removePhoneNumber: removePhoneNumberService,
  verifyPhoneNumber: verifyPhoneNumberService,
  sendVerificationCode: sendVerificationCodeService,
} = userPhoneApi.endpoints;

export default userPhoneApi;
