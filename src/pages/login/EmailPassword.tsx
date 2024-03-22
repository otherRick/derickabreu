import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { userAuth } from '../../../firebase';
import { User } from 'firebase/auth/web-extension';
import { Confirmation } from '../../components/modals/confirmation/Confirmation';
import { EnvelopeSimple, Password } from '@phosphor-icons/react';

export const EmailPassword = ({
  open,
  closeEmailLogin,
  closeLogin
}: {
  open: boolean;
  closeEmailLogin: () => void;
  closeLogin: () => void;
}) => {
  const [registerModal, setRegisteModal] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [askToCreate, setAskToCreate] = useState(false);
  const [errorMessege, setErrorMessege] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [emailVerifyModal, setEmailVerifyModal] = useState(true);
  const [emailSentModal, setEmailSentModal] = useState(true);

  const onLogin = () => {
    signInWithEmailAndPassword(userAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        closeEmailLogin();
        closeLogin();

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        if (errorCode === 'auth/wrong-password') {
          setErrorMessege(errorCode);
        }
        if (errorCode === 'auth/user-not-found') {
          setAskToCreate(true);
        }
        console.log({ errorCode }, { errorMessage }, { email }, { credential });
      });
  };
  const onRegister = () => {
    createUserWithEmailAndPassword(userAuth, email, password)
      .then((userCredential) => {
        const users = userAuth?.currentUser as User;
        const actionCodeSettings = {
          url: 'https://portfoto-ac408.web.app',
          handleCodeInApp: true
        };
        sendEmailVerification(users, actionCodeSettings)
          .then(() => {
            console.log('mandou');
          })
          .catch((error) => {
            console.log(error);
          });
        const user = userCredential.user;
        setUser(user);
        setTimeout(() => {
          closeLogin();
          setRegisteModal(false);
        }, 4200);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendRecover = () => {
    sendPasswordResetEmail(userAuth, email)
      .then(() => {
        console.log(' // Password reset email sent!');
        setEmailSentModal(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error, errorMessage, errorCode);
      });
  };

  return (
    <section
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      className={` ${
        open ? 'flex' : 'hidden'
      } flex items-center justify-center h-screen fixed inset-0 z-40`}
    >
      <Confirmation
        inputMode
        type='text'
        children={<span>Para qual email deseja recuperar sua senha ?</span>}
        hidden={emailVerifyModal}
        onCancel={() => setEmailVerifyModal(true)}
        onConfirm={() => {
          sendRecover();
          setEmailVerifyModal(true);
        }}
        onChange={(value) => setEmail(value.target.value)}
        value={email}
      />
      <Confirmation
        closeBtnText='Fechar'
        children={
          <div className='flex flex-col items-center gap-6'>
            <div className='flex items-center '>
              <EnvelopeSimple size={30} color='black' />
              <Password size={30} color='black' />
            </div>
            <span className='text-center'>
              Verificação de senha enviada para <br />
              {email}. <br />
              Lembre-se conferir na caixa de SPAM{' '}
            </span>
          </div>
        }
        hidden={emailSentModal}
        onCancel={() => setEmailSentModal(true)}
      />
      {registerModal ? (
        <div className='fixed inset-0 flex justify-center items-center p-6 bg-black bg-opacity-50'>
          <div className='bg-white w-96 px-8 p-4 rounded-lg '>
            <h2 className='md:text-2xl font-bold mb-4'>Login</h2>
            <div className={`${askToCreate && 'hidden'} mb-4`}>
              <label htmlFor='email' className='block mb-1'>
                Email
              </label>
              <input
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                className={`w-full border border-gray-300 rounded-md py-2 px-3  `}
              />
            </div>
            <div className={`${askToCreate && 'hidden'} mb-4`}>
              <label htmlFor='password' className='block mb-1'>
                Senha
              </label>
              <input
                id='password'
                value={password}
                onChange={(e) => {
                  setErrorMessege('');
                  setPassword(e.target.value);
                }}
                type='password'
                className={`w-full border border-gray-300 rounded-md py-2 px-3 `}
              />
              <button onClick={() => setEmailVerifyModal(false)} className='underline text-xs'>
                Recuperar senha
              </button>
              <p
                className={`text-xs text-red-500 ${
                  errorMessege === 'auth/wrong-password' ? '' : 'hidden'
                }`}
              >
                senha inválida
              </p>
            </div>{' '}
            <div>
              {askToCreate ? (
                <>
                  <h1 className='text-black text-center'>
                    Parece que este email <span className='text-red-600'>não está cadastrado</span>{' '}
                    <br /> ou <br /> O foi inserido{' '}
                    <span className='text-red-600'>incorretamente</span> <br />
                    <br /> Deseja criar uma conta ?
                  </h1>
                  <div className=' flex justify-between  py-4 pt-10'>
                    <button
                      onClick={() => {
                        setRegisteModal(false), setAskToCreate(false);
                      }}
                      className='bg-blue-500 text-white px-2 py-1 rounded-md'
                    >
                      Cadastrar email
                    </button>
                    <button
                      onClick={() => {
                        setAskToCreate(false);
                      }}
                      className='bg-black text-white px-2 py-1 rounded-md'
                    >
                      Tentar novamente
                    </button>
                  </div>
                  <div className='w-full flex items-center justify-center'>
                    <button
                      onClick={() => {
                        closeEmailLogin();
                        setAskToCreate(false);
                      }}
                      className='text-center text-gray-800 underline px-2 py-1 rounded-md'
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <div className='w-full'>
                  <div className=' flex flex-col gap-6 '>
                    <button
                      onClick={onLogin}
                      className='bg-zinc-800 text-white px-2 py-1 rounded-md'
                    >
                      Entrar
                    </button>
                    <button
                      onClick={() => {
                        closeEmailLogin();
                        setEmail('');
                        setPassword('');
                        setErrorMessege('');
                      }}
                      className='text-xs text-center underline border border-gray-500 px-2 py-1 rounded-md '
                    >
                      Cancelar
                    </button>
                  </div>
                  <p
                    onClick={() => {
                      setRegisteModal(false), setAskToCreate(false);
                    }}
                    className='text-xs pt-10 text-center underline cursor-pointer'
                  >
                    Criar conta
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : user ? (
        <h2 className='text-center bg-transparent text-white font-medium text-2xl'>
          👍 Registrado com sucesso
        </h2>
      ) : (
        <div className='fixed inset-0 flex justify-center items-center p-6 md:p-0 bg-black bg-opacity-50'>
          <div className='bg-white w-96 p-8 rounded-lg'>
            <h2 className='md:text-2xl font-bold mb-4'>Registro</h2>
            <div className='mb-4 text-sm'>
              <label htmlFor='email' className='block mb-1'>
                Email
              </label>
              <input
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='text'
                className='w-full border border-gray-300 rounded-md py-2 px-3'
              />
            </div>
            <div className='mb-4 text-sm '>
              <label htmlFor='password' className='block mb-1'>
                Senha
              </label>
              <input
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                className='w-full border border-gray-300 rounded-md py-2 px-3'
              />
            </div>
            <div className='flex gap-10 flex-col w-fit'>
              <button
                disabled={password && email ? false : true}
                onClick={onRegister}
                className={` text-sm text-white px-4 py-2 rounded-md ${
                  password && email ? 'bg-black' : 'bg-gray-500'
                }`}
              >
                Registrar
              </button>
              <button
                onClick={() => {
                  closeLogin();
                  setRegisteModal(true);
                }}
                className='text-xs underline text-start px-2 py-1 rounded-md '
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
