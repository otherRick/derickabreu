import { BsFillShieldLockFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';

import OtpInput from 'otp-input-react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { userAuth } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { createProfile } from './slices/loginSlices';
import { DeviceMobileSpeaker, X } from '@phosphor-icons/react';

export const LoginSMS = ({ open, closeLogin }: { open: boolean; closeLogin: () => void }) => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [hidden, setHidden] = useState(false);

  // const modalRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(userAuth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          setTimeout(() => {
            onSignup();
            console.log('solver');
          }, 100);
        },
        'expired-callback': () => {}
      });
    }
  };

  const onSignup = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    console.log('login', appVerifier);

    const formatPh = '+' + ph;

    signInWithPhoneNumber(userAuth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success('Código enviado com sucesso!');
        // localStorage.setItem('firebaseAuthToken', JSON.stringify(confirmationResult));
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);

        dispatch(
          createProfile({
            phoneNumber: res.user.phoneNumber,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
            email: res.user.email,
            uid: res.user.uid
          })
        );

        setUser(res.user);
        setLoading(false);

        setHidden(true);
        setTimeout(() => {
          closeLogin();
        }, 2300);
      })
      .catch((err: string) => {
        console.log('adasdasd', err);
        toast.error('Código inválido!');
        setOtp('');
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //       closeLogin();
  //     }
  //   };

  //   const handleEscKey = (event: KeyboardEvent) => {
  //     if (event.key === 'Escape') {
  //       closeLogin();
  //     }
  //   };

  //   if (open) {
  //     document.body.style.overflow = 'hidden';
  //     document.addEventListener('mousedown', handleClickOutside);
  //     document.addEventListener('keydown', handleEscKey);
  //   } else {
  //     document.body.style.overflow = 'auto';
  //     document.removeEventListener('mousedown', handleClickOutside);
  //     document.removeEventListener('keydown', handleEscKey);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //     document.removeEventListener('keydown', handleEscKey);
  //   };
  // }, [open, closeLogin]);

  return (
    <section
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      className={` ${
        open ? 'flex' : 'hidden'
      } flex items-center justify-center h-screen fixed inset-0 z-40 `}
    >
      <div
        className={` ${
          hidden ? 'bg-transparent' : 'bg-gray-800'
        } w-fit justify-center flex flex-col`}
      >
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id='recaptcha-container'></div>
        {user ? (
          <h2 className='text-center bg-transparent text-white font-medium text-2xl'>
            👍Logado com sucesso
          </h2>
        ) : (
          <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
            <div>
              <p className='text-white text-sm text-center'>
                Entre com seu número de telefone e receba um sms para logar em seu perfil.
              </p>
            </div>
            {showOTP ? (
              <>
                <div className=' text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor='otp' className=' text-sm text-white text-center'>
                  Insira o código
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType='number'
                  disabled={false}
                  autoFocus
                  className='opt-container '
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'
                >
                  {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
                  <span>Verificar</span>
                </button>
              </>
            ) : (
              <>
                <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                  <DeviceMobileSpeaker size={32} />
                </div>
                <label htmlFor='' className='font-bold text-xl text-white text-center'>
                  Logar com o número:
                </label>
                <PhoneInput country={'br'} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'
                >
                  {loading && <CgSpinner size={20} className='mt-1 animate-spin' />}
                  <span>Enviar o código via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
        <button
          onClick={closeLogin}
          className={` ${hidden ? 'hidden' : ''}  underline pb-4 text-gray-400`}
        >
          Cancelar
        </button>
      </div>
    </section>
  );
};
