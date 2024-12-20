import { useState } from 'react';

export const SessionCard = ({ onClick, src, alt, title, keyPass, nav }) => {
  const [switchKey, SetSwitchKey] = useState(false);
  const [valueKey, setValueKey] = useState('');
  const [validKey, setValidKey] = useState(true);

  console.log(valueKey);

  return (
    <div className={`relative`}>
      <div className='relative'>
        <p className='absolute text-white z-50 p-2 bg-white w-full bg-opacity-35'>{title}</p>
      </div>
      <div
        style={{ backgroundColor: 'rgba(1,1,1,0.7)' }}
        className={`absolute inset-0 bg-red-300 items-center flex justify-center flex-col gap-4 pt-8  ${
          !switchKey && 'hidden'
        }`}
      >
        <p className='text-white '>Chave</p>
        <input
          className={`p-1 ${validKey ? '' : 'placeholder:text-red-600'}`}
          value={valueKey}
          onChange={(e) => setValueKey(e.target.value)}
          placeholder={validKey ? '' : 'chave inválida'}
          onFocus={() => setValidKey(true)}
          type='text'
        />
        <button
          onClick={() => {
            if (valueKey === keyPass) {
              setValidKey(true);
              nav();
            } else {
              setValueKey('');
              setValidKey(false);
            }
          }}
          className='text-white bg-blue-300 px-10 py-1 rounded-xl'
        >
          Abrir
        </button>
        <button
          onClick={() => SetSwitchKey(false)}
          className='text-white px-10 underline py-1 rounded-xl'
        >
          Cancelar
        </button>
      </div>
      <img
        src={src}
        alt={alt}
        className='md:max-w-96 w-80 '
        onClick={() => {
          if (keyPass) {
            SetSwitchKey(!switchKey);
          } else {
            onClick();
          }
        }}
      />
    </div>
  );
};
