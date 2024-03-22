export {};

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: RecaptchaVerifier;
  }
}

declare module 'otp-input-react';
