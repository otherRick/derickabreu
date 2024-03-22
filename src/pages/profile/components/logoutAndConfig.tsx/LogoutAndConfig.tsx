import { ArrowLineLeft, Gear } from '@phosphor-icons/react';

export const LogoutAndConfig = ({
  editPRofile,
  setToggleMenu,
  onCloseConfirmation
}: {
  editPRofile: boolean;
  setToggleMenu: () => void;
  onCloseConfirmation: () => void;
}) => {
  return (
    <div
      className={` text-md cursor-pointer flex items-start flex-col w-full h-full justify-end gap-4 ${
        editPRofile ? 'hidden' : ''
      }`}
    >
      <button
        onClick={
          // onEdit;
          setToggleMenu
        }
        className='flex justify-between items-center bg-transparent rounded-md py-4 gap-4 text-white'
      >
        <Gear size={20} />
        <p className={` ${editPRofile && 'hidden'}`}>Configurações</p>
      </button>
      <button
        onClick={onCloseConfirmation}
        className='flex justify-between items-center rounded-md bg-transparent text-white py-2 gap-4 '
      >
        <ArrowLineLeft size={20} />
        <p className='cursor-pointer'>Sair</p>
      </button>
      {/* <p
                  onClick={() => setCloseConfirmationDele(false)}
                  className='text-red-500 cursor-pointer pt-10 text-xs'
                >
                  Deletar
                </p> */}
    </div>
  );
};
