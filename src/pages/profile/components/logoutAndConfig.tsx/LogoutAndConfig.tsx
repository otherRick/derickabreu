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
        className='flex justify-between items-center bg-transparent rounded-md p-3 gap-4 text-xl border border-zinc-300 text-white'
      >
        <Gear size={20} />
        <p className={` ${editPRofile && 'hidden'}`}>Configurações</p>
      </button>
      <button
        onClick={onCloseConfirmation}
        className='flex justify-between items-center rounded-md bg-transparent text-xl text-white py-2 gap-4 '
      >
        <ArrowLineLeft size={20} />
        <p className='cursor-pointer'>Sair</p>
      </button>
    </div>
  );
};
