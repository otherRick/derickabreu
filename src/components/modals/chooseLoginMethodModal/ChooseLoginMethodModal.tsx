import { DeviceMobile, Password } from '@phosphor-icons/react';
import { OAuthGoogle } from '../../../pages/login/oAuthGoogle';
import { EmailPassword } from '../../../pages/login/EmailPassword';
import { LoginSMS } from '../../../pages/login/loginSMS';
import { useState } from 'react';

export const ChooseLoginMethodModal = ({
  openLogin,
  closeLogin
}: {
  openLogin: boolean;
  closeLogin: () => void;
}) => {
  const [loginEmail, setLoginEmail] = useState(false);
  const [loginSMS, setLoginSMS] = useState(false);
  return (
    <div
      className={` ${
        openLogin ? '' : 'hidden'
      } fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-10`}
    >
      <div className='bg-white w-96 p-8 rounded-lg items-center flex flex-col'>
        <h2 className='md:text-2xl font-bold mb-6'>Escolha o Método de Login</h2>
        <div className='flex justify-around items-center  border border-gray-500 rounded-md mb-4'>
          <OAuthGoogle />
        </div>
        <button
          onClick={() => setLoginEmail(true)}
          className=' text-black border border-gray-500 px-4 py-2 rounded-md mb-4 flex items-center'
        >
          Email e Senha
          <Password size={30} />
        </button>
        <EmailPassword
          closeEmailLogin={() => setLoginEmail(false)}
          closeLogin={() => {
            setLoginEmail(false);
            closeLogin();
          }}
          open={loginEmail}
        />
        <button
          onClick={() => setLoginSMS(true)}
          className=' text-black  border border-gray-500 px-4 py-2 rounded-md mb-4 flex items-center'
        >
          SMS
          <DeviceMobile size={30} />
        </button>
        <LoginSMS
          closeLogin={() => {
            setLoginSMS(false);
            closeLogin();
          }}
          open={loginSMS}
        />
        <button onClick={closeLogin} className='text-xs text-center underline pt-6 rounded-md '>
          Cancelar
        </button>
      </div>
    </div>
  );
};
