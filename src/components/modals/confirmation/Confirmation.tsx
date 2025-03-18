import { ReactElement } from 'react';

interface iConfirmation {
  onConfirm?: () => void;
  onCancel?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
  children: ReactElement;
  hidden: boolean;
  greenConfirm?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined;
  closeBtnText?: string;
  confirmBtnText?: string;
  inputMode?: boolean;
}

export const Confirmation = ({
  inputMode,
  children,
  greenConfirm,
  onConfirm,
  onChange,
  onCancel,
  type,
  closeBtnText,
  confirmBtnText,
  value,
  hidden = true
}: iConfirmation) => {
  return (
    <div
      style={{ backgroundColor: ' rgba(0, 0, 0, 0.5)' }}
      className={`p-10 w-screen h-screen fixed inset-0 z-10  items-center justify-center ${
        hidden ? 'hidden' : 'flex'
      } `}
    >
      <div className='bg-white p-4 gap-10 md:w-96 flex flex-col items-center rounded-md '>
        {inputMode ? (
          <>
            <div className='text-xl w-72 text-center'> {children}</div>
            <input
              autoFocus
              className={`border border-gray-500 w-full rounded-md
               bg-transparent outline-none pl-2`}
              value={value}
              onChange={onChange}
              type={type ? type : 'password'}
            />
            <div className='flex gap-6  '>
              <button
                onClick={onConfirm}
                className='bg-green-700 hover:bg-green-600 text-white py-1 px-2 rounded-md transition duration-300'
              >
                {confirmBtnText ? confirmBtnText : 'Confirmar'}
              </button>
              <button
                onClick={onCancel}
                className='underline hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-md transition duration-300'
              >
                {closeBtnText ? closeBtnText : 'Cancelar'}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='text-xl'>{children}</div>
            <div className='flex flex-col gap-6  '>
              <button
                onClick={onConfirm}
                className={`${
                  greenConfirm ? 'bg-green-700' : 'bg-red-500'
                } hover:bg-red-600 text-white py-1 px-2 rounded-md transition duration-300 ${
                  !onConfirm && 'hidden'
                }`}
              >
                {confirmBtnText ? confirmBtnText : 'Confirmar'}
              </button>
              <button
                onClick={onCancel}
                className={`underline hover:bg-gray-400 text-gray-800 py-1 px-2 rounded-md transition duration-300 ${
                  !onCancel && 'hidden'
                }`}
              >
                {closeBtnText ? closeBtnText : 'Cancelar'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
